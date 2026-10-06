import type { ReactNode } from "react";
import type { BlogBlock, BlogTable } from "@/lib/cms/types";

/** A small, escaped inline format. Article content never becomes raw HTML. */
export function ArticleText({ text }: { text: string }) {
  const tokens = text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((token, index): ReactNode => {
    const link = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/.exec(token);
    if (link) {
      return (
        <a key={index} href={link[2]} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
          {link[1]}
        </a>
      );
    }
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index} className="font-semibold text-text-main">{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return <code key={index} dir="ltr" className="rounded bg-secondary/40 px-1.5 py-0.5 font-mono text-[0.9em] text-text-main [unicode-bidi:isolate]">{token.slice(1, -1)}</code>;
    }
    return token;
  });
}

export function ArticleTable({ table }: { table: BlogTable }) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        {table.caption && <caption className="border-b border-border bg-surface px-5 py-4 text-start font-medium text-text-main">{table.caption}</caption>}
        <thead className="bg-surface">
          <tr>{table.headers.map((header) => <th key={header} scope="col" className="border-b border-border px-5 py-4 text-start font-semibold text-text-main">{header}</th>)}</tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-border last:border-0">
              {row.map((cell, index) => index === 0 ? (
                <th key={index} scope="row" className="px-5 py-4 text-start align-top font-medium leading-7 text-text-main"><ArticleText text={cell} /></th>
              ) : (
                <td key={index} className="px-5 py-4 align-top leading-7 text-text-muted"><ArticleText text={cell} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ArticleBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6 text-[1.03rem] leading-9 text-text-muted">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <h3 key={index} className="pt-4 text-xl font-semibold leading-9 text-text-main">{block.text}</h3>;
          case "code":
            return <pre key={index} dir="ltr" className="overflow-x-auto rounded-xl border border-border bg-[#25201C] p-5 text-left text-sm leading-7 text-[#FBF6EF]"><code className={`language-${block.language}`}>{block.code}</code></pre>;
          case "table":
            return <ArticleTable key={index} table={block.table} />;
          case "paragraph":
            return <p key={index}><ArticleText text={block.text} /></p>;
        }
      })}
    </div>
  );
}
