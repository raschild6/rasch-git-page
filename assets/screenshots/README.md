# Screenshots

1600×1000 PNGs of the real app, default **Dark** theme, window filling the screen. They were captured on a virtual display against demo repositories (a fictional "orbit" order/payment service: ~200 commits by 5 authors, feature branches and merges, tags, a remote, stashes and work in progress). Numbers refer to the sections of [`docs/analysis/features_overview.md`](../analysis/features_overview.md).

| File | Shows | Feature |
|---|---|---|
| `main-overview.png` | Graph with WIP and stash nodes, branch tree, working changes, terminal | overview |
| `graph-commit-menu.png` | Right-click on a commit dot: cherry-pick, revert, reset, create branch / tag | 2 |
| `graph-branch-menu.png` | Right-click on a branch label | 2, 15 |
| `commit-search.png` | `Ctrl+F` commit search in the graph | 11 |
| `deep-search.png` | Edit → Deep Search: a file across the whole history | 25 |
| `diff-split.png`, `diff-inline.png` | Split and Inline diff of a TypeScript commit | 3 |
| `diff-hunk-staging.png` | Hunk view with *Discard Hunk* / *Stage Hunk* | 3, 16 |
| `commit-details.png` | Commit details: avatar, SHA, message, changed files | 17 |
| `working-changes-tree.png` | Unstaged / staged files as folder trees | 16 |
| `discard-armed.png` | Two-step discard: the first click turned a file's discard arrow into a red bin | 16 |
| `bulk-selection-menu.png` | Files selected in both the unstaged and staged lists, right-click: Stash / Stage / Unstage / Discard / Diff Selected | 16 |
| `commit-templates.png`, `commit-messages-settings.png` | Commit title templates and their settings | 12 |
| `review-before-commit.png` | A merge staged for review, message prefilled, *Abort Merge* | 14 |
| `undo-redo.png` | Edit menu with *Undo Stash changes* | 13 |
| `conflict-editor.png` | Three-pane conflict editor (ours / theirs / result) | 8 |
| `branch-tree-remote-menu.png` | Remote menu: switch HTTPS ↔ SSH, choose SSH key | 15, 24 |
| `tab-groups.png` | Group row above the repository tabs: one group partially hidden (2/3), one collapsed (0/2), "3 hidden" | 5 |
| `group-menu.png` | Right-click on a group: collapse / expand, tick the tabs to show | 5 |
| `hidden-tabs-menu.png` | "N hidden": hidden tabs by group, one click brings a tab back | 5 |
| `tab-context-menu.png` | Repository tab menu: *Reload Repository*, *Hide Tab*, group entries | 5 |
| `manage-branches.png`, `manage-repos.png`, `bulk-summary-report.png` | Bulk actions and their summary report | 6 |
| `terminal.png` | Built-in terminal in the repository folder | 4 |
| `custom-toolbar-buttons.png` | Custom toolbar buttons editor | 9 |
| `theme-manager.png` | Theme Manager with custom themes | 10 |
| `external-editors.png`, `file-open-externally-menu.png` | Extension → program mappings; *Open with…* on a file | 23 |
| `accounts.png`, `ssh-keys.png`, `github-sign-in.png`, `auth-recovery.png` | Accounts & SSH keys, GitHub sign-in, recovery from a refused push | 24 |
| `fetch-progress-cancel.png`, `auto-fetch-settings.png` | Real progress with cancel; auto-fetch settings | 7 |
| `update-available.png` | Update dialog with changelog | 19 |
| `activity-log.png` | Activity log of the session | 18 |
| `scheduled-actions.png` | Edit → Scheduled Actions… (experimental): warning banner, rules, editor with the Branches choice | 26 |
| `scheduler-problems.png` | Scheduler Problems: a coalesced auth failure (×3) and a conflict with the stash kept | 26 |
| `feature-tour-scheduler.png` | Tour step for the scheduler, with the Edit menu shown open | 21, 26 |
| `feature-tour.png`, `feature-tour-deep-search.png` | First-launch feature tour; a menu step shows the menu open with its entry ringed | 21 |
| `blame.png`, `file-history.png` | Blame with age bars and the selected commit's details; File History of a file with the diff of one change | 27 |
| `interactive-rebase.png` | Interactive Rebase: pick, reword, edit, squash and fixup in one plan, combined message, change preview | 30 |
| `rebase-edit-stop.png` | Rebase stopped at an *edit* commit: banner with *Amend Commit* / *Continue* / *Abort* | 30 |
| `submodules.png` | SUBMODULES section and a moved submodule pointer: its new commits, *Stage Pointer* | 31 |
| `gitflow-start.png`, `gitflow-finish.png` | Git-flow: start a release from develop; the finish plan (merge, tag, back-merge, delete) | 32 |
| `pr-list.png` | PULL REQUESTS section: review requested, approved, changes requested, draft | 28 |
| `pr-create.png` | Create Pull Request: base, title, description, reviewers, labels, commits | 28 |
| `pr-view.png` | Pull request page: description, comments and reviews, *Check Out* / *Merge* | 28 |
| `ci-status.png` | Commit details with CI checks (failed, running, passed, *Re-run Failed*) and CI marks on the branches | 33 |
| `clone-from-account.png` | Clone dialog, account tab: organisation repositories, clone options, *Fork & Clone* | 34 |
| `issues-tab.png` | Issues tab in the bottom panel and the branch's issue chip in the commit box | 35 |
| `deep-search-text.png`, `deep-search-history.png` | Deep Search: text in every branch; text in history (any changed line that matches) | 25 |
| `worktrees.png` | WORKTREES section with two tabs of the same repository | 36 |
| `commit-signing.png`, `commit-verified.png` | Edit → Commit Signing with an SSH key after a successful test; signature line in the commit details | 37 |
| `image-diff-swipe.png` | Image diff in Swipe mode | 3 |
| `lfs.png` | LFS card (size before → after, *Open Before* / *Open After*) and LFS / large-file badges in the changes panel | 38 |
| `split-view-2.png`, `split-view-4.png` | Split view: two repositories side by side; four in a 2×2 grid | 29 |
| `about-license.png` | Help → About with the license notice | — |

Dialogs are shown over the dimmed app with a drop shadow, as the operating system presents them; the capture ran without a window manager, so window title bars aren't drawn. Names, e-mail addresses, the sign-in code, the release in the update dialog and the pull requests, CI checks, issues and account repositories are demo data.
