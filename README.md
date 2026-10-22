# Pest2Veg

A responsive, accessible pest information website with a crop and symptom guide for growers.

**Pest2Veg is a UK-focused web application designed to help farmers, vegetable growers and allotment holders** identify common crop pests and narrow down **possible matches** by choosing a crop and the symptoms they see. It is not AI image recognition and not a diagnosis, so users should always verify with an authoritative source.

**Module:** CPU4106-20C Group Project | **SDG:** 2 Zero Hunger

## Features

- Pest gallery with search and filters
- Identify a Pest guide: crop, then symptoms, then possible matches with reasons
- Pest detail pages with sourced information
- Works on mobile and desktop, with keyboard navigation and alt text

## Built with

HTML, CSS and JavaScript. Pest and crop data lives in `data.js`. No build step or server needed.

## Run it

```bash
git clone https://github.com/emvillab/pest2veg.git
```

Open `index.html` in a browser, or use the VS Code Live Server extension.

## Project structure

```
pest2veg/
├── index.html, gallery.html, identify.html, pest.html, about.html   Website pages
├── style.css, app.js, data.js                                       Styles, logic and pest/crop data
├── assets/                                                          Logos, crop images and pest photos
└── docs/
    ├── data/                  Master data workbook (source for data.js)
    ├── research/              Team research notes (one file per crop or topic)
    │   └── source-docs/       Original Word documents
    ├── data-review-report.md
    ├── identification-flow.md How the Identify a Pest guide works
    └── image-credits.md       Sources and permissions for every image
```

The website pages, `style.css`, `app.js` and `data.js` stay in the top folder because the pages link to each other by relative paths.

## Team

| Role | Member |
|---|---|
| Front-end Development & Integration | Kamran Mirza |
| JavaScript & Identification Logic | Shafaqat Ali |
| Scrum Master, Wireframes & GitHub Coordination | Marvis Elvis Aigbe |
| Pest Research & Content | Olugbodi Akinwole Ogunsheye Wray |
| Research & Wireframe Support | Ikechukwu Thompson Agwu |

## Contributing

- Never push directly to `main`. Use a short branch (`feature/…`, `fix/…`, `docs/…`) and open a pull request.
- Each pull request needs one review from another team member.

## Credits

Pest images and information are credited in `docs/image-credits.md`.

_Student project for CPU4106-20C. Work is the team's own._
