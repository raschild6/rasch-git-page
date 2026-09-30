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
| `about-license.png` | Help → About with the license notice | — |

Dialogs are shown over the dimmed app with a drop shadow, as the operating system presents them; the capture ran without a window manager, so window title bars aren't drawn. Names, e-mail addresses, the sign-in code and the release in the update dialog are demo data.
