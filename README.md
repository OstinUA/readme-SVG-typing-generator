<div align="center">

[![SVG Animation](https://readme-svg-typing-generator.vercel.app/api?lines=README%20SVG%20Typing%20Generator&animation=rainbow&color=36BCF7&background=00000000&size=26&font=monospace&duration=5000&pause=1000&width=435&height=50&letterSpacing=normal&center=true&vCenter=false&multiline=false&repeat=true&random=false)](https://github.com/OstinUA)

# README SVG Typing Generator

Create animated SVG banners for GitHub README files, repositories, and websites.

[Live Demo](https://readme-svg-typing-generator.vercel.app/) · [Issues](https://github.com/OstinUA/readme-SVG-typing-generator/issues) · [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/OstinUA/readme-SVG-typing-generator)

</div>

## Features

- 20 built-in text animations.
- New animation picker flow: **Animation is now a button** that opens a selection window.
- Animations are shown as text-only cards (no emoji), each with a short description.
- Picker layout supports up to **5 animations per row** on wide screens.
- Live preview, permalink generation, and one-click copy for Markdown/HTML/URL.
- Pure SVG output (no JS on render side), works in GitHub README images.

## Quick Start

1. Open the demo: <https://readme-svg-typing-generator.vercel.app/>.
2. Enter your text lines.
3. Click the **Animation** button and choose animation in the popup window.
4. Copy generated Markdown and paste it into your `README.md`.

```markdown
[![Typing SVG](https://readme-svg-typing-generator.vercel.app/api?lines=Hello+World!;Second+line&animation=typing)](https://github.com/OstinUA)
```

## Animation List

| animation | What it does |
|---|---|
| `typing` | Character-by-character typing with cursor. |
| `fade` | Smooth fade in/out per line. |
| `slide` | Vertical line transitions. |
| `bounce` | Bouncing movement effect. |
| `pulse` | Rhythmic scale pulse. |
| `blink` | Hard blink on/off. |
| `shake` | Horizontal shake effect. |
| `rainbow` | Full-spectrum color cycle. |
| `glitch` | Chromatic split glitch distortion. |
| `stroke` | Draws outline then fills text. |
| `wave` | Character wave motion. |
| `flip` | 3D flip transition. |
| `neon` | Neon glow with flicker. |
| `matrix` | Matrix-like digital rain style. |
| `zoom` | Zoom in/out transition. |
| `blur` | Blur in/out transition. |
| `float` | Gentle vertical floating drift. |
| `swing` | Pendulum-like text rotation. |
| `pop` | Quick pop-in overshoot scale. |
| `skew` | Stylized skew burst and settle. |

## Parameters

| Parameter | Default | Description |
|---|---|---|
| `lines` | `Hello+World!` | Lines separated by `;`. |
| `animation` | `typing` | Animation id from list above. |
| `color` | `36BCF7` | Text color (hex without `#`). |
| `background` | `00000000` | Background hex color (`00000000` = transparent). |
| `size` | `20` | Font size (px). |
| `font` | `monospace` | `monospace` · `code` · `sans` · `serif` |
| `duration` | `5000` | Duration per line in ms. |
| `pause` | `1000` | Pause between lines in ms. |
| `width` | `435` | SVG width in px. |
| `height` | `50` | SVG height in px. |
| `center` | `false` | Horizontal centering. |
| `vCenter` | `false` | Vertical centering. |
| `multiline` | `false` | Show all lines simultaneously. |
| `repeat` | `true` | Loop animation. |
| `random` | `false` | Randomize line order. |
| `letterSpacing` | `normal` | CSS `letter-spacing` value. |
| `separator` | `;` | Custom separator for `lines`. |

## Local Development

```bash
git clone https://github.com/OstinUA/readme-SVG-typing-generator.git
cd readme-SVG-typing-generator
vercel dev
```

Then open:
- Demo UI: <http://localhost:3000>
- API: <http://localhost:3000/api>

## License

GPL-3.0. See [LICENSE](LICENSE).
