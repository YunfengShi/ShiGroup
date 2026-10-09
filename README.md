# Shi Group website

Static site for the Shi Research Group (Materials Science & Engineering, RPI). Plain HTML/CSS/JS, so there is no build step.

## Publish on GitHub Pages
1. Put these files at the top level of the repository (so `index.html` sits next to this README).
2. Go to **Settings → Pages**, set **Source** to "Deploy from a branch", choose `main` and `/ (root)`, then click Save.
3. After a minute or two, the site is live at `https://<username>.github.io/<repo>/`.

## Editing content (no HTML needed)
| What | File |
|---|---|
| Publications | `data/publications.js`. Copy a block to add a paper. `featured: true` shows it on the home page. |
| People, PI bio, email, office | `data/people.js` (put headshots in `assets/people/` and set `photo`) |
| News | `data/news.js` (newest first) |
| Research themes & figures | `data/themes.js` (put figures in `assets/img/` and set `img`) |
| Menu, footer | top of `assets/site.js` |

The research images in `assets/img/theme-*.svg` are generated placeholders. Replace them with real figures from your papers.
