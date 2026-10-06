import type { BlogArticle } from "@/lib/cms/types";

export const safeDeadCodeAuditEn: BlogArticle = {
  "seoTitle": "Can I Delete This Code? Find Dead Code with AI",
  "seoDescription": "Not sure whether to delete that code? Find dead code with AI, trace real usage, review tests, and validate a safe cleanup with a practical workflow.",
  "publishedAt": "2026-10-06T21:04:46+03:30",
  "sourcesCheckedAt": "2026-10-06",
  "wordCount": 1964,
  "keywords": [
    "dead code detection",
    "remove unused code",
    "AI-assisted code audit",
    "safe code cleanup",
    "test-only code",
    "Knip",
    "TypeScript code review"
  ],
  "intro": [
    "You are about to make a small change. You open the relevant folder and find three versions of a component, several old helpers, and a file nobody remembers. Before writing anything, you need to establish which parts actually run and which have simply been left behind.",
    "This is familiar in growing projects. A page gets redesigned, a feature remains unfinished, and someone builds a temporary data repair tool. Eventually, all of them live beside active code. Some should disappear. Some still have a purpose. Others reveal a connection that was never completed.",
    "To find dead code, start with files without obvious consumers, then trace their paths through entry points, tests, configuration, and external usage. If no valid purpose remains, validate removal against the state before the change. **A missing import makes a file a candidate, not a deletion instruction.**"
  ],
  "sections": [
    {
      "id": "what-is-dead-code",
      "title": "What counts as unused code?",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Dead code might be an unreachable branch, a function without callers, or a disconnected group of components, hooks, and services. Editor warnings, lint, and settings such as [TypeScript's noUnusedLocals](https://www.typescriptlang.org/tsconfig/noUnusedLocals.html) help with some local issues. They do not establish that every feature has a real consumer."
        },
        {
          "type": "paragraph",
          "text": "Ask which valid execution root reaches the code. That root might be a page, API, command, or worker. A migration need not run through the UI. A component does not become an active product feature just because a test imports it."
        },
        {
          "type": "paragraph",
          "text": "Deleting source also does not automatically improve speed. The bundler may already exclude it. [Tree shaking](https://webpack.js.org/guides/tree-shaking/) concerns build output. Reducing maintenance ambiguity is valuable independently; performance claims need separate measurements."
        }
      ]
    },
    {
      "id": "scope-and-baseline",
      "title": "1. Define the scope and capture a baseline",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Start with an old feature or a particular folder, rather than the entire repository. Record the commit, local changes, and investigation scope:"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "git status --short\ngit rev-parse HEAD"
        },
        {
          "type": "paragraph",
          "text": "Then run type checking, relevant tests, and the build through the project's existing scripts. Inspect their definitions in `package.json`. These initial results are your baseline: if a test fails after deletion, you can distinguish a new regression from an existing problem."
        },
        {
          "type": "paragraph",
          "text": "Record checks that already fail or cannot run. You need not repair the entire project before removing a helper. However, if an existing failure prevents you from evaluating affected behavior, establish another valid check or address that limitation first."
        }
      ]
    },
    {
      "id": "find-candidates",
      "title": "2. Find candidates and interpret the tool output",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Search the suspected component name, exports, and file path. For an illustrative component called `PromoBanner`:"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "rg -n 'PromoBanner' src tests scripts"
        },
        {
          "type": "paragraph",
          "text": "Replace the folders with those in your project. Read the matches rather than counting them. A name may appear in a comment, test, or central export. Aliases and indirect loading can escape a simple search."
        },
        {
          "type": "paragraph",
          "text": "For JavaScript and TypeScript, tools such as Knip can report suspicious files, exports, and dependencies. In a project where it is installed, run analysis with `pnpm exec knip`. Consult the [official getting started guide](https://knip.dev/overview/getting-started) for setup."
        },
        {
          "type": "paragraph",
          "text": "Before relying on the report, identify application entries, workers, commands, and public package interfaces. Do not mark every file as an entry merely to suppress warnings, or ignore something you have not investigated. Initial output is an investigation list; automatic bulk removal is premature."
        }
      ]
    },
    {
      "id": "trace-usage",
      "title": "3. Trace references to actual execution",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "For a component, ask who imports it, whether it renders in JSX, where its parent is mounted, and whether that page is reachable. Do not stop at the first import."
        },
        {
          "type": "paragraph",
          "text": "For a function, trace the caller back to a root. The caller may itself lack consumers. A re-export in `index.ts` is not sufficient evidence; find what reads that export."
        },
        {
          "type": "paragraph",
          "text": "Check side effects too. Loading a module may perform registration or initialization without providing a value used later. An apparently unused import can still support behavior. Public packages also require consideration of consumers outside the repository."
        },
        {
          "type": "paragraph",
          "text": "Reachability does not mean execution on every request. A dialog may require a click; an administrative report may require a particular role. An absence of runtime observations does not automatically establish the absence of a valid path."
        }
      ]
    },
    {
      "id": "indirect-execution",
      "title": "4. Check indirect execution paths",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "A route may be discovered by filename, a command started through a package script, or a job launched by CI or cron. When conventional imports are absent, inspect configuration, workflows, and deployment."
        },
        {
          "type": "paragraph",
          "text": "Dynamic loading matters too. A module name may come from configuration, or plugins may be discovered from a directory. That discovery contract is part of the consumption evidence."
        },
        {
          "type": "paragraph",
          "text": "For an endpoint, no requests from your frontend does not exclude another service as a consumer. If the external contract is unclear, record an unknown status and a specific follow-up question. “No consumer found in this repository” is a narrower claim than “no consumer exists.”"
        }
      ]
    },
    {
      "id": "campaign-example",
      "title": "An example: a banner that appears to be used",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Imagine a store that previously had a campaign page. Searching for `PromoBanner` reveals an export, a test, and a component called `CampaignPanel`. At first glance, the banner looks used."
        },
        {
          "type": "paragraph",
          "text": "Follow the chain: the panel uses a hook and campaign service, but the old route has been removed and no active page renders the panel. Connections inside the group remain. The group's connection to the application is missing. This is an isolated subgraph."
        },
        {
          "type": "paragraph",
          "text": "If the campaign has ended and no valid commitment remains, the group may be removable. If the page was missed during a redesign while the campaign remains necessary, restore its connection. The banner test cannot decide between these outcomes."
        },
        {
          "type": "paragraph",
          "text": "Do not treat downstream importers as proof that a group is active. Investigate its root and current product purpose. You may have found obsolete code, or a capability whose user entry point is incomplete."
        }
      ]
    },
    {
      "id": "tests-and-background",
      "title": "5. Examine tests and background work separately",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "If only tests reach an implementation, mark it test-only and investigate why production usage is absent. Its behavior may be obsolete, or its wiring may be missing. Fixtures and mocks are different: they naturally have no production consumers."
        },
        {
          "type": "paragraph",
          "text": "For background workflows, inspect producer and consumer together. A scheduler may create jobs while its worker is not running in deployment. Deleting the worker can conceal the integration problem."
        },
        {
          "type": "paragraph",
          "text": "If the capability is required, restore the connection. If it is being retired, consider the producer, schedule, and existing work too. One quiet day does not prove a monthly workflow unused; observations must match its execution cycle."
        }
      ]
    },
    {
      "id": "classify-findings",
      "title": "6. Turn the finding into a clear decision",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Simple statuses are enough, provided “no consumer found” is kept separate from “removal approved”:"
        },
        {
          "type": "table",
          "table": {
            "headers": [
              "Finding",
              "Next action"
            ],
            "rows": [
              [
                "Removal candidate",
                "Final review, then a small deletion"
              ],
              [
                "Test-only",
                "Establish whether behavior is needed and why wiring is absent"
              ],
              [
                "Intentionally inactive",
                "Retain with reason, ownership, and a review point"
              ],
              [
                "Missing connection",
                "Complete the capability or retire the workflow"
              ],
              [
                "Generated output",
                "Review its generator and retention policy"
              ],
              [
                "Unknown",
                "Specify missing evidence; no deletion yet"
              ]
            ]
          }
        },
        {
          "type": "paragraph",
          "text": "Record the path, established consumers, open question, and proposed action. For the campaign, a useful note is: “Consumed inside the panel and a test; no active route found; external service usage remains unchecked; do not delete the panel alone.”"
        },
        {
          "type": "paragraph",
          "text": "Explain confidence levels if you use them. Coverage of relevant paths matters more than the tool's certainty. Feature-flagged code and generated output need assessment against their own contracts."
        }
      ]
    },
    {
      "id": "safe-removal",
      "title": "7. Keep removal small and validation relevant",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Once the decision is clear, limit the change. Avoid mixing unrelated refactoring into the deletion. Check shared dependencies: a helper used by active checkout must remain when an old campaign disappears."
        },
        {
          "type": "paragraph",
          "text": "Repeat baseline checks. Type checking helps expose broken dependencies, tests exercise covered behavior, and builds reveal some output and discovery problems. For a sensitive change, execute the affected user journey or background process as well."
        },
        {
          "type": "paragraph",
          "text": "A passing build does not validate an external consumer. Checks should address the relevant contract and environment. Explain in the pull request what was removed, why, and which evidence supports the result."
        }
      ]
    },
    {
      "id": "ai-assisted-audit",
      "title": "Using AI for dead code detection: investigation to change",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "AI can collect references, follow consumption chains, and organize findings. But “delete unused files” oversimplifies the task. Divide the work into three stages: investigation, decision, and a focused change."
        },
        {
          "type": "heading",
          "text": "Stage one: ask for evidence, not deletion"
        },
        {
          "type": "paragraph",
          "text": "Give the assistant a defined scope and require inspectable file paths and references. A practical prompt is:"
        },
        {
          "type": "paragraph",
          "text": "“Review the campaign module for unused-code candidates. For each candidate, trace consumers to entry points; separate test and production usage; inspect scripts, registration, and dynamic loading. Record possible external consumers and unanswered questions. Do not modify files during this pass.”"
        },
        {
          "type": "paragraph",
          "text": "This encourages a reviewable record instead of an authoritative deletion list. If the assistant says the panel is unused, you should be able to inspect which paths it checked and which remain unresolved."
        },
        {
          "type": "heading",
          "text": "Stage two: challenge the conclusions"
        },
        {
          "type": "paragraph",
          "text": "Ask the assistant to critique its report: “For each proposed deletion, which execution path or external contract might the analysis have missed?” This can reveal new leads, but it is not independent confirmation. The same assistant can repeat its original assumption."
        },
        {
          "type": "paragraph",
          "text": "Verify important references yourself. Compare “no usage exists” with the actual investigation boundary, and do not convert missing evidence into certainty. Product decisions, such as whether a campaign should continue, must come from a valid project requirement."
        },
        {
          "type": "heading",
          "text": "Stage three: request one specific change"
        },
        {
          "type": "paragraph",
          "text": "After the decision is established, constrain the next request: “Remove only the retired campaign group. Preserve the shared checkout helper. Avoid unrelated behavior changes. Report the diff and actual validation results; stop before deleting any unresolved item.”"
        },
        {
          "type": "paragraph",
          "text": "The assistant should distinguish checks it executed from checks it did not run. “Tests should pass” is not a test result. Review the diff and compare before-and-after evidence. AI accelerates investigation; confidence comes from evidence and validation."
        }
      ]
    },
    {
      "id": "review-ai-evidence",
      "title": "Keep the investigation useful when using AI",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "Give the assistant access to the relevant project context, including package scripts, framework configuration, and known deployment entries. A model that sees only one component cannot reliably judge the entire feature's reachability. If it cannot inspect a worker configuration or external contract, that limitation belongs in the report."
        },
        {
          "type": "paragraph",
          "text": "Request a compact evidence table: candidate, known consumers, entry path, test usage, unresolved question, and proposed action. For the campaign example, an acceptable row should expose the missing route and unresolved service consumer. A bare “unused” label leaves you with nothing to review."
        },
        {
          "type": "paragraph",
          "text": "Also separate proposed actions from completed work. An assistant may describe the correct validation commands without executing them, or suggest a deletion without producing the expected diff. Ask it to report actual changes and observed results. This keeps the workflow concrete whether you use an editor assistant, a terminal agent, or manual analysis."
        }
      ]
    },
    {
      "id": "prevent-unused-code",
      "title": "Prevent the same situation from returning",
      "paragraphs": [],
      "blocks": [
        {
          "type": "paragraph",
          "text": "When retiring a route or feature, inspect its components, hooks, tests, and services. Give inactive code an owner and a review criterion. “Maybe later” should not become an indefinite status."
        },
        {
          "type": "paragraph",
          "text": "Introduce analysis into CI gradually: establish configuration and resolve false positives before preventing new issues. Hundreds of unexplained failures often encourage disabling the tool rather than understanding the code."
        }
      ]
    }
  ],
  "conclusionTitle": "Start with one feature",
  "conclusion": [
    "Choose an old capability, trace its consumers, and resolve the open questions. The outcome may be fewer files or a restored connection. Either way, you should be able to explain why that action makes sense."
  ],
  "faq": [
    {
      "question": "Can I delete a file with no imports?",
      "answer": "Only after checking entry points, indirect execution, and external consumption. No imports starts the investigation."
    },
    {
      "question": "Does having tests mean code should remain?",
      "answer": "No. Current requirements and the reason production wiring is absent determine whether to retire or reconnect the implementation."
    },
    {
      "question": "Is AI or an analysis tool enough on its own?",
      "answer": "They help discover candidates. External contracts, product intent, and actual behavior still require relevant evidence and validation."
    }
  ],
  "sources": [
    {
      "label": "TypeScript's noUnusedLocals",
      "href": "https://www.typescriptlang.org/tsconfig/noUnusedLocals.html"
    },
    {
      "label": "Tree shaking",
      "href": "https://webpack.js.org/guides/tree-shaking/"
    },
    {
      "label": "official getting started guide",
      "href": "https://knip.dev/overview/getting-started"
    }
  ],
  "image": {
    "src": "/blog/safe-dead-code-audit/og-en.png",
    "alt": "Can I Delete This Code? Find Dead Code with AI",
    "width": 1200,
    "height": 630
  }
};
