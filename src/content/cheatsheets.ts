import type { Lang } from "@/lib/i18n/config";

/**
 * Cheat sheet content: quick-reference command tables for the stacks used in
 * day-to-day work.
 *
 * Same shape as `content/profile.ts` and for the same reason — this is
 * hand-written reference material, not an editor-managed entity, so it has
 * no business living in the CMS. `fa` is typed as `typeof en` so a category
 * or entry added to one language and forgotten in the other is a compile
 * error rather than a silently empty table.
 *
 * Commands themselves (`command`) are never translated — they're the same
 * bytes a terminal expects in either language. Only `description` carries
 * language-specific copy.
 */

export type CheatSheetEntry = {
  /** Exactly what should land on the clipboard when this cell is copied. */
  command: string;
  description: string;
};

export type CheatSheetCategory = {
  title: string;
  entries: CheatSheetEntry[];
};

export type CheatSheetStack = {
  /** Stable id used in the URL hash / export filenames. Not translated. */
  slug: string;
  name: string;
  tagline: string;
  categories: CheatSheetCategory[];
};

/** A stack that doesn't have a sheet written yet — shown as reserved space. */
export type CheatSheetPlaceholder = {
  name: string;
};

const en = {
  stacks: [
    {
      slug: "git",
      name: "Git",
      tagline: "The commands actually used day to day — setup through history rewrites.",
      categories: [
        {
          title: "Setup & Config",
          entries: [
            { command: "git config --global user.name \"Your Name\"", description: "Set the name attached to your commits, for every repo on this machine." },
            { command: "git config --global user.email \"you@example.com\"", description: "Set the email attached to your commits." },
            { command: "git config --global init.defaultBranch main", description: "Make new repos start on `main` instead of `master`." },
            { command: "git config --list", description: "Show the effective config — global and local, merged." },
            { command: "git config --global core.editor \"code --wait\"", description: "Set the editor Git opens for commit messages and rebases." },
            { command: "git init", description: "Turn the current folder into a new Git repository." },
            { command: "git clone <url>", description: "Copy a remote repository, history included, into a new local folder." },
            { command: "git clone --depth 1 <url>", description: "Clone only the latest commit — fast, no history, good for CI." },
          ],
        },
        {
          title: "Snapshotting",
          entries: [
            { command: "git status", description: "Show what's changed, staged, and untracked in the working tree." },
            { command: "git add <file>", description: "Stage a specific file's changes for the next commit." },
            { command: "git add .", description: "Stage every change in the current directory and below." },
            { command: "git add -p", description: "Stage changes interactively, hunk by hunk — for a commit that mixes unrelated edits." },
            { command: "git commit -m \"message\"", description: "Commit the staged changes with a message." },
            { command: "git commit -am \"message\"", description: "Stage every tracked file's changes and commit in one step." },
            { command: "git commit --amend", description: "Rewrite the previous commit — its message, or add more staged changes to it." },
            { command: "git rm <file>", description: "Delete a file and stage the deletion." },
            { command: "git mv <old> <new>", description: "Rename or move a tracked file and stage the change." },
          ],
        },
        {
          title: "Branching & Merging",
          entries: [
            { command: "git branch", description: "List local branches; the current one is marked." },
            { command: "git branch <name>", description: "Create a new branch from the current commit, without switching to it." },
            { command: "git switch <branch>", description: "Switch the working tree to an existing branch." },
            { command: "git switch -c <branch>", description: "Create a new branch and switch to it in one step." },
            { command: "git checkout <branch>", description: "Older equivalent of `switch` — also used for restoring files." },
            { command: "git merge <branch>", description: "Merge the named branch into the current one." },
            { command: "git branch -d <branch>", description: "Delete a branch that's already merged." },
            { command: "git branch -D <branch>", description: "Force-delete a branch, merged or not." },
            { command: "git branch -m <new-name>", description: "Rename the current branch." },
          ],
        },
        {
          title: "Sharing & Updating",
          entries: [
            { command: "git fetch", description: "Download commits and branches from the remote, without merging anything." },
            { command: "git pull", description: "Fetch the remote and merge it into the current branch." },
            { command: "git pull --rebase", description: "Fetch and replay local commits on top of the remote instead of merging." },
            { command: "git push", description: "Send local commits on the current branch to its remote." },
            { command: "git push -u origin <branch>", description: "Push a new branch and set it to track the remote branch, so plain `push`/`pull` work afterward." },
            { command: "git push --force-with-lease", description: "Force-push, but abort if the remote has commits you haven't seen — safer than `--force`." },
            { command: "git remote -v", description: "List configured remotes and their URLs." },
            { command: "git remote add origin <url>", description: "Add a remote named `origin` pointing at `<url>`." },
          ],
        },
        {
          title: "Inspection & Comparison",
          entries: [
            { command: "git log", description: "Show commit history, newest first." },
            { command: "git log --oneline --graph --all", description: "Compact, graphed view of every branch's history — the one worth memorizing." },
            { command: "git diff", description: "Show unstaged changes against the last commit." },
            { command: "git diff --staged", description: "Show staged changes against the last commit." },
            { command: "git show <commit>", description: "Show the full change introduced by one commit." },
            { command: "git blame <file>", description: "Show which commit last touched each line of a file." },
            { command: "git reflog", description: "Show every place HEAD has pointed — the safety net after a bad reset or rebase." },
          ],
        },
        {
          title: "Undoing Changes",
          entries: [
            { command: "git restore <file>", description: "Discard unstaged changes to a file, back to the last commit." },
            { command: "git restore --staged <file>", description: "Unstage a file without touching its contents." },
            { command: "git reset --soft HEAD~1", description: "Undo the last commit, keep its changes staged." },
            { command: "git reset --mixed HEAD~1", description: "Undo the last commit, keep its changes unstaged (default mode)." },
            { command: "git reset --hard HEAD~1", description: "Undo the last commit and discard its changes entirely. Destructive." },
            { command: "git revert <commit>", description: "Create a new commit that undoes a previous one — safe on shared history." },
            { command: "git clean -fd", description: "Delete untracked files and directories from the working tree." },
          ],
        },
        {
          title: "Stashing",
          entries: [
            { command: "git stash", description: "Shelve uncommitted changes and return to a clean working tree." },
            { command: "git stash -u", description: "Stash uncommitted changes, including untracked files." },
            { command: "git stash list", description: "List all stashed change sets." },
            { command: "git stash pop", description: "Reapply the most recent stash and remove it from the stash list." },
            { command: "git stash apply", description: "Reapply the most recent stash but keep it in the stash list." },
            { command: "git stash drop", description: "Delete the most recent stash without applying it." },
          ],
        },
        {
          title: "Rewriting History",
          entries: [
            { command: "git rebase <branch>", description: "Replay the current branch's commits on top of `<branch>`." },
            { command: "git rebase -i HEAD~5", description: "Interactively reorder, squash, edit, or drop the last 5 commits." },
            { command: "git cherry-pick <commit>", description: "Apply one commit from another branch onto the current one." },
            { command: "git rebase --continue", description: "Resume a rebase after resolving a conflict." },
            { command: "git rebase --abort", description: "Cancel an in-progress rebase and return to the pre-rebase state." },
          ],
        },
        {
          title: "Tags",
          entries: [
            { command: "git tag", description: "List existing tags." },
            { command: "git tag v1.0.0", description: "Create a lightweight tag at the current commit." },
            { command: "git tag -a v1.0.0 -m \"message\"", description: "Create an annotated tag — carries a message, author, and date." },
            { command: "git push origin v1.0.0", description: "Push a single tag to the remote." },
            { command: "git push origin --tags", description: "Push every local tag to the remote." },
          ],
        },
      ],
    },
  ] satisfies CheatSheetStack[],
  comingSoon: [
    { name: "ASP.NET Core & C#" },
    { name: "React & Next.js" },
    { name: "Vue" },
    { name: "SQL Server & EF Core" },
    { name: "TypeScript" },
    { name: "Docker" },
  ] satisfies CheatSheetPlaceholder[],
};

const fa: typeof en = {
  stacks: [
    {
      slug: "git",
      name: "Git",
      tagline: "دستورهایی که واقعاً روزمره استفاده می‌شوند — از تنظیمات اولیه تا بازنویسی تاریخچه.",
      categories: [
        {
          title: "تنظیمات اولیه",
          entries: [
            { command: "git config --global user.name \"Your Name\"", description: "نامی که به کامیت‌های شما در همه‌ی مخزن‌های این سیستم متصل می‌شود را تنظیم می‌کند." },
            { command: "git config --global user.email \"you@example.com\"", description: "ایمیل متصل به کامیت‌های شما را تنظیم می‌کند." },
            { command: "git config --global init.defaultBranch main", description: "مخزن‌های جدید را به‌جای `master` با شاخه‌ی `main` شروع می‌کند." },
            { command: "git config --list", description: "تنظیمات نهایی — سراسری و محلی، ترکیب‌شده — را نمایش می‌دهد." },
            { command: "git config --global core.editor \"code --wait\"", description: "ویرایشگری که Git برای پیام کامیت و rebase باز می‌کند را تنظیم می‌کند." },
            { command: "git init", description: "پوشه‌ی جاری را به یک مخزن Git جدید تبدیل می‌کند." },
            { command: "git clone <url>", description: "یک مخزن ریموت را همراه با تاریخچه‌اش در یک پوشه‌ی محلیِ جدید کپی می‌کند." },
            { command: "git clone --depth 1 <url>", description: "فقط آخرین کامیت را کلون می‌کند — سریع، بدون تاریخچه، مناسب CI." },
          ],
        },
        {
          title: "ثبت تغییرات",
          entries: [
            { command: "git status", description: "تغییرات، مواردِ stage‌شده و فایل‌های ردیابی‌نشده را نمایش می‌دهد." },
            { command: "git add <file>", description: "تغییرات یک فایل مشخص را برای کامیت بعدی stage می‌کند." },
            { command: "git add .", description: "همه‌ی تغییرات پوشه‌ی جاری و زیرپوشه‌ها را stage می‌کند." },
            { command: "git add -p", description: "تغییرات را به‌صورت تعاملی و بخش‌به‌بخش stage می‌کند — برای کامیتی که چند تغییر نامرتبط را ترکیب می‌کند." },
            { command: "git commit -m \"message\"", description: "تغییرات stage‌شده را با یک پیام کامیت می‌کند." },
            { command: "git commit -am \"message\"", description: "تغییرات همه‌ی فایل‌های ردیابی‌شده را stage و در یک مرحله کامیت می‌کند." },
            { command: "git commit --amend", description: "آخرین کامیت را بازنویسی می‌کند — پیامش را، یا تغییرات stage‌شده‌ی جدید را به آن اضافه می‌کند." },
            { command: "git rm <file>", description: "یک فایل را حذف و حذفش را stage می‌کند." },
            { command: "git mv <old> <new>", description: "یک فایلِ ردیابی‌شده را جابه‌جا/تغییرنام می‌دهد و تغییر را stage می‌کند." },
          ],
        },
        {
          title: "شاخه‌سازی و ادغام",
          entries: [
            { command: "git branch", description: "شاخه‌های محلی را فهرست می‌کند؛ شاخه‌ی جاری مشخص‌شده است." },
            { command: "git branch <name>", description: "یک شاخه‌ی جدید از کامیت جاری می‌سازد، بدون سوییچ به آن." },
            { command: "git switch <branch>", description: "درخت کاری را به یک شاخه‌ی موجود سوییچ می‌کند." },
            { command: "git switch -c <branch>", description: "یک شاخه‌ی جدید می‌سازد و در یک مرحله به آن سوییچ می‌کند." },
            { command: "git checkout <branch>", description: "معادل قدیمی‌ترِ `switch` — برای بازگردانی فایل‌ها هم استفاده می‌شود." },
            { command: "git merge <branch>", description: "شاخه‌ی مشخص‌شده را در شاخه‌ی جاری ادغام می‌کند." },
            { command: "git branch -d <branch>", description: "شاخه‌ای که از قبل ادغام شده را حذف می‌کند." },
            { command: "git branch -D <branch>", description: "شاخه را به‌زور حذف می‌کند، چه ادغام شده باشد چه نه." },
            { command: "git branch -m <new-name>", description: "نام شاخه‌ی جاری را تغییر می‌دهد." },
          ],
        },
        {
          title: "اشتراک‌گذاری و به‌روزرسانی",
          entries: [
            { command: "git fetch", description: "کامیت‌ها و شاخه‌های ریموت را دانلود می‌کند، بدون ادغام." },
            { command: "git pull", description: "ریموت را fetch و در شاخه‌ی جاری ادغام می‌کند." },
            { command: "git pull --rebase", description: "ریموت را fetch می‌کند و کامیت‌های محلی را روی آن بازپخش می‌کند، به‌جای ادغام." },
            { command: "git push", description: "کامیت‌های محلیِ شاخه‌ی جاری را به ریموتش ارسال می‌کند." },
            { command: "git push -u origin <branch>", description: "یک شاخه‌ی جدید را push و آن را برای ردیابیِ شاخه‌ی ریموت تنظیم می‌کند، تا push/pull ساده بعداً کار کنند." },
            { command: "git push --force-with-lease", description: "force-push می‌کند، اما اگر ریموت کامیت‌هایی دارد که ندیده‌اید متوقف می‌شود — ایمن‌تر از `--force`." },
            { command: "git remote -v", description: "ریموت‌های تنظیم‌شده و آدرس‌هایشان را فهرست می‌کند." },
            { command: "git remote add origin <url>", description: "یک ریموت با نام `origin` به آدرس `<url>` اضافه می‌کند." },
          ],
        },
        {
          title: "بازبینی و مقایسه",
          entries: [
            { command: "git log", description: "تاریخچه‌ی کامیت‌ها را از جدیدترین نمایش می‌دهد." },
            { command: "git log --oneline --graph --all", description: "نمای فشرده و گراف‌شده‌ی تاریخچه‌ی همه‌ی شاخه‌ها — ارزش حفظ‌کردن دارد." },
            { command: "git diff", description: "تغییرات stage‌نشده نسبت به آخرین کامیت را نمایش می‌دهد." },
            { command: "git diff --staged", description: "تغییرات stage‌شده نسبت به آخرین کامیت را نمایش می‌دهد." },
            { command: "git show <commit>", description: "تغییر کامل یک کامیت را نمایش می‌دهد." },
            { command: "git blame <file>", description: "نشان می‌دهد آخرین‌بار کدام کامیت هر خط از یک فایل را تغییر داده." },
            { command: "git reflog", description: "هر جایی که HEAD اشاره کرده را نمایش می‌دهد — تور نجات پس از یک reset یا rebase اشتباه." },
          ],
        },
        {
          title: "بازگردانی تغییرات",
          entries: [
            { command: "git restore <file>", description: "تغییرات stage‌نشده‌ی یک فایل را به حالت آخرین کامیت برمی‌گرداند." },
            { command: "git restore --staged <file>", description: "یک فایل را از stage خارج می‌کند، بدون تغییر محتوایش." },
            { command: "git reset --soft HEAD~1", description: "آخرین کامیت را لغو می‌کند، تغییراتش stage باقی می‌مانند." },
            { command: "git reset --mixed HEAD~1", description: "آخرین کامیت را لغو می‌کند، تغییراتش unstage باقی می‌مانند (حالت پیش‌فرض)." },
            { command: "git reset --hard HEAD~1", description: "آخرین کامیت را لغو و تغییراتش را کاملاً حذف می‌کند. مخرب است." },
            { command: "git revert <commit>", description: "یک کامیت جدید می‌سازد که کامیت قبلی را خنثی می‌کند — روی تاریخچه‌ی مشترک ایمن است." },
            { command: "git clean -fd", description: "فایل‌ها و پوشه‌های ردیابی‌نشده را از درخت کاری حذف می‌کند." },
          ],
        },
        {
          title: "استش (Stash)",
          entries: [
            { command: "git stash", description: "تغییرات کامیت‌نشده را کنار می‌گذارد و درخت کاری را تمیز می‌کند." },
            { command: "git stash -u", description: "تغییرات کامیت‌نشده، شامل فایل‌های ردیابی‌نشده، را استش می‌کند." },
            { command: "git stash list", description: "همه‌ی مجموعه‌تغییرات استش‌شده را فهرست می‌کند." },
            { command: "git stash pop", description: "آخرین استش را دوباره اعمال و از فهرست استش حذف می‌کند." },
            { command: "git stash apply", description: "آخرین استش را دوباره اعمال می‌کند ولی در فهرست استش نگه می‌دارد." },
            { command: "git stash drop", description: "آخرین استش را بدون اعمال، حذف می‌کند." },
          ],
        },
        {
          title: "بازنویسی تاریخچه",
          entries: [
            { command: "git rebase <branch>", description: "کامیت‌های شاخه‌ی جاری را روی `<branch>` بازپخش می‌کند." },
            { command: "git rebase -i HEAD~5", description: "۵ کامیت آخر را به‌صورت تعاملی مرتب، ادغام، ویرایش یا حذف می‌کند." },
            { command: "git cherry-pick <commit>", description: "یک کامیت از شاخه‌ای دیگر را روی شاخه‌ی جاری اعمال می‌کند." },
            { command: "git rebase --continue", description: "پس از رفع تعارض، rebase را ادامه می‌دهد." },
            { command: "git rebase --abort", description: "یک rebase در حال انجام را لغو و به وضعیت پیش از آن برمی‌گردد." },
          ],
        },
        {
          title: "برچسب‌ها (Tags)",
          entries: [
            { command: "git tag", description: "برچسب‌های موجود را فهرست می‌کند." },
            { command: "git tag v1.0.0", description: "یک برچسب سبک روی کامیت جاری می‌سازد." },
            { command: "git tag -a v1.0.0 -m \"message\"", description: "یک برچسب حاشیه‌نویسی‌شده می‌سازد — شامل پیام، نویسنده و تاریخ." },
            { command: "git push origin v1.0.0", description: "یک برچسب مشخص را به ریموت push می‌کند." },
            { command: "git push origin --tags", description: "همه‌ی برچسب‌های محلی را به ریموت push می‌کند." },
          ],
        },
      ],
    },
  ],
  comingSoon: [
    { name: "ASP.NET Core و #C" },
    { name: "React و Next.js" },
    { name: "Vue" },
    { name: "SQL Server و EF Core" },
    { name: "TypeScript" },
    { name: "Docker" },
  ],
};

export type CheatSheets = typeof en;

export function getCheatSheets(lang: Lang): CheatSheets {
  return lang === "fa" ? fa : en;
}
