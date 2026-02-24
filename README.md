<div align="center">

[![SVG Animation](https://readme-svg-typing-generator.vercel.app/api?lines=README%20SVG&animation=rainbow&color=36BCF7&background=00000000&size=45&font=monospace&duration=5000&pause=1000&width=435&height=50&letterSpacing=normal&center=true&vCenter=false&multiline=false&repeat=true&random=false)](https://github.com/OstinUA)

[![SVG Animation](https://readme-svg-typing-generator.vercel.app/api?lines=Typing%20Generator&animation=rainbow&color=36BCF7&background=00000000&size=45&font=monospace&duration=5000&pause=1000&width=435&height=50&letterSpacing=normal&center=true&vCenter=false&multiline=false&repeat=true&random=false)](https://github.com/OstinUA)


**Animated SVG banners for GitHub READMEs, repositories, and websites.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-▶%20Try%20it%20now-6c74ff?style=for-the-badge)](https://readme-svg-typing-generator.vercel.app/)
[![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/OstinUA/readme-SVG-typing-generator)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge)](LICENSE)

</div>

---

## What is this?

**README SVG Typing Generator** is a free, open-source tool for creating beautiful animated SVG images you can embed directly into your GitHub README or any webpage.

The output is a pure SVG file with **no JavaScript on the render side**, ensuring full compatibility with GitHub, GitLab, and other platforms where JS inside images is blocked.

---

## ✨ Features

- **16 built-in animations** — from classic typing to matrix rain
- **Live preview** in the browser as you configure
- **No sign-up required** — just open and use
- **Fully customizable** — color, font, size, duration, letter spacing, and more
- **One-click copy** — Markdown, HTML, or raw URL
- **Shareable permalinks** — share your exact settings via URL
- **Multiline mode** — display all lines simultaneously
- **Pure SVG output** — works everywhere JS is restricted

---

## 🚀 Quick Start

### Option 1 — Online (recommended)

1. Open **[readme-svg-typing-generator.vercel.app](https://readme-svg-typing-generator.vercel.app/)**
2. Type your text, pick an animation, and tweak the settings
3. Copy the generated Markdown and paste it into your `README.md`

```markdown
[![Typing SVG](https://readme-svg-typing-generator.vercel.app/api?lines=Hello+World!;Second+line&animation=typing)](https://github.com/OstinUA)
```

### Option 2 — Direct URL

Just craft a URL manually and drop it anywhere as an `<img>` tag or Markdown image:

```
https://readme-svg-typing-generator.vercel.app/api?lines=Hello!;I%20build+cool+things&animation=rainbow&color=36BCF7
```

### Option 3 — Self-host on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OstinUA/readme-SVG-typing-generator)

---

## 🎬 Animations

| Animation | What it does |
|---|---|
| `typing` | Character-by-character typing with a blinking cursor |
| `fade` | Each line smoothly fades in and out |
| `slide` | Lines slide vertically in sequence |
| `bounce` | Text bounces with dynamic movement |
| `pulse` | Rhythmic scale pulse — a breathing effect |
| `blink` | Hard on/off blinking |
| `shake` | Quick horizontal shake |
| `rainbow` | Full-spectrum color cycle |
| `glitch` | Chromatic split glitch distortion |
| `stroke` | Draws the text outline then fills it in |
| `wave` | Characters rise in a rolling wave |
| `flip` | 3D flip transition on the X axis |
| `neon` | Neon glow with flickering light |
| `matrix` | Digital rain inspired by The Matrix |
| `zoom` | Zoom in and out transition |
| `blur` | Comes into focus then blurs away |

---

## ⚙️ Parameters

| Parameter | Default | Description |
|---|---|---|
| `lines` | `Hello+World!` | Text lines separated by `;`; spaces as `+` |
| `animation` | `typing` | Animation type from the table above |
| `color` | `36BCF7` | Text color — hex without `#` |
| `background` | `00000000` | Background color — 8-char hex with alpha; `00000000` = transparent |
| `size` | `20` | Font size in pixels |
| `font` | `monospace` | `monospace` · `code` · `sans` · `serif` |
| `duration` | `5000` | Display duration per line in ms |
| `pause` | `1000` | Pause between lines in ms |
| `width` | `435` | SVG width in pixels |
| `height` | `50` | SVG height in pixels |
| `center` | `false` | Center text horizontally |
| `vCenter` | `false` | Center text vertically |
| `multiline` | `false` | Show all lines at the same time |
| `repeat` | `true` | Loop the animation |
| `random` | `false` | Randomize line order |
| `letterSpacing` | `normal` | CSS `letter-spacing` value |
| `separator` | `;` | Custom separator for `lines` |

### URL Examples

```bash
# Rainbow text, centered, white
/api?lines=Hello!;World!&animation=rainbow&center=true&color=ffffff&size=24

# All lines visible at once with enough height
/api?lines=Line+1;Line+2;Line+3&multiline=true&height=120&animation=fade

# Neon effect, transparent background, custom font
/api?lines=NEON+TEXT&animation=neon&color=ff00ff&font=code&size=32&background=00000000

# Play once, no loop
/api?lines=Once+upon+a+time...&animation=typing&repeat=false
```

---

## 🛠️ Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Vercel CLI](https://vercel.com/docs/cli)

### Setup

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/readme-SVG-typing-generator.git
cd readme-SVG-typing-generator

# 2. Install Vercel CLI globally (if you haven't already)
npm install -g vercel

# 3. Start the local dev server
vercel dev
```

| Address | What's there |
|---|---|
| `http://localhost:3000` | Demo site |
| `http://localhost:3000/api` | API endpoint |

> **Note:** You don't need to log in to Vercel to run `vercel dev` locally. If prompted, skip linking to a project.

---

## 🗂️ Project Structure

```
readme-SVG-typing-generator/
│
├── index.html              # Demo site — vanilla HTML/CSS/JS, no build step
├── vercel.json             # Routing and build configuration
│
└── api/
    ├── index.js            # Entry point — parses query params, calls animation engine
    └── animations/
        ├── index.js        # Animation registry
        ├── _utils.js       # Shared helpers (lineY, sequenceOpacity, clamp01)
        ├── typing.js       # One file per animation
        ├── fade.js
        └── ...
```

**Key design decisions:**
- Zero npm dependencies in `api/` — everything is plain Node.js
- No build step or bundler — edit and refresh
- Each animation is an isolated module that receives a normalized `options` object and returns an SVG string fragment

---

## 🤝 Contributing

Contributions of all kinds are welcome! Full details are in [CONTRIBUTING.md](CONTRIBUTING.md).

**Quick guide:**

1. Fork the repository
2. Create a branch: `feat/animation-name` · `fix/short-description` · `docs/short-description`
3. Make your changes and test them thoroughly
4. Open a Pull Request with a description and a test URL

**Good first contributions:**
- Add a new animation (the highest-impact contribution)
- Fix a bug — check [Issues](https://github.com/OstinUA/readme-SVG-typing-generator/issues)
- Improve the demo site UI
- Fix typos or improve the documentation

---

## ❤️ Support the Project

If you find this tool useful, consider leaving a ⭐ on GitHub or supporting the author directly:

[![Patreon](https://img.shields.io/badge/Patreon-OstinFCT-f96854?style=flat-square&logo=patreon)](https://www.patreon.com/OstinFCT)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-fctostin-29abe0?style=flat-square&logo=ko-fi)](https://ko-fi.com/fctostin)
[![Boosty](https://img.shields.io/badge/Boosty-Support-f15f2c?style=flat-square)](https://boosty.to/ostinfct)
[![YouTube](https://img.shields.io/badge/YouTube-FCT--Ostin-red?style=flat-square&logo=youtube)](https://www.youtube.com/@FCT-Ostin)
[![Telegram](https://img.shields.io/badge/Telegram-FCTostin-2ca5e0?style=flat-square&logo=telegram)](https://t.me/FCTostin)

---

## 📄 License

Distributed under the **GPL-3.0** license. See [LICENSE](LICENSE) for details.
