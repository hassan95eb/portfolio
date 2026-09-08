"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Copy,
  FileSpreadsheet,
  FileText,
  Loader2,
  Plus,
  Search,
  X,
} from "lucide-react";
import { Container, Reveal, SectionHeading } from "@/components/primitives";
import type {
  CheatSheetCategory,
  CheatSheetPlaceholder,
  CheatSheetStack,
} from "@/content/cheatsheets";
import type { Ui } from "@/i18n/ui";

/**
 * The interactive part of the cheat sheets page: stack switching, search,
 * per-cell copy, and PDF / Excel export. Everything above (`PageHeader`,
 * metadata) stays a server component — this is the one part that needs
 * state and the clipboard/export APIs.
 *
 * PDF export deliberately renders from `pdfStacks` (always the English
 * content) rather than whatever language is on screen: jsPDF's built-in
 * fonts have no Persian glyphs, so a Persian PDF would render as boxes.
 * Excel has no such limitation — a workbook is just text, and Excel/Sheets
 * render it with whatever font the reader's system has — so the Excel
 * export honours the active language.
 */
export function CheatSheetBrowser({
  stacks,
  pdfStacks,
  comingSoon,
  copy,
}: {
  stacks: CheatSheetStack[];
  pdfStacks: CheatSheetStack[];
  comingSoon: CheatSheetPlaceholder[];
  copy: Ui["cheatSheets"];
}) {
  const [activeSlug, setActiveSlug] = useState(stacks[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [exporting, setExporting] = useState<"pdf" | "excel" | null>(null);
  const copiedTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(copiedTimer.current);
  }, []);

  const activeStack = stacks.find((stack) => stack.slug === activeSlug) ?? stacks[0];

  const filteredCategories = useMemo<CheatSheetCategory[]>(() => {
    if (!activeStack) return [];
    const q = query.trim().toLowerCase();
    if (!q) return activeStack.categories;
    return activeStack.categories
      .map((category) => ({
        ...category,
        entries: category.entries.filter(
          (entry) =>
            entry.command.toLowerCase().includes(q) ||
            entry.description.toLowerCase().includes(q),
        ),
      }))
      .filter((category) => category.entries.length > 0);
  }, [activeStack, query]);

  const hasResults = filteredCategories.length > 0;

  function handleCopy(key: string, text: string) {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopiedKey(null), 1400);
    });
  }

  async function exportPdf() {
    const source = pdfStacks.find((stack) => stack.slug === activeSlug);
    if (!source || exporting) return;
    setExporting("pdf");
    try {
      const [{ default: JsPDF }] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
      ]);
      const doc = new JsPDF();
      doc.setFontSize(16);
      doc.text(`${source.name} Cheat Sheet`, 14, 18);
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(source.tagline, 14, 25);

      let cursorY = 32;
      for (const category of source.categories) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- jspdf-autotable augments jsPDF's prototype, not its types.
        (doc as any).autoTable({
          head: [[category.title, ""]],
          body: category.entries.map((entry) => [entry.command, entry.description]),
          startY: cursorY,
          margin: { left: 14, right: 14 },
          styles: { fontSize: 8.5, cellPadding: 3, overflow: "linebreak" },
          headStyles: { fillColor: [185, 107, 74], textColor: 255, fontSize: 9 },
          columnStyles: { 0: { cellWidth: 70, font: "courier" }, 1: { cellWidth: "auto" } },
          didParseCell: (data: { row: { index: number }; column: { index: number }; cell: { text: string[] } }) => {
            // The head row is declared as [title, ""] purely to span both
            // columns — drop the empty second header cell from render.
            if (data.row.index === -1 && data.column.index === 1) {
              data.cell.text = [];
            }
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see above.
        cursorY = (doc as any).lastAutoTable.finalY + 8;
      }

      doc.save(`${source.slug}-cheatsheet.pdf`);
    } finally {
      setExporting(null);
    }
  }

  async function exportExcel() {
    if (!activeStack || exporting) return;
    setExporting("excel");
    try {
      const XLSX = await import("xlsx");
      const rows = activeStack.categories.flatMap((category) =>
        category.entries.map((entry) => ({
          [copy.columns.category]: category.title,
          [copy.columns.command]: entry.command,
          [copy.columns.description]: entry.description,
        })),
      );
      const sheet = XLSX.utils.json_to_sheet(rows);
      sheet["!cols"] = [{ wch: 24 }, { wch: 42 }, { wch: 60 }];
      const workbook = XLSX.utils.book_new();
      const sheetName = activeStack.name.slice(0, 31);
      XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
      XLSX.writeFile(workbook, `${activeStack.slug}-cheatsheet.xlsx`);
    } finally {
      setExporting(null);
    }
  }

  const cellBase =
    "group flex w-full items-start gap-2 rounded-md px-4 py-3 text-start outline-none transition-colors hover:bg-accent/8 focus-visible:bg-accent/8";

  return (
    <>
      <section className="py-16 md:py-20">
        <Container>
          {stacks.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {stacks.map((stack) => (
                <button
                  key={stack.slug}
                  type="button"
                  onClick={() => setActiveSlug(stack.slug)}
                  aria-pressed={stack.slug === activeSlug}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    stack.slug === activeSlug
                      ? "border-accent bg-accent text-[#FBF6EF]"
                      : "border-border text-text-main hover:border-accent hover:text-accent"
                  }`}
                >
                  {stack.name}
                </button>
              ))}
            </div>
          )}

          {activeStack && (
            <>
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search
                    size={16}
                    className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={copy.searchPlaceholder}
                    aria-label={copy.searchPlaceholder}
                    className="w-full rounded-md border border-border bg-background py-2.5 ps-10 pe-9 text-sm text-text-main outline-none transition-colors placeholder:text-text-muted/70 focus:border-accent"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={exportPdf}
                    disabled={exporting !== null}
                    className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-text-main transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-60"
                  >
                    {exporting === "pdf" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <FileText size={16} />
                    )}
                    {exporting === "pdf" ? copy.exporting : copy.exportPdf}
                  </button>
                  <button
                    type="button"
                    onClick={exportExcel}
                    disabled={exporting !== null}
                    className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-text-main transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-60"
                  >
                    {exporting === "excel" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <FileSpreadsheet size={16} />
                    )}
                    {exporting === "excel" ? copy.exporting : copy.exportExcel}
                  </button>
                </div>
              </div>

              {hasResults ? (
                <div className="flex flex-col gap-10">
                  {filteredCategories.map((category, categoryIndex) => (
                    <Reveal key={category.title} delay={Math.min(categoryIndex * 0.04, 0.2)}>
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          <h3
                            className="text-text-main"
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                          >
                            {category.title}
                          </h3>
                        </div>

                        <div className="overflow-hidden rounded-xl border border-border bg-surface">
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[560px] border-collapse text-sm">
                              <thead>
                                <tr className="border-b border-border bg-background/50">
                                  <th className="w-2/5 px-4 py-3 text-start text-xs uppercase tracking-[0.14em] text-text-muted">
                                    {copy.columns.command}
                                  </th>
                                  <th className="px-4 py-3 text-start text-xs uppercase tracking-[0.14em] text-text-muted">
                                    {copy.columns.description}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                {category.entries.map((entry) => {
                                  const commandKey = `${entry.command}::cmd`;
                                  const descKey = `${entry.command}::desc`;
                                  return (
                                    <tr key={entry.command}>
                                      <td className="align-top">
                                        <button
                                          type="button"
                                          onClick={() => handleCopy(commandKey, entry.command)}
                                          aria-label={`${copy.copy}: ${entry.command}`}
                                          className={cellBase}
                                        >
                                          <code
                                            dir="ltr"
                                            className="flex-1 whitespace-pre-wrap break-all text-start font-mono text-[12.5px] text-text-main"
                                          >
                                            {entry.command}
                                          </code>
                                          <span
                                            className={`mt-0.5 shrink-0 text-text-muted transition-opacity ${
                                              copiedKey === commandKey
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                                            }`}
                                          >
                                            {copiedKey === commandKey ? (
                                              <Check size={14} className="text-accent" />
                                            ) : (
                                              <Copy size={14} />
                                            )}
                                          </span>
                                        </button>
                                      </td>
                                      <td className="align-top">
                                        <button
                                          type="button"
                                          onClick={() => handleCopy(descKey, entry.description)}
                                          aria-label={`${copy.copy}: ${entry.description}`}
                                          className={cellBase}
                                        >
                                          <span className="flex-1 text-start text-[13px] text-text-muted">
                                            {entry.description}
                                          </span>
                                          <span
                                            className={`mt-0.5 shrink-0 text-text-muted transition-opacity ${
                                              copiedKey === descKey
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                                            }`}
                                          >
                                            {copiedKey === descKey ? (
                                              <Check size={14} className="text-accent" />
                                            ) : (
                                              <Copy size={14} />
                                            )}
                                          </span>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-border bg-background/50 px-6 py-10 text-center text-sm text-text-muted">
                  {copy.noResults}
                </p>
              )}
            </>
          )}
        </Container>
      </section>

      {comingSoon.length > 0 && (
        <section className="border-t border-border bg-secondary/25 py-20 md:py-28">
          <Container>
            <SectionHeading
              eyebrow={copy.comingSoon.eyebrow}
              title={copy.comingSoon.title}
              description={copy.comingSoon.description}
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {comingSoon.map((item, i) => (
                <Reveal key={item.name} delay={i * 0.05}>
                  <div className="flex h-full items-center gap-3 rounded-xl border border-dashed border-border bg-background/50 p-6">
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-lg border border-dashed border-border text-text-muted">
                      <Plus size={18} />
                    </span>
                    <h3
                      className="text-text-main"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                    >
                      {item.name}
                    </h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
