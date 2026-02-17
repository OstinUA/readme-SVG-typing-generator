# Contributing to README SVG Typing Generator

Thank you for taking the time to contribute! This document covers everything you need to get started — from setting up a local environment to submitting a pull request.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Adding a New Animation](#adding-a-new-animation)
  - [Improving the Demo Site](#improving-the-demo-site)
  - [Documentation](#documentation)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Style](#code-style)
- [Animation API Contract](#animation-api-contract)

---

## Code of Conduct

Be respectful, constructive, and inclusive. Harassment or dismissive behavior of any kind will not be tolerated. If you see a problem, open an issue or reach out directly.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Vercel CLI](https://vercel.com/docs/cli) — used to run the local dev server

### Setup

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/readme-SVG-typing-generator.git
cd readme-SVG-typing-generator

# 2. Install Vercel CLI globally (if you haven't already)
npm install -g vercel

# 3. Start the local development server
vercel dev
```

The demo site will be available at `http://localhost:3000`
The API endpoint will be available at `http://localhost:3000/api`

> **Note:** You do not need to log in to Vercel to run `vercel dev` locally. If prompted, you can skip linking to a project.

---

## Project Structure

```
readme-SVG-typing-generator/
│
├── index.html              # Frontend demo site (vanilla HTML/CSS/JS)
├── vercel.json             # Routing and build configuration
│
└── api/
    ├── index.js            # Entry point — parses query params, calls animations.js
    └── animations.js       # Core animation engine — all 16 animation types live here
```

### Key files explained

**`api/index.js`**
Receives the HTTP request, validates and sanitizes all query parameters with safe defaults and min/max limits, then calls `getAnimation()` from `animations.js` and wraps the result in a complete SVG document. This file should remain lean — logic belongs in `animations.js`.

**`api/animations.js`**
Exports a single function `getAnimation(type, options)` that returns an SVG fragment (everything inside the `<svg>` tag). Each animation is a `case` in a `switch` statement. The function receives a normalized `options` object — see [Animation API Contract](#animation-api-contract) for the full shape.

**`index.html`**
A self-contained single-file frontend. No build step, no bundler, no frameworks. Vanilla HTML, CSS, and JavaScript only. The page uses `fetch` against the local (or production) `/api` endpoint to render the live preview.

---

## Development Workflow

```bash
# Start the dev server
vercel dev

# Make your changes to api/animations.js or index.html

# Test by visiting:
# http://localhost:3000                        → demo site
# http://localhost:3000/api?lines=Test&animation=YOUR_ANIM  → raw SVG

# When you're happy, commit and open a PR
```

There is no build step or compilation needed. The serverless functions are plain Node.js CommonJS modules.

---

## How to Contribute

### Reporting Bugs

Before opening an issue, please:

1. Check that the bug isn't already reported in [Issues](https://github.com/OstinUA/readme-SVG-typing-generator/issues)
2. Test against the live demo at [readme-svg-typing-generator.vercel.app](https://readme-svg-typing-generator.vercel.app/) to confirm it's not a local setup issue

When filing a bug, include:

- A **minimal URL** that reproduces the problem, e.g. `/api?lines=Test&animation=glitch`
- What you **expected** to see
- What you **actually** saw (screenshot or description)
- Browser and OS (for demo site UI bugs)

---

### Suggesting Features

Open an issue with the label `enhancement` and describe:

- What you want the feature to do
- Why it would be useful to other users
- A rough idea of how it might work (optional, but helpful)

Good candidates for new features include new animation types, new font options, new query parameters, or improvements to the demo site UI.

---

### Adding a New Animation

This is the most impactful type of contribution. Here's the full process:

#### Step 1 — Plan your animation

Think about:
- What should the text do visually?
- Does it work well with multiple lines (`multiline=true`)?
- Does it respect `center`, `vCenter`, `repeat`, and `letterSpacing`?
- Does it look good at different font sizes and SVG dimensions?

Stick to pure SVG animations (`<animate>`, `<animateTransform>`, CSS `@keyframes` inside `<style>`). No JavaScript inside the SVG.

#### Step 2 — Add the animation to `api/animations.js`

Open `api/animations.js` and add a new `case` to the `switch` statement:

```js
case 'myanimation': {
    const durS = intDuration / 1000;

    const items = lines.map((line, i) => {
        const lineH = intSize * 1.6;
        const y = multiline
            ? (vCenter
                ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH
                : 30 + i * lineH)
            : yBase;

        return `<text
            x="${textX}"
            y="${y}"
            text-anchor="${textAnchor}"
            style="${commonStyle}">
            <!-- your SVG animation here -->
            ${line}
        </text>`;
    }).join('');

    return `${bgRect}${items}`;
}
```

Key variables already available in scope:

| Variable | Value |
|----------|-------|
| `lines` | `string[]` — array of text lines |
| `textColor` | `string` — `#RRGGBB` |
| `textX` | `string` — `"50%"` or `"20"` depending on `center` |
| `textAnchor` | `string` — `"middle"` or `"start"` |
| `yBase` | `number` — default Y position for single-line animations |
| `intSize` | `number` — font size in px |
| `intWidth` / `intHeight` | `number` — SVG dimensions |
| `intDuration` / `intPause` | `number` — timing in ms |
| `fontFamily` | `string` — resolved font stack |
| `commonStyle` | `string` — inline style string with font, size, fill |
| `bgRect` | `string` — optional background `<rect>` element |
| `repeat` | `boolean` |
| `multiline` | `boolean` |
| `vCenter` | `boolean` |

#### Step 3 — Register the animation in `api/index.js`

Add your animation name to the `validAnimations` array:

```js
const validAnimations = [
    'typing', 'fade', 'slide', 'bounce', 'pulse', 'blink',
    'shake', 'rainbow', 'glitch', 'stroke', 'wave', 'flip',
    'neon', 'matrix', 'zoom', 'blur',
    'myanimation',  // ← add here
];
```

#### Step 4 — Add it to the demo site in `index.html`

Find the `ANIMATIONS` array in the `<script>` section and add an entry:

```js
const ANIMATIONS = [
    // ... existing entries ...
    { id: 'myanimation', icon: '🎯', label: 'My Animation' },
];
```

Pick an emoji that represents the visual feel of your animation.

#### Step 5 — Test it thoroughly

Test your animation against these scenarios before submitting:

```
# Single line
/api?lines=Hello+World!&animation=myanimation

# Multiple lines cycling
/api?lines=Line+one;Line+two;Line+three&animation=myanimation

# Multiline mode
/api?lines=Line+one;Line+two;Line+three&animation=myanimation&multiline=true&height=120

# Centered
/api?lines=Hello&animation=myanimation&center=true&vCenter=true

# Large font
/api?lines=Big+Text&animation=myanimation&size=48&height=80

# Small SVG
/api?lines=Small&animation=myanimation&width=200&height=40&size=14

# No repeat
/api?lines=Once&animation=myanimation&repeat=false
```

---

### Improving the Demo Site

`index.html` is a self-contained file with no build step. Just edit it and refresh `http://localhost:3000`.

Guidelines for demo site changes:

- Keep it a single file with no external dependencies (exception: Google Fonts via `<link>`)
- Do not introduce a bundler, framework, or npm dependencies
- Maintain the existing dark color scheme and design language
- Any new controls should update the preview and regenerate the URL in real time

---

### Documentation

Improvements to `README.md` or `CONTRIBUTING.md` are always welcome. This includes:

- Fixing typos or unclear wording
- Adding new usage examples
- Improving parameter descriptions
- Adding documentation for new features

---

## Pull Request Guidelines

1. **One PR per feature or fix.** Don't bundle unrelated changes together.

2. **Branch naming:**
   - New animation: `feat/animation-name`
   - Bug fix: `fix/short-description`
   - Documentation: `docs/short-description`
   - UI improvement: `ui/short-description`

3. **PR description should include:**
   - What the change does
   - Why it's needed
   - For new animations: a test URL demonstrating the result

4. **Keep diffs clean.** Avoid reformatting unrelated code, changing indentation, or removing whitespace in lines you didn't touch.

5. **PRs should pass the manual test checklist** (see [Step 5](#step-5--test-it-thoroughly) above for animations).

---

## Code Style

There is no linter configured, but please follow the existing conventions:

- **Indentation:** 4 spaces (no tabs)
- **Quotes:** single quotes in JavaScript
- **Semicolons:** yes
- **Variable declarations:** `const` by default, `let` only when reassignment is needed
- **Comments:** use them sparingly for non-obvious logic; don't comment obvious things
- **SVG strings:** template literals with consistent 4-space indentation inside the string
- **No external npm packages** — the `api/` folder has zero dependencies by design

---

## Animation API Contract

`getAnimation(type, options)` in `animations.js` receives the following normalized object:

```js
{
    lines:         string[],   // array of decoded text lines (never empty)
    color:         string,     // hex without #, e.g. "36BCF7"
    size:          number,     // font size in px (integer, 8–120)
    duration:      number,     // ms per line (integer, 200–30000)
    pause:         number,     // ms pause between lines (integer, 0–10000)
    width:         number,     // SVG width in px (integer, 50–1200)
    height:        number,     // SVG height in px (integer, 20–400)
    font:          string,     // "monospace" | "code" | "sans" | "serif"
    background:    string,     // hex (8 chars with alpha), e.g. "00000000"
    center:        boolean,    // horizontal centering
    vCenter:       boolean,    // vertical centering
    multiline:     boolean,    // show all lines simultaneously
    letterSpacing: string,     // CSS letter-spacing value
    repeat:        boolean,    // loop animation
    random:        boolean,    // randomize line order
}
```

The function must return a `string` containing valid SVG markup (no `<svg>` wrapper — just the inner content). The wrapper is added by `index.js`.

---

Thanks again for contributing — every improvement, no matter how small, makes this project better for everyone. 🙌