<div align="center">

[![SVG Animation](https://readme-svg-typing-generator.vercel.app/api?lines=README%20SVG%20Typing%20Generator&animation=rainbow&color=36BCF7&background=00000000&size=26&font=monospace&duration=5000&pause=1000&width=435&height=50&letterSpacing=normal&center=true&vCenter=false&multiline=false&repeat=true&random=false)](https://github.com/OstinUA)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-readme--svg--typing--generator.vercel.app-6c74ff?style=for-the-badge)](https://readme-svg-typing-generator.vercel.app/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/OstinUA/readme-SVG-typing-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-00e5a0?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-Serverless-339933?style=for-the-badge&logo=nodedotjs)](https://vercel.com/docs/functions)


<br/>

**Dynamically generated, fully customizable animated SVGs for GitHub profile READMEs, repositories, and websites.**

16 animation types · Multiline support · Zero dependencies · Pure SVG — no JavaScript needed

[**→ Try the live demo**](https://readme-svg-typing-generator.vercel.app/) · [Report a bug](https://github.com/OstinUA/readme-SVG-typing-generator/issues) · [Request a feature](https://github.com/OstinUA/readme-SVG-typing-generator/issues)

</div>

---

## 📖 Table of Contents

- [Quick Setup](#-quick-setup)
- [Demo Site](#-demo-site)
- [Animation Types](#-animation-types)
- [Parameters](#-parameters)
- [Usage Examples](#-usage-examples)
- [Project Structure](#-project-structure)
- [Self-Hosting](#-self-hosting)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## ⚡ Quick Setup

**Step 1.** Open the **[demo site](https://readme-svg-typing-generator.vercel.app/)**, customize your animation, and copy the generated code.

**Step 2.** Paste it into your `README.md`:

```markdown
[![Typing SVG](https://readme-svg-typing-generator.vercel.app/api?lines=Hello+World!;Your+second+line)](https://github.com/OstinUA)
```

**Step 3.** Adjust the `lines=` parameter with your own text. Separate lines with `;` and use `+` for spaces.

That's it — the SVG will render live in your README on GitHub.

---

## 🖥️ Demo Site

Visit **[readme-svg-typing-generator.vercel.app](https://readme-svg-typing-generator.vercel.app/)** for a full interactive editor with live preview.

**Features of the demo:**

- Enter multiple lines of text (one per line)
- Choose from 16 animation types via a visual picker
- Adjust font, size, colors, duration, pause, and letter spacing
- Toggle centering, multiline mode, repeat, and random order
- Live SVG preview that updates as you type
- One-click copy for **Markdown**, **HTML**, or raw **URL**
- **Permalink** — share your exact configuration via URL

---

## 🎭 Animation Types

| | Name | `animation=` | Description |
|--|------|-------------|-------------|
| ⌨️ | Typing | `typing` | Character-by-character typing with a blinking cursor. Cycles through all lines. |
| 🌅 | Fade | `fade` | Each line fades in, holds, then fades out. |
| ⬆️ | Slide | `slide` | Lines slide up from below and exit upward. |
| ⚡ | Bounce | `bounce` | Text bounces up and down continuously. |
| 💗 | Pulse | `pulse` | Rhythmic scale pulse — text breathes in and out. |
| 💡 | Blink | `blink` | Hard on/off discrete blink. |
| 🌊 | Shake | `shake` | Rapid horizontal shake effect. |
| 🌈 | Rainbow | `rainbow` | Cycles through full-spectrum hue rotation. |
| 📺 | Glitch | `glitch` | RGB color-split glitch with chromatic aberration. |
| ✍️ | Stroke | `stroke` | Draws text on screen stroke by stroke, then fills. |
| 〰️ | Wave | `wave` | Each character rises and falls in a wave pattern. |
| 🔄 | Flip | `flip` | Lines rotate in on the X axis and rotate out. |
| 💜 | Neon | `neon` | Neon glow with irregular flicker. |
| 🟩 | Matrix | `matrix` | Characters fall like digital rain. |
| 🔭 | Zoom | `zoom` | Text zooms in from nothing and zooms out to infinity. |
| 🌫️ | Blur | `blur` | Text blurs in from nothing and blurs back out. |

---

## ⚙️ Parameters

All parameters are passed as URL query strings.

| Parameter | Default | Type | Description |
|-----------|---------|------|-------------|
| `lines` | `Hello+World!` | `string` | Lines of text separated by `;`. Use `+` or `%20` for spaces. |
| `animation` | `typing` | `string` | Animation type. See table above. |
| `color` | `36BCF7` | `string` | Text color as a hex code **without** `#`. |
| `background` | `00000000` | `string` | Background color as hex. Use `00000000` for transparent. |
| `size` | `20` | `integer` | Font size in pixels. Range: `8`–`120`. |
| `font` | `monospace` | `string` | Font family: `monospace` · `code` · `sans` · `serif` |
| `duration` | `5000` | `integer` | Time to display each line in milliseconds. |
| `pause` | `1000` | `integer` | Pause between lines in milliseconds. |
| `width` | `435` | `integer` | SVG width in pixels. |
| `height` | `50` | `integer` | SVG height in pixels. |
| `center` | `false` | `boolean` | `true` to center text horizontally. |
| `vCenter` | `false` | `boolean` | `true` to center text vertically within the SVG. |
| `multiline` | `false` | `boolean` | `true` to show all lines simultaneously instead of cycling. |
| `repeat` | `true` | `boolean` | `false` to play the animation only once. |
| `random` | `false` | `boolean` | `true` to randomize line order. |
| `letterSpacing` | `normal` | `string` | Any valid CSS `letter-spacing` value, e.g. `0.1em`. |
| `separator` | `;` | `string` | Custom separator for the `lines` parameter. |

### Font options

| Value | Renders as |
|-------|-----------|
| `monospace` | Courier New, Courier |
| `code` | Fira Code, JetBrains Mono |
| `sans` | Segoe UI, Ubuntu |
| `serif` | Georgia, Times New Roman |

---

## 🚀 Usage Examples

### Minimal — single line
```markdown
![SVG](https://readme-svg-typing-generator.vercel.app/api?lines=Hello+World!)
```

### Cycling lines with typing effect
```markdown
[![SVG](https://readme-svg-typing-generator.vercel.app/api?lines=Full-stack+developer;Open+source+enthusiast;Coffee-powered+coder&animation=typing&color=36BCF7&width=500&height=55&size=22&duration=4000&pause=1000)](https://github.com/OstinUA)
```

### Centered glitch effect
```markdown
![SVG](https://readme-svg-typing-generator.vercel.app/api?lines=OstinUA&animation=glitch&color=ff4d6d&center=true&vCenter=true&width=400&height=70&size=40)
```

### Multiline reveal with fade
```markdown
![SVG](https://readme-svg-typing-generator.vercel.app/api?lines=Full-stack+developer;Open+source+enthusiast;Coffee+addict&animation=fade&multiline=true&height=130&width=520&size=22&vCenter=true)
```

### Neon glow, code font
```markdown
![SVG](https://readme-svg-typing-generator.vercel.app/api?lines=Hello+World!&animation=neon&color=00e5a0&font=code&size=30&center=true&vCenter=true&width=500&height=70)
```

### Rainbow wave
```markdown
![SVG](https://readme-svg-typing-generator.vercel.app/api?lines=I+love+open+source&animation=rainbow&size=28&center=true&width=480&height=60)
```

### Matrix rain
```markdown
![SVG](https://readme-svg-typing-generator.vercel.app/api?lines=ACCESS+GRANTED&animation=matrix&color=00ff41&width=500&height=80)
```

### Dark background with stroke draw-on
```markdown
![SVG](https://readme-svg-typing-generator.vercel.app/api?lines=Drawing+in+progress...&animation=stroke&color=ffd166&background=161b22&width=500&height=60&size=24&center=true)
```

---

## 📁 Project Structure

```
readme-SVG-typing-generator/
│
├── index.html              # Interactive demo site
├── vercel.json             # Vercel routing & build config
│
└── api/
    ├── index.js            # Serverless request handler
    └── animations.js       # SVG animation engine (16 types)
```

### How it works

1. A request hits `/api` with query parameters
2. `index.js` parses, validates, and sanitizes all parameters
3. `animations.js` generates the inner SVG markup for the chosen animation
4. The server responds with a complete `image/svg+xml` document
5. GitHub, your browser, or any `<img>` tag renders the animated SVG

Because GitHub caches images, responses include `Cache-Control: no-cache` headers to ensure animations always stay fresh.

---

## 🛠️ Self-Hosting

If you prefer to host your own instance for better uptime, custom branding, or extended modifications, here are your options.

### Option 1 — One-click deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OstinUA/readme-SVG-typing-generator)

1. Click the button above and sign in to Vercel
2. Click **Deploy** — no configuration needed
3. Your instance will be live at `https://your-project-name.vercel.app`

### Option 2 — Vercel CLI

```bash
# Clone the repository
git clone https://github.com/OstinUA/readme-SVG-typing-generator.git
cd readme-SVG-typing-generator

# Install Vercel CLI globally
npm install -g vercel

# Deploy to production
vercel --prod
```

### Local development

```bash
# Run a local dev server with hot reload
vercel dev
```

The API will be available at `http://localhost:3000/api` and the demo site at `http://localhost:3000`.

---

## 🔧 API Reference

The SVG endpoint accepts `GET` requests and responds with `image/svg+xml`.

**Base URL:**
```
https://readme-svg-typing-generator.vercel.app/api
```

**Minimal request:**
```
GET /api?lines=Hello+World!
```

**Full request example:**
```
GET /api
  ?lines=Hello+World!;Line+two;Line+three
  &animation=typing
  &color=36BCF7
  &background=00000000
  &size=22
  &font=monospace
  &duration=5000
  &pause=1000
  &width=500
  &height=55
  &center=false
  &vCenter=true
  &multiline=false
  &repeat=true
  &random=false
  &letterSpacing=normal
```

**Response headers:**
```
Content-Type:  image/svg+xml
Cache-Control: no-cache, no-store, must-revalidate
Pragma:        no-cache
Expires:       0
```

**Parameter limits (enforced server-side):**

| Parameter | Min | Max |
|-----------|-----|-----|
| `size` | 8 | 120 |
| `duration` | 200 | 30000 |
| `pause` | 0 | 10000 |
| `width` | 50 | 1200 |
| `height` | 20 | 400 |

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

**Quick start:**
```bash
git clone https://github.com/OstinUA/readme-SVG-typing-generator.git
cd readme-SVG-typing-generator
vercel dev
```

Open `http://localhost:3000` to see the demo site with live reloading.

---

## 📄 License

[GPL-3.0-1](https://github.com/OstinUA/readme-SVG-typing-generator?tab=GPL-3.0-1-ov-file) © [OstinUA](https://github.com/OstinUA)

---

<div align="center">
  <sub>Made with ❤️ by <a href="https://github.com/OstinUA">OstinUA</a></sub>
</div>
