# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`dragonwolfsp` is the source for [dragonwolfsp.com](https://dragonwolfsp.com), a personal site built with the [Zola](https://www.getzola.org/) static site generator. The Anemone theme is pulled in as a git submodule at `themes/anemone`.

## Common commands

- `zola serve` — local dev server with live reload (default `http://127.0.0.1:1111`).
- `zola build` — produce the static site in `public/` (this directory is gitignored).
- `zola check` — validate internal links and content.
- After a fresh clone: `git submodule update --init --recursive` (the Anemone theme lives in a submodule; without it templates that fall through to the theme will 404).

There is no lint or test suite. CI is `.github/workflows/main.yml`, which runs `shalzz/zola-deploy-action` on pushes to `master` and publishes the build output to the `deploy` branch, which GitHub Pages serves.

## Architecture

### Content is markdown with TOML frontmatter
Zola convention: every markdown file uses `+++`-delimited TOML frontmatter, and each section directory needs an `_index.md`. Section-level settings that matter here:

- `template = "..."` picks the template for the section listing itself; `page_template = "..."` picks the template applied to each child page.
- `content/journal/_index.md` sets `page_template = "journal_page.html"` (which extends `blog/page.html` from the theme).
- `content/music/_index.md` sets `template = "music_list.html"` and `page_template = "music_page.html"`.
- Individual music pages declare an `[extra] audio_url = "..."` used by `templates/music_page.html` for the inline player.
- The `genres` taxonomy is declared in `config.toml` (paginated by 10) and applied to music tracks via `[taxonomies] genres = [...]`.

### Templates override the Anemone theme selectively
`templates/` overrides only the files listed in it (`base.html`, `header.html`, `footer.html`, `head.html`, `index.html`, `journal_page.html`, `music_page.html`, `music_list.html`, `css.html`, `404.html`, `genres/`, `shortcodes/`). Anything not overridden is inherited from `themes/anemone/templates/`, so when adding a new page type, check whether the theme already provides a template before writing one from scratch, and when editing, be aware `base.html` here is a lean shell (header/main/footer includes) rather than the theme's version.

`head.html` is where third-party dependencies are wired in: it pulls suCSS (`speyll.github.io/suCSS`) as external stylesheets, loads `js/script.js` and `js/pronounce.js` from `static/`, and inlines the Matomo tracker pointing at `matomo.dragonwolfsp.com`. `index.html` inlines a large weather/moon-phase script that mutates DOM ids (`weatherKeyWord`, `location`, `moonFraze`, `temperatureFraze`) that `content/_index.md` provides — these two files are coupled and should be edited together.

### Custom shortcodes in `templates/shortcodes/`
- `pronounce(name, file)` — renders a button with `data-audio` handled by `static/js/pronounce.js`; audio files live under `static/names/`.
- `audio(src, title?)` — infers MIME type from file extension and renders an HTML5 `<audio>` player.
- `project(name, url?, summary, body)` — collapsible project card used on `content/software/_index.md`; note the `body` param is markdown that gets piped through `| markdown | safe`.
- `increment(key, class?)` — third-party visit counter embed from `incr.easrng.net`. Recent commit history shows this has been toggled on/off when the external service is down; if you touch it, check whether the service is currently reachable before assuming a broken render is a bug in our code.
- `sitebutton` — 88×31 button link markup.

### Static assets
- `static/` is copied verbatim to the site root.
- `static/js/` holds `weather.js` (used by `index.html`), `pronounce.js` (used by the shortcode), `script.js`, `sounds.js`.
- `static/names/` holds pronunciation `.mp3` files referenced by `pronounce` shortcode calls in `content/about.md`.
- `sass/` exists and `compile_sass = true` in `config.toml`, but the directory is currently empty; most styling comes from external suCSS + `static/css/`.

### Navigation
Header links come from `config.extra.header_nav` in `config.toml`, not from filesystem discovery. Adding a new top-level section requires both creating `content/<name>/_index.md` and adding an entry to `header_nav`.

### Uncommitted local files
`descriptions_of_my_soles.txt` and `names_of_my_soles.txt` at the repo root are untracked working notes, not site content — leave them alone unless the user asks.
