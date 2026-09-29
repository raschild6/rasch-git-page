# Rasch-Git — Features Overview

> **Rasch-Git** (Raschild Git Manager) is a desktop Git client for Windows and macOS (it also runs on Linux from source). It pairs a fast, visual commit graph with the everyday tools developers use most — staging, diffs, branches, stashes, a terminal — and adds a set of capabilities that typical Git GUIs don't have: a user interface that never freezes, undo for almost any operation, bulk actions across branches and repositories, and conflict resolution line by line.

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
3. [Reading history & changes](#reading-history--changes) — commit search, smart diff views, commit details
4. [Committing](#committing) — staging, commit templates, review-before-commit
5. [Safety net](#safety-net) — undo / redo, safe checkout, visual conflict resolution
6. [Branches & repositories at scale](#branches--repositories-at-scale) — tab groups, bulk actions, the branch tree
7. [Your workspace](#your-workspace) — built-in terminal, custom toolbar buttons, custom themes
8. [Platform, updates & support](#platform-updates--support)
9. [Comparison summary](#comparison-summary)
10. [Keyboard shortcuts](#keyboard-shortcuts)
11. [Notes for the website](#notes-for-the-website)

---

## At a glance

| # | Feature | In one line |
|---|---|---|
| 1 | Fully async GUI | Every Git operation runs in the background — the window never freezes. |
| 2 | Virtualized commit graph | Smooth scrolling through huge histories, with stashes and uncommitted work in the graph. |
| 3 | Smart diff views | Hunk, Inline or Split — one click to switch, with syntax highlighting and search. |
| 4 | Built-in terminal | A real shell in every repository tab, already in the right folder. |
| 5 | Tab groups | Organize many repositories into coloured, collapsible groups. |
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
| 16 | Hunk-level staging | Stage or unstage individual hunks right from the diff. |
| 17 | Commit details | Author avatar, copyable SHA, full message and changed files at a glance. |
| 18 | Activity log & full command logs | See everything the app did; export every Git command's raw output. |
| 19 | Automatic updates | Get notified of new versions, then download, verify and install in one click. |
| 20 | Consistent cross-platform look | Same layout and sizes on Windows and macOS, no overlapping controls. |
| 21 | Guided feature tour | A skippable tour points at each feature in the real app. |

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

**What it does:** The graph draws branches as coloured lanes and merges as curves, and labels each branch tip as local, remote, or both. Only the rows near the visible area are materialized, and history loads in pages as you scroll, so repositories with very long histories open fast and scroll smoothly. Uncommitted changes appear as a "WIP" node, and each stash appears as its own node attached to the commit it was taken from. The columns (branch, graph, message, author, date) fit the window, and you can resize them.

**Why it's different:**
- Typical Git GUIs build every row of the history up front, which gets slow on large repositories.
- Stashes and work in progress usually live in a separate list; here they are part of the history view.
- The graph can optionally show tags (a per-repository setting) and marks a detached HEAD explicitly.

**Where to find it:** The center of each repository tab.

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

### 3. Smart diff views

**In one line:** Hunk, Inline or Split — one click to switch, with syntax highlighting and search.

**What it does:**
- **Three views:** *Hunk* shows only the changed blocks, *Inline* shows the whole file with changes in place, and *Split* shows old and new side by side with aligned rows.
- **Readability:** syntax highlighting for 16 languages (Python, JavaScript, TypeScript, Java, C/C++, Go, Rust, Ruby, PHP, SQL, HTML, CSS, JSON, YAML, XML, shell), a minimap of changes, and Ctrl+F search inside the diff.
- **Clean copy:** copied code has no `+` / `-` prefixes, so it can be pasted straight into an editor.

**Why it's different:**
- Most Git GUIs offer one diff layout, or at most two.
- Hunk-level staging works straight from the diff (see [Hunk-level staging](#16-hunk-level-staging)).

**Where to find it:** Click a changed file in the right panel, or a file of a commit; the view switcher is in the diff header.

### 17. Commit details

**In one line:** Author, SHA, full message and changed files at a glance.

**What it does:** Selecting a commit shows its details in the right panel:
- the author's avatar (initials), date and short SHA with a copy button;
- the title and full body, scrollable when long;
- the list of changed files, as a flat list or as a folder tree.

Clicking a file opens its diff for that commit. A right-click on a commit offers cherry-pick, revert, reset (soft / mixed / hard), create a branch or tag here, and copy the SHA; a right-click on a branch label offers checkout, merge, fast-forward, rebase, push, pull, rename and delete.

**Why it's different:**
- Everything about a commit is in one side panel next to the graph, instead of spread across several windows.
- The folder-tree view makes large commits easy to scan.

**Where to find it:** Click a commit in the graph.

---

## Committing

### 16. Hunk-level staging

**In one line:** Stage or unstage individual hunks right from the diff.

**What it does:**
- **Files:** stage, unstage or discard a single file with the buttons that appear when you hover it, or everything at once with *Stage All* / *Unstage All*.
- **Hunks:** in the diff, stage a single hunk of an unstaged file, or unstage a single hunk of a staged one.
- **Fallbacks:** when Git's standard patch application can't handle a hunk (for example, new files or unusual line endings), the app falls back to its own blob-level staging so the action still works.
- **Views:** changed files can be shown as a flat list or as a folder tree.

**Why it's different:**
- Partial staging is often missing or fragile in simpler GUIs; here it is built to work on edge cases.
- Every discard can be undone (see [Undo / Redo](#13-undo--redo)).

**Where to find it:** The right panel (*Unstaged* / *Staged* files) and the diff viewer.

### 12. Customizable commit templates

**In one line:** Pre-filled commit titles with your project's version and branch.

**What it does:** You keep a list of predefined commit titles with placeholders: `{version}` is the project's next version and `{branch}` is the current branch. The version is detected from `pom.xml`, from the commit message, or from version-named branches. The first template pre-fills the commit title automatically; the sparkle button next to the title offers the others. The title field shows a character counter that warns before you pass 72 characters. You can amend the previous commit, or commit and push in one click.

**Why it's different:**
- Most clients start every commit from an empty box, or support only one static template.
- Templates here are a list with live placeholders, which suits teams with commit conventions such as `[FIX]`, `[NEW]` or version bumps.
- The same version detection suggests branch names like `dev-release/1.4.0` when you create a branch.

**Where to find it:** The *Commit* box in the right panel; edit the list in **Edit → Commit Messages…**.

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

### 8. Conflict resolution with visual editor and auto-stash

**In one line:** Resolve conflicts line by line, and never lose local changes when switching branches.

**What it does:**
- **Where it opens:** when a merge, pull, rebase, cherry-pick or revert produces conflicts, the tab switches to conflict mode — a list of conflicted and resolved files, plus a three-pane editor (*ours*, *theirs* and the *result*).
- **Resolving:** take a whole hunk from either side with a checkbox, or single lines with +/−, and the result builds in the order you pick. *Use all ours / theirs* is one click, and *Save & Mark Resolved* marks the file done.
- **Finishing:** **Esc** pauses conflict mode and you can resume it from the changes panel; *Continue* and *Abort* finish or cancel the operation.
- **Auto-stash:** checking out a branch with uncommitted changes stashes them, switches branch and restores them automatically.

**Why it's different:**
- Many GUIs hand conflicts to an external merge tool, or only offer "use mine / use theirs" per file.
- Here resolution is built in and works line by line, and it can be paused.
- Safe checkout means switching branches never requires a manual stash.

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

### 5. Tab grouping

**In one line:** Organize many repositories into coloured, collapsible groups.

**What it does:** Every repository opens in its own tab, and tabs are restored the next time you start the app. Right-click a tab to create a group or add the tab to one. Grouped tabs get the group's colour, and a header tab in front of them shows the group name and count. Clicking the header collapses or expands the whole group, and collapsed groups stay collapsed across restarts. Drag a folder onto the window to open it as a new tab.

**Why it's different:**
- Many Git GUIs show one repository per window, or a flat bookmark list.
- Grouping keeps projects with many repositories manageable in a single window: front-end + back-end, a set of microservices, or client work.

**Where to find it:** Right-click a repository tab.

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

**What it does:** Add buttons to the main toolbar that run a Git action (pull, push, stash, merge, rebase…), an app action (open the repository in the terminal, file explorer or your editor; copy the branch name, last commit hash or remote URL; open the remote in the browser), a URL or text template, or a **shell command**. Templates can use placeholders such as `{repo_path}`, `{repo_name}` and `{branch}`. Each button has a label and an icon; you can reorder or duplicate buttons, and hide the built-in ones.

**Why it's different:**
- Custom actions in other clients are usually buried in menus, or limited to shell scripts.
- Here they are first-class toolbar buttons with repository-aware placeholders, and shell commands run through the same cancellable, logged runner as Git itself.

**Where to find it:** **Edit → Custom Toolbar Buttons…**.

### 10. Custom themes

**In one line:** Dark, Light, or your own theme from five colours — with a live preview.

**What it does:** Dark (the default) and Light are built in. To create your own theme, pick five colours: primary background, secondary background, accent, primary text and secondary text. The app derives every other shade from them: borders, hover and pressed states, selections, and diff, graph and conflict backgrounds. Changes are previewed live on the whole app, a contrast check warns about unreadable combinations, and any theme can be set as the default.

**Why it's different:**
- Most Git GUIs offer a fixed light / dark switch, or require editing a theme file by hand.
- Here a complete, consistent theme takes five colour picks and a few seconds.

**Where to find it:** **Edit → Themes → Manage Themes…**.

---

## Platform, updates & support

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

**In one line:** The same layout and sizes on Windows and macOS — no overlapping controls.

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

**What it does:** On first launch a tour highlights each feature directly in the interface with a spotlight, an arrow and a short explanation. You move with Next / Back or the arrow keys. It never blocks the app — you can keep working while it is open, or close it at any step. You can replay it from **Help → Feature Tour**.

**Why it's different:**
- It points at the live interface rather than at screenshots, so it always matches your theme and layout.

**Where to find it:** First launch; **Help → Feature Tour**.

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
| Diff layouts | One (sometimes two) | Hunk, Inline and Split, with syntax highlighting, minimap, search |
| Conflicts | External merge tool or per-file choice | Built-in three-pane editor, line and hunk level |
| Merge / cherry-pick | Commit immediately | Staged for review first |
| Branch switching with local changes | Manual stash, or refusal | Automatic stash and restore |
| Many branches / repos | One at a time | Bulk actions with a per-item report |
| Many repositories | Window per repo or bookmark list | Tabs with coloured, collapsible groups |
| Terminal | External | Built in, one per repository tab |
| Toolbar | Fixed | Custom buttons (Git, app, URL, shell) |
| Themes | Light / dark | Built-in plus custom themes from 5 colours |
| Commit messages | Empty box | Templates with `{version}` / `{branch}` |
| Debugging | Short error text | Activity log plus exportable raw command logs |

---

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| Ctrl+O | Open a repository |
| Ctrl+Z / Ctrl+Shift+Z (Ctrl+Y) | Undo / redo the last operation |
| Ctrl+F | Search commits (graph) or the diff (diff viewer) |
| Enter / Shift+Enter | Next / previous search match |
| F5 | Refresh the current repository |
| Esc | Back to the graph / working changes; pause conflict mode |
| Ctrl+Q | Quit |

---

## Notes for the website

**Naming.** The product is **Rasch-Git**; the installed app is called **Raschild Git Manager**. Downloads are a Windows installer (`.exe`) and a macOS disk image (`.dmg`). Running on Linux requires running from source. The project is licensed under Apache 2.0.

**Suggested hero line:** *"The Git client that never freezes — with undo for almost everything."*

**Suggested page sections**, in order:

1. Speed (async GUI, graph, fetch / progress / cancel)
2. Safety (undo / redo, review-before-commit, safe checkout, conflicts)
3. Scale (tab groups, bulk actions, branch tree)
4. Your workspace (terminal, toolbar buttons, themes, templates)
5. Trust (VirusTotal-scanned installers, verified updates, full logs)

**Screenshots worth taking:**

- the graph with a stash and a WIP node;
- the Split diff with syntax highlighting;
- the three-pane conflict editor;
- Manage Branches with its summary report;
- the Theme Manager showing a live preview;
- the toolbar with custom buttons and the Undo tooltip.

**Accuracy notes — please don't claim:**

- **Blame, file history, git-flow, submodules, pull-request creation:** helper code exists, but these aren't available in the interface yet.
- **Undo for everything:** stage / unstage and pushes are not undone. Remote changes are never reverted, and the undo history lasts for the current session only.
- **Search the whole history:** commit search covers the commits loaded so far (the graph loads more as you scroll).
- **Comparisons with GitKraken:** don't name it on the page.
- **Specific numbers** (for example "a million commits"): they haven't been benchmarked; say "huge histories" / "very long histories".
