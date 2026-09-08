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
    {
      slug: "react",
      name: "React",
      tagline: "Hooks-first patterns for everyday component work — state, effects, and the pieces that trip people up.",
      categories: [
        {
          title: "State & Effects",
          entries: [
            { command: "const [value, setValue] = useState(initialValue);", description: "Declare a piece of local state and its setter." },
            { command: "useEffect(() => { /* effect */ return () => { /* cleanup */ }; }, [deps]);", description: "Run a side effect after render; the returned function cleans up before the next run or on unmount." },
            { command: "useEffect(() => { /* runs once */ }, []);", description: "Run an effect only on mount, by passing an empty dependency array." },
            { command: "const value = useMemo(() => computeExpensive(a, b), [a, b]);", description: "Recompute a value only when its dependencies change." },
            { command: "const handleClick = useCallback(() => doSomething(id), [id]);", description: "Keep a function reference stable across renders unless its dependencies change." },
            { command: "const ref = useRef(initialValue);", description: "Hold a mutable value that doesn't trigger a re-render when it changes." },
            { command: "const [state, dispatch] = useReducer(reducer, initialState);", description: "Manage more complex state transitions with a reducer instead of several useState calls." },
          ],
        },
        {
          title: "Component Basics",
          entries: [
            { command: "function Button({ label, onClick }: { label: string; onClick: () => void }) { return <button onClick={onClick}>{label}</button>; }", description: "A typed function component — the standard shape for almost everything." },
            { command: "export default function Page() { return <main>...</main>; }", description: "Default export, the usual shape for a page or route component." },
            { command: "function Card({ children }: { children: React.ReactNode }) { return <div className='card'>{children}</div>; }", description: "Accept and render arbitrary children." },
            { command: "<> <Header /> <Body /> </>", description: "Fragment — group elements without adding a wrapper DOM node." },
            { command: "{condition && <Banner />}", description: "Render an element only when a condition is true." },
            { command: "{condition ? <A /> : <B />}", description: "Render one of two elements based on a condition." },
          ],
        },
        {
          title: "Lists & Keys",
          entries: [
            { command: "items.map((item) => <li key={item.id}>{item.name}</li>)", description: "Render a list; `key` must be stable and unique per item — never regenerated on every render." },
            { command: "items.filter((item) => item.active).map((item) => <Row key={item.id} item={item} />)", description: "Filter before mapping, rather than returning `null` from inside the map." },
            { command: "items.length === 0 ? <Empty /> : items.map((item) => <Row key={item.id} item={item} />)", description: "Handle the empty-list case explicitly instead of rendering nothing." },
            { command: "items.map((item, index) => <li key={index}>{item}</li>) // avoid if the list can reorder", description: "Using the array index as `key` breaks state and animations once items are added, removed, or reordered." },
          ],
        },
        {
          title: "Events & Forms",
          entries: [
            { command: "<input value={value} onChange={(e) => setValue(e.target.value)} />", description: "A controlled input — React owns the value, not the DOM." },
            { command: "<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>", description: "Prevent the browser's default full-page submit." },
            { command: "<button onClick={() => handleClick(id)}>Delete</button>", description: "Wrap in an inline arrow function so the handler can take an argument." },
            { command: "<input type='checkbox' onChange={(e) => console.log(e.target.checked)} />", description: "Checkboxes report state through `.checked`, not `.value`." },
          ],
        },
        {
          title: "Context & Refs",
          entries: [
            { command: "const ThemeContext = createContext<Theme>('light');", description: "Create a context with a default value." },
            { command: "<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>", description: "Provide a value to everything below in the tree." },
            { command: "const theme = useContext(ThemeContext);", description: "Read the nearest provided value." },
            { command: "const Input = forwardRef<HTMLInputElement, Props>((props, ref) => <input ref={ref} {...props} />);", description: "Forward a ref through a component down to a real DOM node." },
          ],
        },
        {
          title: "Performance",
          entries: [
            { command: "const MemoCard = React.memo(Card);", description: "Skip re-rendering a component when its props haven't changed." },
            { command: "const LazyModal = lazy(() => import('./Modal'));", description: "Code-split a component and load it on demand." },
            { command: "<Suspense fallback={<Spinner />}>{children}</Suspense>", description: "Show a fallback while a lazy component — or Suspense-enabled data fetch — is loading." },
          ],
        },
        {
          title: "Custom Hooks",
          entries: [
            { command: "function useToggle(initial = false) { const [on, setOn] = useState(initial); const toggle = useCallback(() => setOn((v) => !v), []); return [on, toggle] as const; }", description: "A small reusable stateful toggle." },
            { command: "function useDebounce<T>(value: T, delay = 300) { const [debounced, setDebounced] = useState(value); useEffect(() => { const id = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(id); }, [value, delay]); return debounced; }", description: "Debounce a fast-changing value, such as search input, before acting on it." },
            { command: "function useLocalStorage<T>(key: string, initial: T) { const [value, setValue] = useState<T>(() => JSON.parse(localStorage.getItem(key) ?? 'null') ?? initial); useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]); return [value, setValue] as const; }", description: "Persist a piece of state to localStorage, mirroring `useState`'s API." },
          ],
        },
      ],
    },
    {
      slug: "vue",
      name: "Vue",
      tagline: "Composition API patterns — `<script setup>`, reactivity, and the composables that replace mixins.",
      categories: [
        {
          title: "Reactivity",
          entries: [
            { command: "const count = ref(0);", description: "A reactive primitive value; read and write it through `.value`." },
            { command: "const state = reactive({ count: 0 });", description: "A reactive object; access its properties directly, no `.value` needed." },
            { command: "const double = computed(() => count.value * 2);", description: "A derived, cached value that updates whenever its dependencies change." },
            { command: "watch(count, (newVal, oldVal) => { /* ... */ });", description: "Run a callback when a specific reactive source changes." },
            { command: "watchEffect(() => { console.log(count.value); });", description: "Run a callback immediately, then again whenever any reactive value it reads changes." },
            { command: "const { x, y } = toRefs(state);", description: "Destructure a reactive object into individual refs without losing reactivity." },
          ],
        },
        {
          title: "Component Basics (<script setup>)",
          entries: [
            { command: "<script setup lang='ts'>", description: "Compile-time sugar — top-level bindings are exposed to the template automatically." },
            { command: "const props = defineProps<{ title: string; count?: number }>();", description: "Declare typed props." },
            { command: "const emit = defineEmits<{ (e: 'update', value: number): void }>();", description: "Declare typed events the component can emit." },
            { command: "emit('update', newValue);", description: "Emit an event up to the parent." },
            { command: "defineExpose({ focus });", description: "Expose methods or properties to a parent holding a template ref on this component." },
            { command: "const model = defineModel<string>();", description: "A two-way bindable prop (Vue 3.4+) — replaces the old `modelValue` prop plus `update:modelValue` emit pair." },
          ],
        },
        {
          title: "Template Syntax",
          entries: [
            { command: "<div v-if='isOpen'>...</div>", description: "Conditionally render — and destroy — an element." },
            { command: "<div v-else-if='isLoading'>...</div>", description: "Chain another condition onto a `v-if`." },
            { command: "<div v-else>...</div>", description: "The fallback branch of a `v-if` chain." },
            { command: "<li v-for='item in items' :key='item.id'>{{ item.name }}</li>", description: "Render a list; `:key` should be stable and unique per item, same as in React." },
            { command: "<img :src='avatarUrl' :alt='user.name' />", description: "`:` is shorthand for `v-bind` — binds an attribute to an expression." },
            { command: "<button @click='handleClick'>Save</button>", description: "`@` is shorthand for `v-on` — binds an event listener." },
            { command: "<input v-model='query' />", description: "Two-way binding between an input and reactive state." },
            { command: "<div v-show='isVisible'>...</div>", description: "Toggle CSS `display` instead of adding/removing the element from the DOM — cheaper for frequent toggles." },
          ],
        },
        {
          title: "Lifecycle Hooks",
          entries: [
            { command: "onMounted(() => { /* ... */ });", description: "Run after the component is mounted and the DOM is ready." },
            { command: "onUpdated(() => { /* ... */ });", description: "Run after a reactive dependency change has updated the DOM." },
            { command: "onUnmounted(() => { /* ... */ });", description: "Run cleanup right before the component is removed." },
            { command: "onBeforeMount(() => { /* ... */ });", description: "Run just before the component mounts, before the DOM exists." },
          ],
        },
        {
          title: "Composables & Provide/Inject",
          entries: [
            { command: "provide('theme', theme);", description: "Make a value available to every descendant component." },
            { command: "const theme = inject('theme', 'light');", description: "Read a provided value, with a fallback default." },
            { command: "function useCounter(initial = 0) { const count = ref(initial); const increment = () => count.value++; return { count, increment }; }", description: "A reusable composable — the Composition API's replacement for mixins." },
          ],
        },
        {
          title: "Router & State (Vue Router / Pinia)",
          entries: [
            { command: "const router = useRouter();", description: "Get the router instance inside `<script setup>`." },
            { command: "const route = useRoute();", description: "Get the current route, reactively." },
            { command: "router.push('/dashboard');", description: "Navigate programmatically." },
            { command: "const id = route.params.id;", description: "Read a dynamic route parameter." },
            { command: "export const useUserStore = defineStore('user', { state: () => ({ name: '' }), actions: { setName(n: string) { this.name = n; } } });", description: "Define a Pinia store with typed state and actions." },
            { command: "const userStore = useUserStore();", description: "Use the store inside a component." },
            { command: "const { name } = storeToRefs(userStore);", description: "Destructure store state while keeping reactivity — plain destructuring loses it." },
          ],
        },
      ],
    },
    {
      slug: "tailwind",
      name: "Tailwind CSS",
      tagline: "The utility classes reached for most — layout, spacing, and the responsive/state prefixes that combine with everything.",
      categories: [
        {
          title: "Flexbox & Layout",
          entries: [
            { command: "flex", description: "display: flex." },
            { command: "flex flex-col", description: "A flex container, stacked vertically." },
            { command: "items-center justify-between", description: "Vertically center items and spread them across the main axis." },
            { command: "flex-1", description: "Grow to fill the available space." },
            { command: "flex-wrap gap-3", description: "Wrap onto new lines, with a consistent gap between items." },
            { command: "shrink-0", description: "Prevent an item from shrinking below its content size." },
          ],
        },
        {
          title: "Grid",
          entries: [
            { command: "grid grid-cols-3 gap-4", description: "A 3-column grid with gaps between cells." },
            { command: "col-span-2", description: "Span two columns." },
            { command: "grid-cols-1 md:grid-cols-3", description: "One column on mobile, three from the `md` breakpoint up." },
            { command: "place-items-center", description: "Center items on both axes inside their grid cell." },
          ],
        },
        {
          title: "Spacing & Sizing",
          entries: [
            { command: "p-4", description: "Padding on all sides." },
            { command: "px-6 py-2", description: "Horizontal and vertical padding." },
            { command: "m-auto", description: "Center a block element horizontally — needs a defined width." },
            { command: "w-full max-w-lg", description: "Full width, capped at a maximum." },
            { command: "h-screen", description: "Full viewport height." },
            { command: "space-y-4", description: "Vertical gap between direct children, without a flex or grid container." },
          ],
        },
        {
          title: "Typography",
          entries: [
            { command: "text-sm font-semibold", description: "Font size and weight." },
            { command: "tracking-wide leading-relaxed", description: "Letter spacing and line height." },
            { command: "truncate", description: "Single-line overflow ellipsis." },
            { command: "line-clamp-3", description: "Clamp text to 3 lines, with a trailing ellipsis." },
            { command: "text-start", description: "Logical start alignment — respects the document's LTR/RTL direction, unlike `text-left`." },
          ],
        },
        {
          title: "Colors & Backgrounds",
          entries: [
            { command: "bg-accent text-white", description: "Background and text color from the theme palette." },
            { command: "bg-accent/10", description: "Background color at 10% opacity, via Tailwind's slash opacity syntax." },
            { command: "border border-border", description: "A themed 1px border." },
            { command: "bg-gradient-to-r from-accent to-transparent", description: "A left-to-right gradient." },
          ],
        },
        {
          title: "Responsive & State Variants",
          entries: [
            { command: "md:flex-row", description: "Apply a utility from the `md` breakpoint up — Tailwind is mobile-first." },
            { command: "hover:border-accent focus-visible:border-accent", description: "Style on mouse hover and keyboard focus." },
            { command: "disabled:opacity-60 disabled:pointer-events-none", description: "Style a disabled control and block interaction with it." },
            { command: "dark:bg-surface", description: "Apply only when dark mode is active." },
            { command: "group-hover:opacity-100", description: "Style a child element based on hovering its ancestor marked `group`." },
          ],
        },
        {
          title: "Effects & Transitions",
          entries: [
            { command: "rounded-xl shadow-sm", description: "Corner radius and a subtle drop shadow." },
            { command: "transition-all duration-300 ease-out", description: "Animate property changes smoothly." },
            { command: "hover:-translate-y-0.5", description: "Lift an element slightly on hover." },
            { command: "backdrop-blur-md", description: "Blur whatever sits behind a translucent element." },
          ],
        },
      ],
    },
  ] satisfies CheatSheetStack[],
  comingSoon: [
    { name: "ASP.NET Core & C#" },
    { name: "Next.js" },
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
    {
      slug: "react",
      name: "React",
      tagline: "الگوهای مبتنی بر Hook برای کار روزمره با کامپوننت‌ها — state، effect، و نکاتی که معمولاً گیر می‌اندازند.",
      categories: [
        {
          title: "State و Effect",
          entries: [
            { command: "const [value, setValue] = useState(initialValue);", description: "یک تکه state محلی و setter آن را تعریف می‌کند." },
            { command: "useEffect(() => { /* effect */ return () => { /* cleanup */ }; }, [deps]);", description: "یک side effect بعد از رندر اجرا می‌کند؛ تابع بازگشتی، پیش از اجرای بعدی یا هنگام unmount پاک‌سازی می‌کند." },
            { command: "useEffect(() => { /* runs once */ }, []);", description: "با آرایه‌ی وابستگی خالی، effect را فقط یک‌بار هنگام mount اجرا می‌کند." },
            { command: "const value = useMemo(() => computeExpensive(a, b), [a, b]);", description: "یک مقدار را فقط زمانی که وابستگی‌هایش تغییر کنند دوباره محاسبه می‌کند." },
            { command: "const handleClick = useCallback(() => doSomething(id), [id]);", description: "رفرنس یک تابع را بین رندرها ثابت نگه می‌دارد، مگر وابستگی‌هایش تغییر کنند." },
            { command: "const ref = useRef(initialValue);", description: "یک مقدار قابل‌تغییر نگه می‌دارد که تغییرش باعث رندر مجدد نمی‌شود." },
            { command: "const [state, dispatch] = useReducer(reducer, initialState);", description: "به‌جای چند useState، انتقال‌های پیچیده‌ترِ state را با یک reducer مدیریت می‌کند." },
          ],
        },
        {
          title: "پایه‌های کامپوننت",
          entries: [
            { command: "function Button({ label, onClick }: { label: string; onClick: () => void }) { return <button onClick={onClick}>{label}</button>; }", description: "یک function component تایپ‌شده — شکل استاندارد اکثر کامپوننت‌ها." },
            { command: "export default function Page() { return <main>...</main>; }", description: "export پیش‌فرض؛ شکل معمولِ یک کامپوننتِ صفحه یا مسیر." },
            { command: "function Card({ children }: { children: React.ReactNode }) { return <div className='card'>{children}</div>; }", description: "دریافت و رندر children دلخواه." },
            { command: "<> <Header /> <Body /> </>", description: "Fragment — گروه‌بندی عناصر بدون اضافه‌کردن یک نود DOM اضافه." },
            { command: "{condition && <Banner />}", description: "یک عنصر را فقط وقتی شرطی درست است رندر می‌کند." },
            { command: "{condition ? <A /> : <B />}", description: "بر اساس یک شرط، یکی از دو عنصر را رندر می‌کند." },
          ],
        },
        {
          title: "لیست‌ها و Key",
          entries: [
            { command: "items.map((item) => <li key={item.id}>{item.name}</li>)", description: "یک لیست را رندر می‌کند؛ `key` باید برای هر آیتم پایدار و یکتا باشد — نه در هر رندر از نو ساخته شود." },
            { command: "items.filter((item) => item.active).map((item) => <Row key={item.id} item={item} />)", description: "پیش از map کردن فیلتر می‌کند، به‌جای برگرداندن `null` از داخل map." },
            { command: "items.length === 0 ? <Empty /> : items.map((item) => <Row key={item.id} item={item} />)", description: "حالت لیست خالی را به‌صراحت مدیریت می‌کند، به‌جای رندر هیچ‌چیز." },
            { command: "items.map((item, index) => <li key={index}>{item}</li>) // avoid if the list can reorder", description: "استفاده از index آرایه به‌عنوان key، به‌محض اضافه/حذف/جابه‌جایی آیتم‌ها state و انیمیشن‌ها را خراب می‌کند." },
          ],
        },
        {
          title: "رویدادها و فرم‌ها",
          entries: [
            { command: "<input value={value} onChange={(e) => setValue(e.target.value)} />", description: "یک input کنترل‌شده — مقدار در اختیار React است، نه DOM." },
            { command: "<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>", description: "از رفتار پیش‌فرض مرورگر (رفرش کامل صفحه) جلوگیری می‌کند." },
            { command: "<button onClick={() => handleClick(id)}>Delete</button>", description: "برای اینکه handler بتواند آرگومان بگیرد، در یک تابع پیکانی inline پیچیده می‌شود." },
            { command: "<input type='checkbox' onChange={(e) => console.log(e.target.checked)} />", description: "چک‌باکس‌ها وضعیت را از طریق `.checked` گزارش می‌دهند، نه `.value`." },
          ],
        },
        {
          title: "Context و Ref",
          entries: [
            { command: "const ThemeContext = createContext<Theme>('light');", description: "یک context با مقدار پیش‌فرض می‌سازد." },
            { command: "<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>", description: "یک مقدار را در اختیار همه‌ی زیردرخت قرار می‌دهد." },
            { command: "const theme = useContext(ThemeContext);", description: "نزدیک‌ترین مقدار فراهم‌شده را می‌خواند." },
            { command: "const Input = forwardRef<HTMLInputElement, Props>((props, ref) => <input ref={ref} {...props} />);", description: "یک ref را از میان یک کامپوننت تا یک نود واقعی DOM پاس می‌دهد." },
          ],
        },
        {
          title: "عملکرد (Performance)",
          entries: [
            { command: "const MemoCard = React.memo(Card);", description: "وقتی props تغییر نکرده، از رندر مجدد کامپوننت صرف‌نظر می‌کند." },
            { command: "const LazyModal = lazy(() => import('./Modal'));", description: "یک کامپوننت را code-split کرده و در صورت نیاز بارگذاری می‌کند." },
            { command: "<Suspense fallback={<Spinner />}>{children}</Suspense>", description: "در زمان بارگذاری یک کامپوننت lazy — یا واکشی داده‌ی سازگار با Suspense — یک fallback نشان می‌دهد." },
          ],
        },
        {
          title: "Hookهای سفارشی",
          entries: [
            { command: "function useToggle(initial = false) { const [on, setOn] = useState(initial); const toggle = useCallback(() => setOn((v) => !v), []); return [on, toggle] as const; }", description: "یک toggle کوچک و قابل‌استفاده‌ی مجدد." },
            { command: "function useDebounce<T>(value: T, delay = 300) { const [debounced, setDebounced] = useState(value); useEffect(() => { const id = setTimeout(() => setDebounced(value), delay); return () => clearTimeout(id); }, [value, delay]); return debounced; }", description: "یک مقدارِ سریع‌التغییر، مثل ورودی جست‌وجو، را پیش از استفاده debounce می‌کند." },
            { command: "function useLocalStorage<T>(key: string, initial: T) { const [value, setValue] = useState<T>(() => JSON.parse(localStorage.getItem(key) ?? 'null') ?? initial); useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]); return [value, setValue] as const; }", description: "یک تکه state را در localStorage نگه می‌دارد، با APIای شبیه `useState`." },
          ],
        },
      ],
    },
    {
      slug: "vue",
      name: "Vue",
      tagline: "الگوهای Composition API — `<script setup>`، reactivity، و composableهایی که جایگزین mixin شده‌اند.",
      categories: [
        {
          title: "Reactivity",
          entries: [
            { command: "const count = ref(0);", description: "یک مقدار اولیه‌ی reactive؛ خواندن و نوشتنش از طریق `.value`." },
            { command: "const state = reactive({ count: 0 });", description: "یک آبجکت reactive؛ به property‌هایش مستقیم دسترسی دارید، بدون نیاز به `.value`." },
            { command: "const double = computed(() => count.value * 2);", description: "یک مقدار مشتق‌شده و کش‌شده که با تغییر وابستگی‌هایش به‌روز می‌شود." },
            { command: "watch(count, (newVal, oldVal) => { /* ... */ });", description: "با تغییر یک منبع reactive مشخص، یک callback اجرا می‌کند." },
            { command: "watchEffect(() => { console.log(count.value); });", description: "بلافاصله و سپس با هر تغییر در هر مقدار reactiveای که می‌خواند، دوباره اجرا می‌شود." },
            { command: "const { x, y } = toRefs(state);", description: "یک آبجکت reactive را بدون از دست دادن reactivity به refهای جداگانه تجزیه می‌کند." },
          ],
        },
        {
          title: "پایه‌های کامپوننت (<script setup>)",
          entries: [
            { command: "<script setup lang='ts'>", description: "شکر نحوی در زمان کامپایل — bindingهای سطح بالا خودکار در اختیار template قرار می‌گیرند." },
            { command: "const props = defineProps<{ title: string; count?: number }>();", description: "propهای تایپ‌شده را تعریف می‌کند." },
            { command: "const emit = defineEmits<{ (e: 'update', value: number): void }>();", description: "رویدادهایی که کامپوننت می‌تواند emit کند را با تایپ تعریف می‌کند." },
            { command: "emit('update', newValue);", description: "یک رویداد را به والد emit می‌کند." },
            { command: "defineExpose({ focus });", description: "متدها یا propertyها را در اختیار والدی که روی این کامپوننت template ref دارد قرار می‌دهد." },
            { command: "const model = defineModel<string>();", description: "یک prop دوطرفه‌بایند (Vue 3.4+) — جایگزین جفتِ قدیمیِ prop به‌نام `modelValue` و emit به‌نام `update:modelValue`." },
          ],
        },
        {
          title: "نحو Template",
          entries: [
            { command: "<div v-if='isOpen'>...</div>", description: "یک عنصر را به‌صورت شرطی رندر — و حذف — می‌کند." },
            { command: "<div v-else-if='isLoading'>...</div>", description: "یک شرط دیگر را به زنجیره‌ی `v-if` اضافه می‌کند." },
            { command: "<div v-else>...</div>", description: "شاخه‌ی پیش‌فرضِ زنجیره‌ی `v-if`." },
            { command: "<li v-for='item in items' :key='item.id'>{{ item.name }}</li>", description: "یک لیست را رندر می‌کند؛ `:key` باید برای هر آیتم پایدار و یکتا باشد، درست مثل React." },
            { command: "<img :src='avatarUrl' :alt='user.name' />", description: "`:` مخفف `v-bind` است — یک attribute را به یک expression بایند می‌کند." },
            { command: "<button @click='handleClick'>Save</button>", description: "`@` مخفف `v-on` است — یک event listener را بایند می‌کند." },
            { command: "<input v-model='query' />", description: "بایند دوطرفه بین یک input و state reactive." },
            { command: "<div v-show='isVisible'>...</div>", description: "به‌جای اضافه/حذف عنصر از DOM، فقط `display` CSS را تغییر می‌دهد — برای toggle‌های مکرر ارزان‌تر است." },
          ],
        },
        {
          title: "Lifecycle Hookها",
          entries: [
            { command: "onMounted(() => { /* ... */ });", description: "بعد از mount شدن کامپوننت و آماده‌شدن DOM اجرا می‌شود." },
            { command: "onUpdated(() => { /* ... */ });", description: "بعد از اینکه تغییر یک وابستگی reactive، DOM را به‌روزرسانی کرد اجرا می‌شود." },
            { command: "onUnmounted(() => { /* ... */ });", description: "درست پیش از حذف کامپوننت، برای پاک‌سازی اجرا می‌شود." },
            { command: "onBeforeMount(() => { /* ... */ });", description: "درست پیش از mount شدن کامپوننت، پیش از وجود DOM اجرا می‌شود." },
          ],
        },
        {
          title: "Composable و Provide/Inject",
          entries: [
            { command: "provide('theme', theme);", description: "یک مقدار را در اختیار همه‌ی کامپوننت‌های زیردست قرار می‌دهد." },
            { command: "const theme = inject('theme', 'light');", description: "یک مقدار فراهم‌شده را می‌خواند، همراه با یک مقدار پیش‌فرض." },
            { command: "function useCounter(initial = 0) { const count = ref(initial); const increment = () => count.value++; return { count, increment }; }", description: "یک composable قابل‌استفاده‌ی مجدد — جایگزینِ Composition API برای mixin." },
          ],
        },
        {
          title: "Router و State (Vue Router / Pinia)",
          entries: [
            { command: "const router = useRouter();", description: "نمونه‌ی router را داخل `<script setup>` می‌گیرد." },
            { command: "const route = useRoute();", description: "مسیر جاری را به‌صورت reactive می‌گیرد." },
            { command: "router.push('/dashboard');", description: "به‌صورت برنامه‌ای ناوبری می‌کند." },
            { command: "const id = route.params.id;", description: "یک پارامتر پویای مسیر را می‌خواند." },
            { command: "export const useUserStore = defineStore('user', { state: () => ({ name: '' }), actions: { setName(n: string) { this.name = n; } } });", description: "یک استور Pinia با state و action تایپ‌شده تعریف می‌کند." },
            { command: "const userStore = useUserStore();", description: "استور را داخل یک کامپوننت استفاده می‌کند." },
            { command: "const { name } = storeToRefs(userStore);", description: "state استور را با حفظ reactivity تجزیه می‌کند — تجزیه‌ی معمولی reactivity را از بین می‌برد." },
          ],
        },
      ],
    },
    {
      slug: "tailwind",
      name: "Tailwind CSS",
      tagline: "پراستفاده‌ترین کلاس‌های utility — چیدمان، فاصله‌گذاری، و پیشوندهای responsive/state که با همه چیز ترکیب می‌شوند.",
      categories: [
        {
          title: "Flexbox و چیدمان",
          entries: [
            { command: "flex", description: "display: flex." },
            { command: "flex flex-col", description: "یک کانتینر flex، چیده‌شده به‌صورت عمودی." },
            { command: "items-center justify-between", description: "آیتم‌ها را عمودی وسط‌چین می‌کند و در طول محور اصلی پخش‌شان می‌کند." },
            { command: "flex-1", description: "فضای موجود را پر می‌کند (رشد می‌کند)." },
            { command: "flex-wrap gap-3", description: "در خطوط جدید می‌شکند، با فاصله‌ی یکسان بین آیتم‌ها." },
            { command: "shrink-0", description: "از کوچک‌شدن یک آیتم کمتر از اندازه‌ی محتوایش جلوگیری می‌کند." },
          ],
        },
        {
          title: "Grid",
          entries: [
            { command: "grid grid-cols-3 gap-4", description: "یک گرید سه‌ستونه با فاصله بین سلول‌ها." },
            { command: "col-span-2", description: "دو ستون را اشغال می‌کند." },
            { command: "grid-cols-1 md:grid-cols-3", description: "در موبایل یک ستون، از breakpoint مربوط به `md` به بعد سه ستون." },
            { command: "place-items-center", description: "آیتم‌ها را در هر دو محور، وسطِ سلول گرید قرار می‌دهد." },
          ],
        },
        {
          title: "فاصله‌گذاری و اندازه",
          entries: [
            { command: "p-4", description: "padding در همه‌ی جهت‌ها." },
            { command: "px-6 py-2", description: "padding افقی و عمودی." },
            { command: "m-auto", description: "یک عنصر بلاک را به‌صورت افقی وسط‌چین می‌کند — نیازمند عرض مشخص است." },
            { command: "w-full max-w-lg", description: "عرض کامل، با یک سقف حداکثری." },
            { command: "h-screen", description: "ارتفاع کامل viewport." },
            { command: "space-y-4", description: "فاصله‌ی عمودی بین فرزندان مستقیم، بدون نیاز به کانتینر flex یا grid." },
          ],
        },
        {
          title: "تایپوگرافی",
          entries: [
            { command: "text-sm font-semibold", description: "اندازه و وزن فونت." },
            { command: "tracking-wide leading-relaxed", description: "فاصله‌ی حروف و ارتفاع خط." },
            { command: "truncate", description: "سرریز تک‌خطی با سه‌نقطه." },
            { command: "line-clamp-3", description: "متن را به ۳ خط محدود می‌کند، با سه‌نقطه در انتها." },
            { command: "text-start", description: "چینش منطقیِ start — برخلاف `text-left`، جهت LTR/RTL سند را رعایت می‌کند." },
          ],
        },
        {
          title: "رنگ و پس‌زمینه",
          entries: [
            { command: "bg-accent text-white", description: "رنگ پس‌زمینه و متن از پالت تم." },
            { command: "bg-accent/10", description: "رنگ پس‌زمینه با ۱۰٪ شفافیت، از طریق نحو opacity با اسلش در Tailwind." },
            { command: "border border-border", description: "یک border ۱ پیکسلیِ تم‌دار." },
            { command: "bg-gradient-to-r from-accent to-transparent", description: "یک گرادیان از چپ به راست." },
          ],
        },
        {
          title: "متغیرهای Responsive و State",
          entries: [
            { command: "md:flex-row", description: "یک utility را از breakpoint مربوط به `md` به بعد اعمال می‌کند — Tailwind اول-موبایل است." },
            { command: "hover:border-accent focus-visible:border-accent", description: "استایل روی هاور موس و فوکوس کیبورد." },
            { command: "disabled:opacity-60 disabled:pointer-events-none", description: "یک کنترل غیرفعال را استایل می‌دهد و تعامل با آن را مسدود می‌کند." },
            { command: "dark:bg-surface", description: "فقط وقتی حالت تاریک فعال است اعمال می‌شود." },
            { command: "group-hover:opacity-100", description: "یک عنصر فرزند را بر اساس هاور روی نیای علامت‌خورده با `group` استایل می‌دهد." },
          ],
        },
        {
          title: "افکت و ترنزیشن",
          entries: [
            { command: "rounded-xl shadow-sm", description: "شعاع گوشه و یک سایه‌ی ملایم." },
            { command: "transition-all duration-300 ease-out", description: "تغییرات property را به‌آرامی متحرک می‌کند." },
            { command: "hover:-translate-y-0.5", description: "روی هاور، عنصر را کمی بالا می‌برد." },
            { command: "backdrop-blur-md", description: "هرچه پشت یک عنصر نیمه‌شفاف است را بلر می‌کند." },
          ],
        },
      ],
    },
  ],
  comingSoon: [
    { name: "ASP.NET Core و #C" },
    { name: "Next.js" },
    { name: "SQL Server و EF Core" },
    { name: "TypeScript" },
    { name: "Docker" },
  ],
};

export type CheatSheets = typeof en;

export function getCheatSheets(lang: Lang): CheatSheets {
  return lang === "fa" ? fa : en;
}
