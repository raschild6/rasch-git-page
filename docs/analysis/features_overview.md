# Rasch-Git — Features Overview

> **Rasch-Git** (Raschild Git Manager) is a desktop Git client for Windows, macOS and Linux. It pairs a fast, visual commit graph with the everyday tools developers use most — staging, diffs, branches, stashes, a terminal — and adds a set of capabilities that typical Git GUIs don't have: a user interface that never freezes, undo for almost any operation, bulk actions across branches and repositories, and conflict resolution line by line.

This document has two audiences:

- **The team**, as the reference list of what the app does today.
- **The website** (`rasch-git-page`), as source material for a public *Features* page.

Each feature below has:

- **In one line**: a tagline you can use as-is on the website.
- **What it does**: a factual description of 3–5 lines.
- **Why it's different**: how it compares with standard Git GUIs (SourceTree, GitHub Desktop, the Git GUIs bundled with Git and editors).
- **Where to find it**: where the feature lives in the app.

The [notes for the website](#notes-for-the-website) at the end list claims to avoid and suggested screenshots.

---

## Contents

1. [At a glance](#at-a-glance)
2. [Speed & reliability](#speed--reliability) — async GUI, virtualized graph, auto fetch with progress and cancel
3. [Reading history & changes](#reading-history--changes) — commit search, Deep Search, blame & file history, smart diff views, commit details
4. [Committing](#committing) — staging, commit templates, review-before-commit
5. [Safety net](#safety-net) — undo / redo, interactive rebase, git-flow, safe checkout, visual conflict resolution
6. [Branches & repositories at scale](#branches--repositories-at-scale) — the branch tree, submodules, drag & drop to open, tab groups, split view, worktrees, large files (Git LFS), bulk actions
7. [Your workspace](#your-workspace) — built-in terminal, custom toolbar buttons, custom themes, interface scale
8. [Integrations](#integrations) — pull requests, CI / CD status, clone & fork from your account, issues → branches (GitHub, GitLab)
9. [Platform, updates & support](#platform-updates--support) — accounts & SSH keys, commit signing, updates, logs, cross-platform look, tour
10. [Comparison summary](#comparison-summary)
11. [Keyboard shortcuts](#keyboard-shortcuts)
12. [Notes for the website](#notes-for-the-website)

---

## At a glance

| # | Feature | In one line |
|---|---|---|
| 1 | Fully async GUI | Every Git operation runs in the background — the window never freezes. |
| 2 | Virtualized commit graph | Smooth scrolling through huge histories, with stashes and uncommitted work in the graph. |
| 3 | Smart diff views | Hunk, Inline or Split — one click to switch, with syntax highlighting and search; changed images compared before / after. |
| 4 | Built-in terminal | A real shell in every repository tab, already in the right folder. |
| 5 | Tab groups | Organize many repositories into coloured, collapsible groups on their own row; hide tabs without closing them. |
| 6 | Bulk branch & repo management | Delete, pull or merge many branches — or act on every open repo — in one go. |
| 7 | Auto fetch with real progress & cancel | Always up to date, real progress bars, and a cancel button that actually stops Git. |
| 8 | Visual conflict resolution & auto-stash | Resolve conflicts line by line; checkouts carry your changes across automatically. |
| 9 | Custom toolbar buttons | Put your own commands, scripts and links one click away. |
| 10 | Custom themes | Dark, Light, or your own theme from five colours, with a live preview. |
| 11 | Commit search | Find any loaded commit by message, author or hash, instantly. |
| 12 | Commit templates | Pre-filled commit titles with your version and branch. |
| 13 | Undo / Redo | Undo commits, checkouts, resets, discards, stashes and more — safely. |
| 14 | Review before commit | Merges and cherry-picks are staged for review, never committed behind your back. |
| 15 | One tree for every ref | Branches, remotes, tags, stashes and a detached HEAD in one filterable tree. |
| 16 | Hunk-level staging | Stage or unstage individual hunks right from the diff; stash, stage, unstage or discard several selected files at once. |
| 17 | Commit details | Author avatar, copyable SHA, full message and changed files at a glance. |
| 18 | Activity log & full command logs | See everything the app did; export every Git command's raw output. |
| 19 | Automatic updates | Get notified of new versions, then download, verify and install in one click. |
| 20 | Consistent cross-platform look | Same layout and sizes on Windows, macOS and Linux, no overlapping controls. |
| 21 | Guided feature tour | A skippable tour points at each feature in the real app. |
| 22 | Drag & drop to open | Drop repository folders on the window to open them — several at once. |
| 23 | Open in external programs | Open any file — or any committed version of it — in the app you choose. |
| 24 | Accounts & SSH keys | Sign in to GitHub once — or add a token or an SSH key — and push just works. |
| 25 | Deep Search | Find any file — or any line of code — across every branch and the whole history. |
| 26 | Scheduled actions *(experimental)* | Fetch, pull (keeping local changes), push or run your own commands automatically, on a schedule. |
| 27 | Blame & File History | Who changed each line and why — and every version of a file, renames included. |
| 28 | Pull requests | Create, review, check out and merge pull requests without leaving the app. |
| 29 | Split view | Up to four repositories side by side in one window, each one live. |
| 30 | Interactive rebase | Reorder, reword, squash or drop commits visually — and undo the whole rebase in one step. |
| 31 | Submodules | See every submodule's state at a glance, update, add or remove them, and read "moved by N commits" instead of a raw pointer diff. |
| 32 | Git-flow | Start and finish features, releases and hotfixes with a checklist of every step — no extension to install, every merge reviewed. |
| 33 | CI / CD status | See whether CI passed on your branches and commits, get told when your push's checks finish, re-run failed jobs. |
| 34 | Clone & fork from your account | Pick a repository from your GitHub or GitLab account instead of copying a URL — or fork it and clone your fork in one step. |
| 35 | Issues → branches | Your GitHub or GitLab issues next to the graph — start a well-named branch from one in a click, and always see which issue you're working on. |
| 36 | Worktrees | Work on two branches at once: open any branch in its own folder and tab, without stashing. |
| 37 | Commit signing | Get the *Verified* badge on your commits: sign with an SSH or GPG key, set up, tested and added to GitHub from one page. |
| 38 | Large files (Git LFS) | Repositories with big design files, media or datasets just work: download progress, real sizes, no pointer text. |
| 39 | Interface scale | The whole app larger or smaller, to any size from 25% to 400%, with Ctrl+Plus / Ctrl+Minus — text, icons and spacing together. |

---

## Speed & reliability

### 1. Fully async GUI

**In one line:** Every Git operation runs in the background — the window never freezes.

**What it does:** Fetch, pull, push, checkout, merge, rebase, stash, commit and even the routine `git status` all run on background threads. Operations that change a repository are queued per repository, so they never collide with each other or with a refresh. The window stays responsive the whole time: you can scroll the graph, read diffs or switch to another repository while Git works. Every operation reports its result in the toolbar, and errors are never silently swallowed.

**Why it's different:**
- Many Git GUIs block the window, or show a modal "please wait", during network operations and large checkouts. Some freeze on big repositories just to refresh status.
- Here, each repository tab has its own operation queue, so a slow push in one repository never stalls another.
- Built-in timeouts stop stalled network connections instead of hanging forever.

**Where to find it:** Everywhere; the toolbar's status area on the right shows what is running.

### 2. Commit graph with virtualization

**In one line:** Smooth scrolling through huge histories, with your stashes and uncommitted work right in the graph.

**What it does:** The graph draws branches as coloured lanes and merges as curves, and labels each branch tip as local, remote, or both. Only the rows near the visible area are materialized, and history loads in pages as you scroll, so repositories with very long histories open fast and scroll smoothly. Uncommitted changes appear as a "WIP" node, and each stash appears as its own node attached to the commit it was taken from. The columns (branch, graph, message, author, date) fit the window, and you can resize them. With the graph focused, **↑ / ↓** step from commit to commit and the view follows.

The graph is also where you act on history, with **right-click menus**:
- **Branch and tag labels:** check out, merge into the current branch, fast-forward, rebase, push, pull, rename or delete a local branch (remote labels: check out, track, merge, delete on the remote; tags: check out, push, delete).
  - **Fast-forward in both directions:** on `main`, a right-click on `dev` offers *Fast-forward 'main' to 'dev'* and *Fast-forward 'dev' to 'main'*: the second moves `dev` up to `main` without leaving `main` (only offered when it really is a fast-forward).
  - **Reset Soft / Mixed / Hard to here** on another branch's label or on a remote label (e.g. `origin/feature`) moves the branch you are on to it: useful to make a local branch match its remote.
- **A commit's coloured dot:** cherry-pick, revert, **Reset Soft / Mixed / Hard to here** (soft keeps the differences staged, mixed keeps them unstaged, hard discards them after a confirmation; only when a branch is checked out, and undoable), create a branch or tag there, copy the SHA.
- **A stash node:** apply, pop or drop it.

**Why it's different:**
- Typical Git GUIs build every row of the history up front, which gets slow on large repositories.
- Stashes and work in progress usually live in a separate list; here they are part of the history view.
- The graph can optionally show tags (a per-repository setting) and marks a detached HEAD explicitly.
- Branch and commit actions are one right-click away on the graph itself, instead of in separate dialogs or menus.

**Where to find it:** The center of each repository tab; right-click a branch / tag label or a commit's dot.

### 7. Auto fetch with real progress tracking and cancel support

**In one line:** Always up to date, real progress bars, and a cancel button that actually stops Git.

**What it does:** The repository you are looking at is fetched when you switch to its tab and periodically at an interval you choose; you can also fetch on demand. Long operations (clone, fetch, pull, push, slow checkouts, merges) show Git's own progress as a real percentage in the toolbar, not a fake spinner. The cancel button next to the spinner kills the running Git process tree, so an operation can be stopped in the middle, and the repository is refreshed afterwards.

**Why it's different:**
- Many clients either don't auto-fetch, or fetch every open repository at once in the background.
- Here only the active repository is fetched, which saves bandwidth and avoids credential prompts piling up.
- Cancel is real: it terminates Git instead of just hiding the dialog.

**Where to find it:** Toolbar → **Fetch** (also in the Pull menu); **Edit → Auto Fetch…** sets the interval and fetch-on-tab-switch; the cancel button appears next to the toolbar spinner.

---

## Reading history & changes

### 11. Commit search

**In one line:** Find any loaded commit by message, author or hash, instantly.

**What it does:** Press **Ctrl+F** with the graph focused to open a search bar. Matching rows are highlighted as you type, the current match stands out, and **Enter** / **Shift+Enter** (or the arrow keys) jump between matches. A counter shows how many matches there are among the loaded commits. The same shortcut searches inside a diff when the diff viewer has focus.

**Why it's different:**
- Search is built into the graph itself, rather than into a separate log window or a filter that hides the rest of the history.
- One shortcut does the right thing depending on where you are.

**Where to find it:** **Ctrl+F** on the commit graph, or in the diff viewer.

### 25. Deep Search

**In one line:** Find any file — or any line of code — across every branch and the whole history.

**What it does:** One window, three searches (it reopens on the one you used last):

- **File names** — type a file name, part of it, or a glob (`*.sql`, `src/**/test_*.py`); optionally limit how many commits to search and a date range. Results list every commit that added, modified, renamed or deleted a matching file, with hash, date, author and message. Click one and the graph jumps to that commit — loading older history if needed — while the diff viewer shows that file's changes.
- **Text in branches** — "where is `parse_config` still used?": every line containing a text or a regular expression at the tip of all your branches (local and remote), only the local ones, or the current one. Results are grouped by file, with the line number, the match highlighted and the branches that have that line ("main +3") — the same line on many branches is one row, not one per branch. Double-click a line to open the blame of that file, at that branch, on that line.
- **Text in history** — "when was `OLD_API_KEY` added, and when was it removed?": the commits that added or removed a piece of text, even in files deleted long ago, or (option) every commit whose changed lines match a regular expression. Each result shows whether the text was added or removed, with the matching line; click it to see the commit and the file's diff.

The text searches have **Regex**, **Match case**, **Whole word** (branches) and an **In files** filter (`src/**/*.py, *.md`). Right-click a result for File History, Blame or Show in Graph. Every search runs in the background with a progress bar, shows results as they arrive and can be cancelled.

**Why it's different:**
- Most Git GUIs only show the history of a file that still exists and that you've already found in the tree; deleted or renamed files need `git log --all -- '**/name'` in a terminal.
- Searching code in other branches, or finding the commit that introduced or removed a line, usually means `git grep` and `git log -S` in a terminal, one branch at a time. Here it's one search over every branch at once, grouped by file, each hit one click from its blame or diff.

**Where to find it:** **Edit → Deep Search…** (`Ctrl+Shift+F`).

---

### 27. Blame & File History

**In one line:** Who changed each line and why — and every version of a file, renames included.

**What it does:** **Blame** shows the file with a gutter of author, date and commit next to each block of lines, shaded by age (newer is warmer). Click a line to select its commit in the graph and see its details; *Blame previous revision* steps back past a commit to see what was there before; formatting-only commits listed in `.git-blame-ignore-revs` are skipped. **File History** lists every commit that changed the file — following it across renames — with the change each one made, ready to open, blame at that commit or restore that version (undoable).

**Why it's different:**
- Many Git GUIs offer blame as a plain, separate window or not at all; here it sits in the main view, linked to the graph and the commit details.
- File History follows renames and shows each change inline, without a terminal `git log --follow -p`.

**Where to find it:** right-click a file (working changes or a commit's file list) → **Blame** / **File History**; the buttons in the diff header (`Ctrl+B` / `Ctrl+H`); a Deep Search result's menu.

---

### 26. Scheduled actions *(experimental)*

**In one line:** Fetch, pull (keeping local changes), push or run your own commands automatically, on a schedule.

**What it does:** Rules run while the app is open. Each rule is an action, some repositories and a trigger.
- **Actions:** fetch, pull (fast-forward only by default), stash + pull + unstash, push, fast-forward local branches, git maintenance, or one of your custom toolbar commands.
- **Repositories:** all open ones, a tab group, or chosen ones.
- **Triggers:** every N minutes (optionally only between, say, 08:00 and 19:00), daily at a time, on chosen weekdays, or at startup.

Scheduled work waits for your own operations, and each change can be undone. A run that ends in a conflict keeps your local changes in the stash and pauses that repository until you resolve it; if your changes don't fit the pulled commits they simply stay in the stash, with the files listed. The others carry on. Successful runs show one short summary; failures and conflicts collect in a window with a button to jump to the repository. A status-bar indicator always shows the next run. Push rules must be confirmed, never force-push, and skip protected branches.

**Why it's different:**
- Most Git GUIs only offer a periodic fetch; here the whole morning routine (fetch, update each repo without losing local work) runs by itself, safely.
- Missed runs (laptop asleep, app closed) are caught up once, not in a burst.

**Accuracy note:** marked **experimental** in the app, with a warning always visible in its window.

**Where to find it:** **Edit → Scheduled Actions…** and the status bar.

---

### 3. Smart diff views

**In one line:** Hunk, Inline or Split — one click to switch, with syntax highlighting and search; changed images compared before / after.

**What it does:**
- **Three views:** *Hunk* shows only the changed blocks, *Inline* shows the whole file with changes in place, and *Split* shows old and new side by side with aligned rows.
- **Readability:** syntax highlighting for 16 languages (Python, JavaScript, TypeScript, Java, C/C++, Go, Rust, Ruby, PHP, SQL, HTML, CSS, JSON, YAML, XML, shell), a minimap of changes, and Ctrl+F search inside the diff.
- **Clean copy:** copied code has no `+` / `-` prefixes, so it can be pasted straight into an editor.
- **Image diff:** click a changed image (PNG, JPEG, GIF, BMP, WebP, ICO, SVG, TIFF where supported) — in the working tree, the staged changes, a commit or a stash — and see it before and after, right in the app:
  - *Side by side* with size and file size ("Before 640×480 · 34 KB"), zoom and scrolling kept in step;
  - *Swipe*: a slider shows the old version on one side of the line and the new one on the other;
  - *Onion skin*: fade the new version over the old one;
  - *Difference*: the changed pixels highlighted over a dimmed image, with how many changed ("1,234 pixels changed (3.2 %)") — or "No visible change" when only the file's metadata differs.
  - Fit, 100 % (real pixels, also on high-resolution screens), zoom buttons and the mouse wheel; a checkerboard, theme, black or white background behind transparent pixels; added and deleted images shown on their own; during a conflict, *ours* next to *theirs*.
  - From the page: *Stage*, *Unstage* or *Discard* (asks first) the image, copy it, open the old or new version in an external program, and for SVG switch to the text diff of its source.
  - Very large images ask before loading and show a scaled preview; **View → Image Diff** turns it off (images then open in their program, as before).
- **Always current:** an open diff updates by itself. A working-tree or staged diff shows the file's new state after a pull, a reset or a change made elsewhere (scroll position kept), and closes when the file has no changes left; a commit's diff opened on a branch tip follows that branch when a fetch or pull brings a newer commit that changes the file.

**Why it's different:**
- Most Git GUIs offer one diff layout, or at most two.
- Hunk-level staging works straight from the diff (see [Hunk-level staging](#16-hunk-level-staging)).
- Most Git GUIs show "binary file changed" for an image, or the two versions without a way to tell what moved; here four views, including a pixel-exact difference with a count.

**Where to find it:** Click a changed file in the right panel, or a file of a commit; the view switcher is in the diff header. Images open in the image page (modes in its toolbar; **View → Image Diff** to turn it off).

### 17. Commit details

**In one line:** Author, SHA, full message and changed files at a glance.

**What it does:** Selecting a commit shows its details in the right panel:
- the author's avatar (initials), date and short SHA with a copy button;
- the title and full body, scrollable when long;
- the list of changed files, as a flat list or as a folder tree.

Clicking a file opens its diff for that commit. A right-click on a commit offers cherry-pick, revert, Reset Soft / Mixed / Hard to here, create a branch or tag here, and copy the SHA; a right-click on a branch label offers checkout, merge, fast-forward (either direction), reset to it, rebase, push, pull, rename and delete.

**Why it's different:**
- Everything about a commit is in one side panel next to the graph, instead of spread across several windows.
- The folder-tree view makes large commits easy to scan.

**Where to find it:** Click a commit in the graph.

---

## Committing

### 16. Hunk-level staging

**In one line:** Stage or unstage individual hunks right from the diff.

**What it does:**
- **Files:** stage, unstage or discard a single file with the buttons that appear when you hover it, or everything at once with *Stage All* / *Unstage All*. Discarding a file takes two clicks: the first turns the red arrow into a red bin, the second discards; clicking elsewhere or waiting a few seconds cancels it.
- **Room for either list:** drag the line between *Unstaged Files* and *Staged Files* to give one list more space; either can shrink down to just its header (both headers always stay visible). Double-click the line for half and half; the position is remembered.
- **Several files at once:** Ctrl+click (Cmd+click on macOS) and Shift+click select several files, in the unstaged list, the staged list or both together. Right-click the selection for:
  - **Stash Selected** (or **Stash This File** on a single file's right-click menu) — asks for a stash message first (pre-filled with Git's usual one, editable; Cancel stashes nothing), then stashes only those files, staged and unstaged changes alike (new untracked files too); every other change stays exactly where it is, staged or not. Popping the stash in the app brings the files back as they were, staged parts staged (a staged deletion comes back as an unstaged one); a plain `git stash pop` on the command line brings them back unstaged, except new files.
  - **Stage Selected** / **Unstage Selected** — files already on that side are skipped.
  - **Discard Selected…** — asks first, listing the files; files picked in the staged list lose their staged changes too, new files are deleted. One Undo brings them all back.
  - **Diff Selected** — opens the first file's diff with **‹ 1 / 3 ›** arrows to step through the others.

  A plain click starts a new selection; the single-file menu is unchanged when only one file is selected.
- **Hunks:** in the diff, stage or **discard** a single hunk of an unstaged file (discard asks first, reverts only that hunk and can be undone), or unstage a single hunk of a staged one.
- **Fallbacks:** when Git's standard patch application can't handle a hunk (for example, new files or unusual line endings), the app falls back to its own blob-level staging so the action still works.
- **Views:** changed files can be shown as a flat list or as a folder tree, remembered per repository for the unstaged and staged lists.

**Why it's different:**
- Partial staging is often missing or fragile in simpler GUIs; here it is built to work on edge cases.
- Stashing just a few files, even across the staged and unstaged lists, without disturbing the rest — and the stash holds only those files (Git's own partial stash also records everything else that was staged).
- Every discard can be undone (see [Undo / Redo](#13-undo--redo)).

**Where to find it:** The right panel (*Unstaged* / *Staged* files) and the diff viewer.

### 12. Customizable commit templates

**In one line:** Pre-filled commit titles with your project's version and branch.

**What it does:** You keep a list of predefined commit titles with placeholders: `{version}` is the project's version and `{branch}` is the current branch. The version is read from the right place for about 50 kinds of projects — `package.json`, `pyproject.toml`, `Cargo.toml`, `pom.xml`, Gradle, `.csproj`, a Helm chart's `appVersion`, `pubspec.yaml`, CMake, a `VERSION` file and many more — skipping the traps (a dependency's version, the Node or SDK version, the chart's own version). Without a version file it comes from the current release branch (`release/1.4.0`) or the next patch after the latest version tag; never from commit messages. **Repository → Version Source…** points a repository at any file (JSON, TOML, YAML, XML, INI, regex or plain text, with a Test button) or at a tag pattern. On a branch linked to an issue, `{issue}` (`#123`) and `{issue_title}` are filled in too. The first template pre-fills the commit title automatically and keeps it up to date when you change the version, until you type your own title; the sparkle button next to the title offers the others. The title field shows a character counter that warns before you pass 72 characters. You can amend the previous commit, or commit and push in one click.

**Why it's different:**
- Most clients start every commit from an empty box, or support only one static template.
- Templates here are a list with live placeholders, which suits teams with commit conventions such as `[FIX]`, `[NEW]` or version bumps.
- The version comes from your project's own manifest, whatever the language, and the title updates when you bump it.
- The same version detection suggests branch names like `dev-release/1.4.0` when you create a branch, and git-flow release names.

**Where to find it:** The *Commit* box in the right panel; edit the list in **Edit → Commit Messages…**; choose the version's source in **Repository → Version Source…**.

### 14. Review before commit (merge & cherry-pick)

**In one line:** Merges and cherry-picks are staged for review — never committed behind your back.

**What it does:** Merging a branch or cherry-picking a commit applies the changes to the staging area with the commit message pre-filled, and stops there. You review the result, adjust it if needed, and press **Commit** when you're happy; **Abort Merge** discards it. A merge that would change nothing ("already up to date") is detected and reported instead of producing an empty merge commit.

**Why it's different:**
- Most GUIs merge and cherry-pick straight into a commit, and you notice problems afterwards.
- Here nothing lands in history until you have looked at it.

**Where to find it:** Right-click a branch → *Merge*; right-click a commit → *Cherry-pick*.

---

## Safety net

### 13. Undo / Redo

**In one line:** Undo commits, checkouts, resets, discards, stashes and more — safely.

**What it does:**
- **Scope:** covers local operations — commit and amend, checkout, create / delete / rename branch, reset (soft, mixed or hard), discarding files (including untracked ones), staged merges and cherry-picks, revert, rebase, pull, fast-forward, tags, stash save / pop / apply / delete, and bulk branch actions.
- **Commits:** undoing a commit puts its changes back in the staging area and its message back in the commit box.
- **Hard resets:** undoing a hard reset brings back your uncommitted changes.
- **Safety check:** before applying, undo and redo verify that nothing they would touch has changed since. If something has, they refuse and say what changed.

**Why it's different:**
- Most Git GUIs have no undo at all, or only "undo last commit".
- Here almost every local action is reversible, including destructive ones like hard reset and discard.
- Undo never overwrites work you did afterwards.
- Undoing something that was already pushed asks first.

**Where to find it:** The toolbar's **Undo** / **Redo** buttons, **Edit → Undo / Redo**, or **Ctrl+Z** / **Ctrl+Shift+Z** (**Ctrl+Y**).

### 30. Interactive rebase

**In one line:** Reorder, reword, squash or drop commits visually — and undo the whole rebase in one step.

**What it does:**
- **The editor:** pick a commit and the dialog lists it and every commit after it, newest on top. Drag commits to reorder them and set each one to *pick*, *reword*, *edit*, *squash*, *fixup* or *drop* with a button or a single key (P R E S F D). Reworded commits and squash groups get a message box, pre-filled like Git would; the selected commit's changes are shown below, and a summary says how many commits you will end up with.
- **Quick actions:** a commit's right-click menu can reword it, squash or fixup it into its parent, drop it or move it up / down without opening the editor. **Autosquash** places `fixup!` / `squash!` commits automatically.
- **Warnings first:** commits that are already pushed are marked (rewriting them needs a force-push), and local changes can be stashed for the duration of the rebase with one tick.
- **Pauses:** a conflict opens the usual conflict editor, showing which step of the rebase you are on, with *Skip This Commit*; a commit marked *edit* stops with a banner above the graph to amend it, then *Continue* or *Abort*. The banner comes back if you close the app mid-rebase.
- **Undo:** the whole rebase — even one that paused for conflicts — is a single undo step.

**Why it's different:**
- Most Git GUIs leave history rewriting to `git rebase -i` in a terminal and a text editor, or offer only "amend last commit".
- Here it is a visual editor with previews and warnings, the paused states are explained in place, and a finished rebase is one Ctrl+Z away from undone.

**Where to find it:** Right-click a commit in the graph → **Edit History**; right-click the current branch's label in the graph → **Interactive Rebase…**.

### 32. Git-flow

**In one line:** Start and finish features, releases and hotfixes in a few clicks — every step shown, every merge reviewed, no extension to install.

**What it does:**
- **Set up:** *Initialise Git-flow* picks the production branch (`main` or `master`), creates `develop` if it's missing and sets the branch prefixes and the version tag prefix. Repositories already set up with the git-flow command-line tool are recognised as they are, and the two can be mixed.
- **Start:** a feature, bugfix, release, hotfix or support branch from the right base. For a release or hotfix the version is suggested (next minor / next patch from the latest version tag), and it can be written into `pom.xml` / `package.json` as a "Bump version to …" commit — only the version changes, the file's formatting is kept.
- **Finish:** a checklist of every step before anything runs — merge into `develop` (and into the production branch, tag and merge back into `develop` for a release or hotfix), delete the branch and, with **Finish & Push**, push. Each merge is staged for your review; commit it and the finish carries on by itself. A banner above the graph shows the step you're on, conflicts open the usual conflict editor, and the finish resumes after a restart. Each part of the finish can be undone.
- **At a glance:** flow branches get an icon in the sidebar, with *Finish…* in their right-click menu.

**Why it's different:**
- Most Git GUIs need the git-flow extension installed, and their finish runs everything at once: merges are committed, tags created and branches deleted before you see the result.
- Here it's built in, the plan is shown first, every merge is reviewed like any other merge (or committed automatically if you choose), and a finish interrupted by a conflict or a restart picks up where it stopped.

**Where to find it:** **Repository → Git-flow**; right-click a feature / bugfix / release / hotfix branch in the left panel → **Finish …**.

### 8. Conflict resolution with visual editor and auto-stash

**In one line:** Resolve conflicts line by line, and never lose local changes when switching branches.

**What it does:**
- **Where it opens:** when a merge, pull, rebase, cherry-pick or revert produces conflicts, the tab switches to conflict mode — a list of conflicted and resolved files, plus a three-pane editor (*ours*, *theirs* and the *result*).
- **Resolving:** take a whole hunk from either side with a checkbox, or single lines with +/−, and the result builds in the order you pick. *Use all ours / theirs* is one click, and *Save & Mark Resolved* marks the file done.
- **Finishing:** **Esc** pauses conflict mode and you can resume it from the changes panel; *Continue* and *Abort* finish or cancel the operation.
- **Auto-stash:** checking out a branch with uncommitted changes stashes them, switches branch and restores them automatically, staged and unstaged as they were. If they conflict with the new branch, nothing is half applied: the working tree stays clean, the changes stay in the stash, and you choose to apply and resolve them, switch back to the previous branch with them, or keep them for later.
- **Stash apply / pop:** all or nothing. If a stash conflicts, resolve it in the same editor; a popped stash leaves the list while you do (your changes are in one place only), and *Abort* puts it back untouched.
- **Checkout updates the branch:** checking out a branch whose remote branch has new commits fast-forwards it right away (as last fetched, no network wait); if both sides have commits, the usual Merge / Rebase choice appears. The graph then scrolls to the branch you switched to.

**Why it's different:**
- Many GUIs hand conflicts to an external merge tool, or only offer "use mine / use theirs" per file.
- Here resolution is built in and works line by line, and it can be paused.
- Safe checkout means switching branches never requires a manual stash, or a separate pull to catch up with the remote.

**Where to find it:** Opens automatically in the repository tab when a conflict happens.

---

## Branches & repositories at scale

### 15. One tree for every ref

**In one line:** Branches, remotes, tags, stashes and a detached HEAD — in one filterable tree.

**What it does:**
- **What's listed:** local branches (the current one highlighted), remote branches by remote, tags with their hash, and stashes; a detached HEAD is shown explicitly with Git's own wording.
- **Filter:** a filter box narrows everything as you type.
- **Actions:** a right-click offers checkout, merge, rebase, fast-forward, pull (even a branch that isn't checked out, via a safe fast-forward), push, rename and delete. Tags can be checked out, pushed or deleted (locally and optionally on the remote).

**Why it's different:**
- Most clients can only pull the branch you are on.
- Here you can update any local branch without switching to it, and a detached HEAD is never a mystery.

**Where to find it:** The left panel of each repository tab.

### 31. Submodules

**In one line:** Every submodule's state at a glance — update, open, add or remove them without a terminal.

**What it does:**
- **At a glance:** repositories with submodules get a **SUBMODULES** section in the sidebar. Each submodule shows its state — up to date (with its commit), *modified*, *moved* (checked out at a different commit than the repository records), *not initialised*, *conflict* — and nested submodules are indented under their parent. The tooltip shows the URL, the tracked branch and both commits.
- **Actions:** initialise or update one submodule or all of them, update to the tip of its tracked branch, sync URLs, set the URL or branch, add a new submodule, remove one cleanly. A submodule with local commits that aren't on any remote is never moved without a warning.
- **Open as a tab:** double-click a submodule to open it in its own tab, right next to its parent and in the same group; the tab reacts to changes immediately, like any other repository.
- **Readable changes:** a changed submodule in the changes panel says what changed (new commits, modified or untracked content). Opening it shows "moved from abc1234 to def5678" and the list of commits in between, with *Open Submodule*, *Update to Recorded Commit* and *Stage Pointer* — the same for a submodule changed in a commit.
- **Kept in step:** cloning initialises submodules (a checkbox in the Clone dialog), and an optional setting updates the submodules a pull or checkout moved. A merge conflict on a submodule offers a simple *Use Ours / Use Theirs* choice.
- **Safe and undoable:** adding, removing and changing a submodule's URL or branch can be undone; signed-in accounts are used for submodules on any host, and a URL with a password in it is refused (it would be committed).

**Why it's different:**
- Many Git GUIs list submodules at most and leave initialising and updating them to the terminal; a moved submodule shows up as a cryptic "Subproject commit" diff.
- Here their state is visible at a glance, every common action is a right-click away, and a pointer change reads as the commits it brings in.

**Where to find it:** The **SUBMODULES** section of the left panel (right-click a submodule or the section header) or **Repository → Submodules**; the changes panel; **Edit → Submodules…** for the settings; **File → Clone…** → *Initialise submodules*.

### 22. Drag & drop to open

**In one line:** Drop repository folders on the window to open them — several at once.

**What it does:** Drag one or more folders from Explorer, Finder or your file manager and drop them anywhere on the window. Each Git repository opens in its own tab and is added to *File → Recent*. A repository that's already open is brought to the front instead of being opened twice. A folder that isn't a Git repository is reported rather than silently ignored.

**Why it's different:**
- Many clients only open repositories through a file dialog or an "add repository" wizard, one at a time.
- Here, getting ten repositories into the app is one drag.

**Where to find it:** Anywhere on the main window; also **File → Open** (**Ctrl+O**). The feature tour shows it as its second step.

### 5. Tab grouping

**In one line:** Organize many repositories into coloured, collapsible groups.

**What it does:** Every repository opens in its own tab, and tabs are restored the next time you start the app: the window opens at once with the repository you were on, and the other tabs open in the background, one at a time. Right-click a tab to create a group or add the tab to one. Groups get their own row above the repository tabs: each group is a coloured chip with its name and number of repositories, and the tab row below lists the repositories group by group, in the group's colour. Click a group to collapse it: its tabs are hidden, but the repositories stay open in the background, ready the moment you bring them back. Or hide only some of them (*Hide Tab*, *Hide Other Tabs*, or untick tabs in the group's menu). The **N hidden** button lists every hidden tab and brings any of them back in one click. Drag a group chip to reorder groups. Group order, hidden tabs and the active tab are all kept across restarts. **Reload Repository** in a tab's right-click menu reopens a repository in place, in the same group and position. Folders can also be dragged onto the window (see [Drag & drop to open](#22-drag--drop-to-open)).

**Why it's different:**
- Many Git GUIs show one repository per window, or a flat bookmark list.
- Grouping keeps projects with many repositories manageable in a single window: front-end + back-end, a set of microservices, or client work.

**Where to find it:** Right-click a repository tab; the group row above the tabs; **View → Hidden Tabs**.

### 29. Split view (Beta)

**In one line:** Up to four repositories side by side in one window, each one live. *Beta: its look and the way panes are managed may still change.*

**What it does:** Right-click a tab and choose **Split Right** or **Split Down**, or drag a tab to the edge of a pane, to see two, three or four repositories at once — each pane with its own tabs, graph, changes and diffs. Every pane keeps checking for changes and, with auto fetch, stays up to date. The pane you click (or reach with **Ctrl+Alt+←/→**) is the current repository: the toolbar, menus, undo / redo and shortcuts act on it, and it is marked with a coloured border. The other panes show their own progress and messages in a slim strip at the top, so a background job never overwrites what you are looking at. Drag tabs between panes, or use **Move to Pane**; **Open Side by Side** on a tab group lays out its repositories in one click. Panels are trimmed automatically to fit the narrower panes, and the whole layout comes back at the next start.

**Why it's different:**
- Most Git GUIs show one repository at a time; comparing two means two windows, or switching tabs back and forth.
- Here related repositories — a library and the app using it, front-end and back-end — sit next to each other, all live, in one window.

**Where to find it:** Right-click a repository tab; **View → Split View**; drag a tab onto another pane; right-click a group chip → **Open Side by Side**.

### 36. Worktrees

**In one line:** Work on two branches at once — each in its own folder and tab, without stashing.

**What it does:**
- **One click from a branch:** right-click any branch (in the sidebar or on the graph) → **Open in New Worktree**. The branch is checked out in a second folder next to the repository and opens in its own tab, right beside the repository's tab and in the same group. A remote branch gets a local branch that tracks it. Your current work stays exactly where it is — review a pull request or fix an urgent bug, then close the tab.
- **New Worktree…** for more control: an existing branch or a new one from any starting point, the folder (a sensible default, or Browse), open it in a tab or not, and initialise its submodules.
- **At a glance:** repositories with worktrees get a **WORKTREES** section in the sidebar — each one with its branch and folder, marked *current*, *main*, *locked* or *missing* (folder deleted by hand). Open it in a tab, its folder or a terminal; lock it (e.g. on a removable drive), prune missing ones, or remove one — with a confirmation, and never silently discarding uncommitted changes.
- **No "already checked out" surprises:** a branch can be checked out in only one worktree, so branches used elsewhere are marked in the sidebar and in the graph's tooltips, and **Checkout** becomes **Switch to Its Worktree**, which jumps to that tab.
- **Everything stays in step:** a commit made in one worktree shows in the others' graphs right away; fetch, pull and push of worktrees of one repository never collide; undo refuses to move a branch another worktree is using; tab titles read "repository · folder".

**Why it's different:**
- Most Git GUIs don't show worktrees at all: working on a second branch means stash, switch, switch back, unstash — or a separate clone.
- Here a second working copy of the same repository is one right-click away, lives in its own tab, and shares branches, stashes and remotes with the first.

**Where to find it:** Right-click a branch → **Open in New Worktree**; the **WORKTREES** section of the left panel (right-click a worktree or the section header); **Repository → Worktrees**.

### 38. Large files (Git LFS)

**In one line:** Repositories with big design files, media or datasets just work — download progress, real sizes, no pointer text.

**What it does:**
- **Recognised automatically:** a repository that stores files with Git LFS is detected from its files, at no cost to the app's speed. If something is wrong, a banner says what and fixes it: Git LFS isn't installed (with a link to install it — Windows already has it with Git), it isn't set up for this repository (**Set Up**), or some large files weren't downloaded and are only placeholders (**Pull LFS Files**). Close the banner to hide it for that repository.
- **Long downloads that don't fail:** checkouts, pulls, clones, merges and stashes that download large files show "Downloading LFS objects 45%" in the toolbar instead of a silent wait, and keep going as long as the download moves — no "timed out" on a slow multi-gigabyte checkout.
- **LFS files at a glance:** in your changes they're marked "LFS" with their size; a new untracked file over 50 MB gets a "large file" note suggesting LFS.
- **Readable changes:** clicking a changed LFS file shows "LFS file changed · 12.4 MB → 12.9 MB" instead of the pointer text, with **Open Before** / **Open After** (the real files, even for old commits); LFS images open straight in the [image diff](#3-smart-diff-views) with their real pixels.
- **Track from the file menu:** right-click a file → **Track with Git LFS…** (`*.psd` suggested) or **Stop Tracking with Git LFS**; the change to `.gitattributes` is staged and can be undone. **Repository → Git LFS** fetches objects for this branch or all branches, pulls missing files, lists the tracked patterns (and which `.gitattributes` each lives in), sets up LFS and prunes the local cache.

**Why it's different:**
- Most Git GUIs show an LFS file's pointer text as its diff and run long LFS checkouts with no progress — or give up on them with a timeout.
- Here LFS files are recognised with their sizes, tracking a file type is a right-click, and LFS images compare visually like any other image.

**Where to find it:** The banner above the graph; the **LFS** marks and right-click menu in the changes panel; **Repository → Git LFS**.

### 6. Bulk branch & repo management

**In one line:** Delete, pull or merge many branches — or act on every open repository — in one go.

**What it does:**
- **Manage Branches:** lists every branch of the current repository (local, remote or both) with its upstream. Tick several branches to delete them (locally, remotely or both), pull them or merge them.
- **Manage Repos:** runs fetch, pull, checkout, create branch, push or delete branch across all open repositories at once.
- **Reporting:** the work continues past individual failures, and a summary report lists what succeeded, what was skipped and why each failure happened.

**Why it's different:**
- Standard GUIs act on one branch and one repository at a time.
- Cleaning up dozens of merged branches, or updating ten repositories, is a single action here, with a clear per-item report instead of a stream of error dialogs.

**Where to find it:** **Edit → Manage Branches…** and **Edit → Manage Repos…**.

---

## Your workspace

### 4. Built-in terminal

**In one line:** A real shell in every repository tab, already in the right folder.

**What it does:** Each repository tab has its own terminal in the bottom panel. It starts in the repository root, using `cmd` on Windows or your login shell elsewhere. Command history is kept across sessions (↑ / ↓), and copy / paste works as you'd expect. Next to it, the **Activity Log** records every operation the app performed, so you can always see what happened and when.

**Why it's different:**
- Most GUIs send you to an external terminal and you have to `cd` to the repository yourself.
- Here the shell is part of the tab, one per repository, and switches with it.

**Where to find it:** The bottom panel of each repository tab (*Terminal* / *Activity Log*).

### 9. Customizable toolbar buttons

**In one line:** Put your own commands, scripts and links one click away.

**What it does:** Add buttons to the main toolbar that run a Git action (pull, push, stash, merge, rebase…), an app action (open the repository in the terminal, file explorer or your editor; copy the branch name, last commit hash or remote URL; open the remote in the browser), a URL or text template, or a **shell command**. Templates can use placeholders such as `{repo_path}`, `{repo_name}`, `{branch}`, `{remote_url}`, `{remote_owner}` and `{remote_repo}`. Each button has a label and an icon; you can reorder or duplicate buttons, and hide the built-in ones. Six ready-made buttons come with the app: **Copy Remote URL**, **Copy Branch Name**, **Open in Folder**, **Open in Terminal**, **Open in VS Code** and **Open on GitHub**, with the right command for macOS, Windows and Linux. Each button can show its icon with a label of your choice, or only the icon (same icon size); long labels wrap on two lines; when you have more buttons than fit, they scroll sideways while the status messages keep their own space.

**Why it's different:**
- Custom actions in other clients are usually buried in menus, or limited to shell scripts.
- Here they are first-class toolbar buttons with repository-aware placeholders, and shell commands run through the same cancellable, logged runner as Git itself. Placeholder values are escaped, so a malicious branch name can't run commands.

**Where to find it:** **Edit → Custom Toolbar Buttons…**.

### 10. Custom themes

**In one line:** Dark, Light, or your own theme from five colours — with a live preview.

**What it does:** Dark (the default) and Light are built in. To create your own theme, pick five colours: primary background, secondary background, accent, primary text and secondary text. The app derives every other shade from them: borders, hover and pressed states, selections, and diff, graph and conflict backgrounds. Changes are previewed live on the whole app, a contrast check warns about unreadable combinations, and any theme can be set as the default.

**Why it's different:**
- Most Git GUIs offer a fixed light / dark switch, or require editing a theme file by hand.
- Here a complete, consistent theme takes five colour picks and a few seconds.

**Where to find it:** **Edit → Themes → Manage Themes…**.

---

### 39. Interface scale

**In one line:** Make the whole app larger or smaller — text, icons and spacing together — to any percentage.

**What it does:** **Edit → Interface Scale…** takes any percentage from 25% to 400% (default 100%), typed or with a slider. **Ctrl+Plus** and **Ctrl+Minus** (Cmd on macOS) move it 5% up or down, **Ctrl+0** resets it to 100%. The whole interface is scaled uniformly, so nothing is left at the old size or cut off. The scale is applied when the app starts: after a change the app offers to restart right away (your open repositories and layout come back) or later. It works on Windows, macOS and Linux and comes on top of the operating system's display scaling (Windows at 150% and 120% in the app = 180%).

**Why it's different:**
- Many Git GUIs only let you change the font size, leaving icons, rows and toolbars at their original size.
- Here everything scales together, which helps on 4K screens, small laptops and when presenting.

**Where to find it:** **Edit → Interface Scale…** · **View → Interface Scale** · Ctrl+Plus / Ctrl+Minus / Ctrl+0.

---

### 23. Open files in external programs

**In one line:** Open any file — or any committed version of it — in the app you choose.

**What it does:** Every file in the changes panel and in a commit's file list has **Open with System Default** and **Open with…**; the diff viewer has **Open Externally**. Double-clicking a PDF, office document or other binary file opens it in its program instead of showing an empty diff; images Qt can display open in the [image diff](#3-smart-diff-views) instead (its header has *Open externally* for the old and new versions; **View → Image Diff** off restores opening them in their program). In **Edit → External Editors** you map extensions to programs (for example `.csv, .xlsx` → Excel, `.png, .jpg` → Preview or Photoshop, `.md` → your editor); anything unmapped opens with the operating system's default. Files from past commits or stashes are extracted to a temporary copy, cleaned up when the app closes.

**Why it's different:**
- Most Git GUIs show "binary file changed" and stop there, or only open the current working copy.
- Here any version of a file — from any commit or stash — opens in the right program with one click, and you decide which program per file type.

**Where to find it:** Right-click a file; double-click a binary file; *Open Externally* in the diff header; **Edit → External Editors…**.

## Integrations

### 28. Pull requests

**In one line:** Create, review, check out and merge pull requests without leaving the app.

**What it does:** The left panel lists the repository's open pull requests (GitHub) or merge requests (GitLab) with their review and checks state, filtered by *All*, *Created by me*, *Review requested* or *Drafts*. **Create Pull Request** (branch menu) pushes the branch if needed and pre-fills the title and description from its commits and the repository's template, with base branch, draft, reviewers and labels; for any other host it opens the website's new-pull-request page with the same text. A pull request opens in the main view: its conversation, commits and changed files — diffs in the app's own diff viewer — with comment, approve, request changes and merge (merge, squash or rebase, optionally deleting the branch). **Check Out** brings any pull request to a local branch, including ones from forks.

**Why it's different:**
- Most desktop Git GUIs stop at "open in browser"; here the whole loop happens next to the graph.
- Diffs come from Git itself, so they look like every other diff in the app; descriptions and comments load no remote images.

**Where to find it:** the **PULL REQUESTS** section of the left panel (right-click for filters and *Create Pull Request…*); right-click a branch → **Create Pull Request…**; **Edit → Integrations…** to turn the API off. Works with the account from **Edit → Accounts & SSH Keys** (public repositories also without one).

### 33. CI / CD status

**In one line:** See whether CI passed — on your branches, on any commit, and right after you push — without opening the browser.

**What it does:**
- **On the selected commit:** the details panel shows "Checks passed / failed / running" with a count (e.g. "1 failed, 3 passed"); expand it to see every check with its state and duration, and open its page or logs in one click.
- **On branches:** branches in the sidebar carry a small pass / fail / running icon, for the remote's branches and for local branches that are up to date with them. Repositories without CI show no icons at all.
- **After a push:** when the checks of the commit you pushed finish, the status bar says "CI passed for main (4 checks)" or "CI failed for main: 1 check failed", and the activity log keeps a record (can be turned off in *Edit → Integrations*).
- **Re-run Failed:** restart the failed GitHub Actions jobs or GitLab pipeline jobs of a commit, when you have push rights.
- **Light on the network:** only branch tips, the selected commit and your push are asked about, and only while checks are still running; the wait between checks grows the longer they take, and it pauses when the API limit is low.

**Why it's different:**
- Most Git GUIs leave CI results to the website: you push, switch to the browser and refresh until the build finishes.
- Here the result is next to the commit and the branch, and the app tells you when your push's checks are done.

**Where to find it:** select a commit → the **Checks** row in the details panel; icons next to branch names in the left panel; **Edit → Integrations…** → *Tell me when the CI checks of my push finish*. GitHub and GitLab repositories, with the account from **Edit → Accounts & SSH Keys** (public repositories also without one; on GitHub the branch icons need a signed-in account).

### 34. Clone & fork from your account

**In one line:** Pick a repository from your GitHub or GitLab account instead of copying a URL — or fork it and clone your fork in one step.

**What it does:**
- **Clone from your account:** *File → Clone…* has a tab for each GitHub or GitLab account you are signed in to, listing your repositories, your organisations' and the ones you starred, with a filter that also searches the whole host from three letters. Private repositories and forks are marked, with their last push.
- **Choose how:** HTTPS or SSH in one click (a pasted URL is converted too), a remembered destination folder with the name filled in for you, and options for a single branch, a shallow clone (latest commit only) and submodules. Problems — such as a folder that already exists — are shown before anything starts.
- **Fork & Clone:** for a repository you don't own, one button forks it into your account, clones your fork and adds the original as *upstream*; the default branch can stay in sync with the original while your pushes go to your fork.
- **Fork a repository you already have open:** *Repository → Fork on GitHub…* (or GitLab) forks it into your account or an organisation, makes the fork your *origin* and the original *upstream*, and can send the current branch's pushes to the fork. Pull requests then go to the original project.
- **Remote shortcuts:** right-click a remote to copy its URL (without any stored password) or the other protocol's URL, open the project on its website, or fork it.

**Why it's different:**
- Typical Git GUIs ask you to paste a URL, and leave forking to the website and the remote setup to the terminal.
- Here picking, forking and wiring up *origin* / *upstream* is one dialog, with the account you already signed in with.

**Where to find it:** **File → Clone…**; **Repository → Fork on GitHub… / GitLab…**; right-click a remote in the left panel. Needs a GitHub or GitLab account in **Edit → Accounts & SSH Keys** (the URL tab works with any host).

### 35. Issues → branches

**In one line:** Your GitHub or GitLab issues next to the graph — start a well-named branch from one in a click, and always see which issue you're working on.

**What it does:**
- **Your issues, in the app:** an **Issues** tab in the bottom panel lists the repository's open issues — *Assigned to me*, *Created by me*, *Mentioned* (GitHub) or *All open* — with a search, labels in their own colours, assignees and last update. Select one to read it; **New Issue** opens one in seconds.
- **Start a branch from an issue:** **Start Branch** suggests a name such as `feature/123-login-times-out` (or `bugfix/…` for issues labelled as bugs; the pattern is configurable) and remembers which issue the branch is for. Renaming or deleting the branch carries the link along, and undo covers it.
- **The issue stays in view:** the commit box shows the current branch's issue ("#123 Login times out") — linked explicitly, or recognised from names like `feature/123-…` — with one-click *Insert "Fixes #123"*, open in the browser, link to another issue or unlink.
- **Issue references everywhere:** `#123` in a commit message becomes a link with the issue's title on hover; commit title templates can use `{issue}` and `{issue_title}`; a new pull request's description gets "Fixes #123" so the issue closes when it merges.
- **Forks too:** for a fork, the issues come from the original project, where they live.

**Why it's different:**
- Typical Git GUIs leave issues to the website: you copy the number, invent a branch name and type the reference by hand.
- Here the issue, the branch name, the commit message and the pull request are connected — and the link lives in the repository itself, so it survives restarts.

**Where to find it:** **Repository → Issues** (the **Issues** tab of the bottom panel); the issue chip at the top of the commit box; `#123` links in a commit's details. GitHub and GitLab repositories, with the account from **Edit → Accounts & SSH Keys** (public repositories show *All open* without one).

---

## Platform, updates & support

### 24. Accounts & SSH keys

**In one line:** Sign in to GitHub once — or add a token or an SSH key — and push just works.

**What it does:** **Sign in to GitHub** opens the browser, you confirm a short code, and the app stores the token in the system keychain (Keychain on macOS, Credential Manager on Windows, the Secret Service — GNOME Keyring or KWallet — on Linux). Tokens for GitLab, Bitbucket or your own server can be added by hand. From then on every HTTPS fetch, pull, push and clone to that host authenticates on its own. For SSH users the app lists your keys with their fingerprints, generates new ones, copies the public key or adds it to GitHub directly, and lets you choose which key each remote uses. Right-click a remote to switch it between HTTPS and SSH in one click, copy its URL in either form, or open it on the website. When a push is refused, the app says why (no credentials, expired token, missing permission, unknown key or host) and offers the fix, then retries.

**Why it's different:**
- Many Git GUIs leave a failed HTTPS push at "authentication failed" and send you to a terminal or a credential helper.
- Here the fix is one click away, the token never touches the command line, logs or `.git/config`, and SSH keys are managed without leaving the app.

**Where to find it:** **Edit → Accounts & SSH Keys…**; right-click a remote in the left panel; the dialog that appears when a push, pull or fetch is refused.

### 37. Commit signing

**In one line:** Get the *Verified* badge on your commits — sign with an SSH or GPG key, set up, tested and added to GitHub from one page.

**What it does:**
- **One page to set it up:** **Edit → Commit Signing…** — choose *SSH key* or *GPG key*, pick one of your keys (or create one on the spot), and sign commits and tags for all your repositories or just this one.
- **Tested before your first commit:** **Test Signing** signs a short text the way Git will and says "Signing works" — or exactly what to fix: the key isn't loaded in your agent, it needs a passphrase window, it has expired, the signing program is missing.
- **Straight to GitHub:** **Add to GitHub as Signing Key** uploads the public key to your signed-in GitHub account; *Copy Public Key* and *Open GitHub Settings* cover everything else. The page warns when your commit email isn't on the GPG key — the usual reason commits show up as *Unverified*.
- **See who signed what:** the commit details show a signature line under the author — a green shield for a good signature, red for a bad one, a warning when it can't be checked — e.g. "Signed by you@example.com · SSH key SHA256:…". A lock next to *Commit* tells you signing is on. *Verify SSH signatures here* sets up Git so your own SSH-signed commits verify on your machine too.
- **Signed tags:** Create Tag gets a *Sign the tag* checkbox.
- **Works everywhere in the app:** signing is your Git configuration, so commits from the commit box, conflict resolution, merges, git-flow, interactive rebase and your terminal are all signed the same way. Scheduled jobs check first that the key can sign without asking for a passphrase — they fail with a clear reason instead of waiting — or can be told not to sign.

**Why it's different:**
- Most Git GUIs either don't sign at all or leave the setup to a terminal and a guide: generate a key, edit the Git config, upload the key, find out at the first commit that the passphrase prompt can't appear.
- Here setup, key creation, upload and a test run are on one page, failures are explained in plain words, and every commit shows whether its signature is good.

**Where to find it:** **Edit → Commit Signing…** (also the **Commit Signing** tab of Edit → Accounts & SSH Keys); the signature line in the commit details; *Sign the tag* in the Create Tag dialog.

### 19. Automatic updates

**In one line:** Get notified of new versions — then download, verify and install in one click.

**What it does:** A few seconds after startup the app checks for a new release in the background. It is silent if you're offline and never delays startup. When a newer version exists, a non-blocking dialog shows what's new. **Download & Install** fetches the installer for your platform, verifies its SHA-256 checksum, starts it and closes the app. You can postpone the update or skip that version, and **Help → Check for Updates** checks on demand.

**Why it's different:**
- Each installer is scanned on VirusTotal at release time.
- The app checks the downloaded file against the published checksum before running it.

**Where to find it:** Automatic at startup; **Help → Check for Updates…**.

### 18. Activity log & full command logs

**In one line:** See everything the app did — and export every Git command's raw output.

**What it does:** The Activity Log in each tab lists every operation with its outcome. Behind the scenes, every Git command the app runs is recorded with its arguments, exit code, duration and complete output. **File → Export Full Logs** saves this record (plus the terminal output of each tab) to one file, ready to attach to a bug report.

**Why it's different:**
- When a Git GUI fails you usually get a one-line error.
- Here the exact commands and their full output are one export away, which makes problems reproducible.

**Where to find it:** The *Activity Log* tab in the bottom panel; **File → Export Full Logs…**.

### 20. Consistent cross-platform look

**In one line:** The same layout and sizes on Windows, macOS and Linux — no overlapping controls.

**What it does:**
- The app uses one rendering style and one pixel-based font size on every platform, with a scalable vector icon set.
- The window title bar follows the theme (a dark title bar on Windows with dark themes).
- Git runs without flashing console windows on Windows.
- Your window size, open tabs, panel layout and group state are restored on the next launch.

**Why it's different:**
- Cross-platform GUIs often look native on one OS and cramped or misaligned on the other.
- Here the interface is designed once and looks identical on both.

**Where to find it:** Everywhere.

### 21. Guided feature tour

**In one line:** A short, skippable tour points at each feature in the real app.

**What it does:** On first launch a tour highlights each feature directly in the interface with a spotlight, an arrow and a short explanation; for features that live in a menu, it shows that menu open with the entry highlighted. You move with Next / Back or the arrow keys. It never blocks the app — you can keep working while it is open, or close it at any step. You can replay it from **Help → Feature Tour**. After an update, a shorter **What's New** tour shows only the features added since the version you used before (once; **Help → What's New** replays it, and *Don't show after updates* turns it off); the full tour stays the same.

**Why it's different:**
- It points at the live interface rather than at screenshots, so it always matches your theme and layout.

**Where to find it:** First launch; **Help → Feature Tour**; after an update, **Help → What's New**.

---

## Comparison summary

"Typical Git GUIs" means the common behaviour of popular free clients (SourceTree, GitHub Desktop, git-gui / gitk). Individual tools vary; the table describes the usual experience, not any single product.

| Capability | Typical Git GUIs | Rasch-Git |
|---|---|---|
| UI during long operations | Often blocked or modal | Always responsive (background workers, per-repo queues) |
| Cancel a running operation | Rare | Cancel button kills the Git process |
| Progress | Spinner or indeterminate bar | Git's real progress percentage |
| Large histories | Slow to load and scroll | Virtualized graph, paged loading |
| Undo | None, or "undo last commit" | Undo / redo for most local operations, with safety checks |
| Rewriting commits | Terminal `git rebase -i`, or not available | Drag & drop editor: reword / squash / fixup / drop / edit, one-step undo |
| Diff layouts | One (sometimes two) | Hunk, Inline and Split, with syntax highlighting, minimap, search — plus side-by-side, swipe, onion-skin and difference views for images |
| Conflicts | External merge tool or per-file choice | Built-in three-pane editor, line and hunk level |
| Merge / cherry-pick | Commit immediately | Staged for review first |
| Branch switching with local changes | Manual stash, or refusal | Automatic stash and restore |
| Many branches / repos | One at a time | Bulk actions with a per-item report |
| Many repositories | Window per repo or bookmark list | Tabs with coloured, collapsible groups |
| Several repositories at once | Several windows | Split view: up to four live panes side by side |
| Working on two branches at once | Stash, switch, switch back | Worktrees: each branch in its own folder and tab, created from the branch menu |
| Git-flow | Needs the git-flow extension; finish runs every step at once | Built in, no extension; finish shows each step and lets you review every merge, resumable |
| Large files (Git LFS) | Pointer text in diffs; long checkouts with no progress | LFS files recognised with their sizes, track from the file menu, download progress, visual compare for images |
| Submodules | Listed, updated through the terminal; pointer changes shown as raw text | State at a glance, update / open as tab / add / remove, readable "moved by N commits" diff |
| Terminal | External | Built in, one per repository tab |
| Toolbar | Fixed | Custom buttons (Git, app, URL, shell) |
| Themes | Light / dark | Built-in plus custom themes from 5 colours |
| Commit messages | Empty box | Templates with `{version}` / `{branch}` / `{issue}` |
| Debugging | Short error text | Activity log plus exportable raw command logs |
| Searching the history | Commit messages only; file contents need the terminal | File names, text in every branch, and when a line of code was added or removed |
| Who changed a line | Separate blame window, if any | Blame in the main view, linked to the graph; file history across renames |
| Pull requests | Open the website | Create, review, check out and merge in the app (GitHub, GitLab); browser fallback for every host |
| Cloning | Paste a URL | Pick from your GitHub / GitLab repositories (yours, organisations, starred, search), HTTPS or SSH, branch / shallow / submodule options; fork and clone in one step with `upstream` set up |
| CI results | Open the website | Check results on branches and commits, notified when your push's checks finish, re-run failed jobs (GitHub, GitLab) |
| Issues | Not shown, or open the website | Your issues in the app, branch from an issue in one click, linked issue shown on the branch, `#123` links in commits (GitHub, GitLab) |
| Signed commits | Configured in a terminal; a failing passphrase prompt shows up at commit time | SSH or GPG signing set up, tested and added to GitHub from one page; each commit shows who signed it |
| Failed HTTPS / SSH authentication | "Authentication failed", fix it outside the app | Explains why, offers sign-in / token / SSH key / HTTPS↔SSH switch, then retries |

---

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| Ctrl+O | Open a repository |
| Ctrl+Z / Ctrl+Shift+Z (Ctrl+Y) | Undo / redo the last operation |
| Ctrl+F | Search commits (graph) or the diff (diff viewer) |
| Ctrl+Shift+F | Deep Search: a file, or text in every branch or in the history |
| Ctrl+B / Ctrl+H | Blame / File History of the file in the diff viewer |
| ↑ / ↓ | Previous / next commit in the graph |
| Ctrl+Alt+→ / Ctrl+Alt+← | Split view: focus the next / previous pane |
| Ctrl+Plus / Ctrl+Minus / Ctrl+0 | Interface larger / smaller / back to 100% (after a restart) |
| Enter / Shift+Enter | Next / previous search match |
| F5 | Refresh the current repository |
| Esc | Back to the graph / working changes; pause conflict mode |
| Ctrl+Q | Quit |

---

## Notes for the website

**Naming.** The product is **Rasch-Git**; the installed app is called **Raschild Git Manager**. Downloads are a Windows installer (`.exe`), a macOS disk image (`.dmg`) and, for 64-bit Linux (Ubuntu 22.04 / Debian 12 / Fedora 36 / RHEL 10 and newer, X11 and Wayland), an AppImage plus `.deb` and `.rpm` packages. The AppImage updates itself; for a `.deb` / `.rpm` the app downloads the new package and gives the install command. The app is free for personal, educational and non-commercial use; commercial use and redistribution require written authorization (see `LICENSE`).

**Suggested hero line:** *"The Git client that never freezes — with undo for almost everything."*

**Suggested page sections**, in order:

1. Speed (async GUI, graph, fetch / progress / cancel)
2. Safety (undo / redo, review-before-commit, git-flow, safe checkout, conflicts)
3. Scale (tab groups, split view, worktrees, bulk actions, branch tree, submodules, large files)
4. Your workspace (terminal, toolbar buttons, themes, templates)
5. Trust (VirusTotal-scanned installers, verified updates, full logs, signed commits)

**Screenshots worth taking:**

- the graph with a stash and a WIP node;
- the Split diff with syntax highlighting;
- the image diff in *Swipe* (a UI screenshot with the slider halfway) and in *Difference* with the changed-pixel count;
- the three-pane conflict editor;
- Manage Branches with its summary report;
- the Theme Manager showing a live preview;
- the toolbar with custom buttons and the Undo tooltip.
- the SUBMODULES section next to a submodule card ("moved from … to …" with its commits).
- the Git-flow finish dialog (the plan as a checklist) and the start dialog with a suggested version.
- the commit details with the expanded checks list, next to the left panel's branch icons.
- the Clone dialog on an account tab (the repository list with the Mine / Organisations / Starred chips), with Fork & Clone visible.
- the Issues tab with label chips and an issue open, next to the commit box showing the branch's issue chip.
- the WORKTREES section with two tabs of the same repository ("repo · folder") side by side.
- the Commit Signing page (SSH key selected, "Signing works.") next to a commit's details with the green signature line.
- the changes panel with "LFS" marks next to the LFS card ("LFS file changed · 12.4 MB → 12.9 MB"), or an LFS image in the image diff.
- Deep Search in *Text in branches* (results grouped by file, matches highlighted, branch column) and in *Text in history* (added / removed column).

**Accuracy notes — please don't claim:**

- **Git-flow:** support branches have no finish (as in the command-line tool); aborting a finish stops it but doesn't undo the steps already done (Undo does); no fetch before a finish (it warns when `develop` / the production branch are behind); the version bump knows `pom.xml` and `package.json` only.
- **CI / CD status:** GitHub and GitLab only; no status icons on the commit graph itself (they're in the sidebar and the commit details) and no badge on every commit; commits that exist only locally have no status; *Re-run Failed* on GitHub covers GitHub Actions only; the push notification is in the app's status bar, not a system notification.
- **Submodules:** undo restores the repository's record of a submodule, not the submodule's own files (*Update* checks it out again); the SSH key chosen for a remote isn't used for submodule URLs; no "run a command in every submodule" (use the terminal).
- **Clone & fork:** GitHub and GitLab accounts only (Bitbucket and other hosts: paste the URL); Fork & Clone always forks into your own account (forking into an organisation is in *Repository → Fork…*); very large accounts list their first 1000 repositories (500 starred), the rest is reachable through the search; there is no "fetch the full history" button for a shallow clone yet, and a shallow clone limits blame, file history and older history in the graph.
- **Issues:** GitHub and GitLab only — no external issue trackers, no Bitbucket issues (links open the website); issues can't be edited, commented on or closed in the app ("Fixes #123" closes them when the change merges); *New Issue* takes labels as text and can assign only you; GitLab has no *Mentioned* filter; a branch from an issue starts from the default branch.
- **Pull requests on Bitbucket:** only *Create Pull Request* in the browser; in-app pull requests are GitHub and GitLab. No inline (per-line) review comments yet.
- **Undo for everything:** stage / unstage and pushes are not undone. Remote changes are never reverted, and the undo history lasts for the current session only.
- **Search the whole history:** commit search covers the commits loaded so far (the graph loads more as you scroll).
- **Deep Search text:** searches committed content only — not uncommitted changes, untracked files, stashes or tags; binary files are skipped; results stop at 2000 matching lines ("refine the search"); *Text in history* looks at a set number of commits (5000 by default, adjustable, 0 = all) and, in its default mode, doesn't report code that was only moved.
- **Comparisons with GitKraken:** don't name it on the page.
- **"Sign in with GitLab / Bitbucket":** only GitHub has a browser sign-in; the others use access tokens. GitHub sign-in needs the app's OAuth App to be registered.
- **Split view:** at most four panes, and a repository is shown in one pane at a time (not two views of the same repository). Panes in the background notice edits in deep subfolders within a few seconds, not instantly.
- **Worktrees:** creating or removing a worktree's folder can't be undone (only a new branch created with it can); undo in one worktree won't move a branch another worktree has checked out; a worktree-only (bare) repository has no tab for its main entry; nothing is painted on the graph (the tooltips say where a branch is checked out); needs a recent Git (2.36 or newer).
- **Commit signing:** no signature badges in the graph (only in the selected commit's details); a key with a passphrase needs a passphrase window (graphical pinentry) or an agent that already has it; X.509 signing is shown but not set up from the app; SSH signatures verify locally only for keys in Git's allowed signers file (the app adds your own); *Add to GitHub* is GitHub-only and needs signing in again once; GitHub shows *Verified* only when the commit email is also verified on the GitHub account.
- **Image diff:** PNG, JPEG, GIF, BMP, WebP, ICO, SVG and (where the system supports it) TIFF — not PSD, HEIC or camera RAW files, which still open in their program; animated GIF / WebP show their first frame; images can't be staged in parts (whole file only); the page doesn't update by itself when the image changes again on disk (click it again); very large images (over 40 megapixels or 50 MB) ask first and may show a scaled preview; the difference view needs both versions to have the same size.
- **Git LFS:** needs Git LFS installed (included with Git for Windows; on macOS and Linux install it separately); no file locking yet; LFS marks follow the patterns of the repository's top-level `.gitattributes` only, and a commit's file list says "LFS" without the size; upload progress for pushes and sign-in to private hosted LFS repositories with the app's accounts haven't been verified yet — don't claim them.
- **Interactive rebase:** only on the checked-out branch and on ranges without merge commits; it can't move commits onto another branch, add `exec` lines or split a commit inside the editor (use *edit* instead).
- **Linux:** 64-bit x86 only (no ARM build yet), glibc 2.35 or newer (Ubuntu 22.04 era); no Flatpak, Snap or distribution repository — AppImage, `.deb` and `.rpm` downloads. On Wayland the window position isn't restored and the app can't bring its window to the front by itself (the desktop highlights it instead). Remembered sign-ins need a running Secret Service (GNOME Keyring or KWallet) and `secret-tool`.
- **Specific numbers** (for example "a million commits"): they haven't been benchmarked; say "huge histories" / "very long histories".
