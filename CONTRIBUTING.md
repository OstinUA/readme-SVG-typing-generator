# Contributing to README SVG Typing Generator

Thank you for considering a contribution! This document walks you through everything — from setting up a local environment to submitting a pull request.

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

By participating in this project you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

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

| Address | What's there |
|---|---|
| `http://localhost:3000` | Demo site |
| `http://localhost:3000/api` | API endpoint |

> **Note:** You do not need to log in to Vercel to run `vercel dev` locally. If prompted, you can skip linking to a project.

---

## Project Structure

```
readme-SVG-typing-generator/
│
├── index.html              # Frontend demo site (vanilla HTML/CSS/JS, no build step)
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

### Key files explained

**`api/index.js`**
Receives the HTTP request, validates and sanitizes all query parameters with safe defaults and min/max limits, then calls `getAnimation()` and wraps the result in a complete SVG document. Keep this file lean — logic belongs in the animation modules.

**`api/animations/index.js`**
The animation registry. Exports a map of `animationName → module`. Each module receives a normalized `options` object and returns an SVG string fragment.

**`api/animations/_utils.js`**
Shared helpers used across animation modules: `clamp01`, `getLineY`, `buildSequenceOpacity`.

**`index.html`**
A self-contained single-file frontend. No build step, no bundler, no frameworks. Vanilla HTML, CSS, and JavaScript only.

---

## Development Workflow

```bash
# Start the dev server
vercel dev

# Make your changes

# Test against the raw API:
# http://localhost:3000/api?lines=Test&animation=YOUR_ANIM

# When happy, commit and open a PR
```

There is no compilation or build step. The serverless functions are plain Node.js CommonJS modules.

---

## How to Contribute

### Reporting Bugs

Before opening an issue, please:

1. Check that the bug isn't already reported in [Issues](https://github.com/OstinUA/readme-SVG-typing-generator/issues).
2. Test against the [live demo](https://readme-svg-typing-generator.vercel.app/) to confirm it's not a local setup issue.

When filing a bug, include:

- A **minimal URL** that reproduces the problem (e.g. `/api?lines=Test&animation=glitch`)
- What you **expected** to see
- What you **actually** saw — screenshot or description
- Browser and OS (for demo site UI bugs)

---

### Suggesting Features

Open an issue with the label `enhancement` and describe:

- What you want the feature to do
- Why it would be useful to other users
- A rough idea of how it might work (optional but helpful)

Good candidates: new animation types, new font options, new query parameters, demo site UI improvements.

---

### Adding a New Animation

This is the most impactful type of contribution. Here is the full process:

#### Step 1 — Plan your animation

Think about:
- What should the text do visually?
- Does it work well with `multiline=true`?
- Does it respect `center`, `vCenter`, `repeat`, and `letterSpacing`?
- Does it look good at different font sizes and SVG dimensions?

Stick to pure SVG animations (`<animate>`, `<animateTransform>`, CSS `@keyframes` inside `<style>`). No JavaScript inside the SVG.

#### Step 2 — Create the animation module

Create a new file `api/animations/myanimation.js`:

```js
module.exports = (ctx) => {
    const {
        lines, textX, textAnchor, commonStyle,
        repeat, lineDurS, slotS, sequenceOpacity, lineY,
    } = ctx;

    return lines.map((line, i) => `<text
        x="${textX}"
        y="${lineY(i)}"
        text-anchor="${textAnchor}"
        style="${commonStyle}"
        opacity="0">
        ${sequenceOpacity(i)}
        <!-- your SVG animation here -->
        ${line}
    </text>`).join('');
};
```

Key variables available in the `ctx` object:

| Variable | Description |
|----------|-------------|
| `lines` | `string[]` — array of text lines |
| `textColor` | `string` — `#RRGGBB` |
| `textX` | `string` — `"50%"` or `"20"` depending on `center` |
| `textAnchor` | `string` — `"middle"` or `"start"` |
| `intSize` | `number` — font size in px |
| `intWidth` / `intHeight` | `number` — SVG dimensions |
| `lineDurS` / `pauseS` | `number` — timing in seconds |
| `slotS` / `cycleDurS` | `number` — slot and full cycle duration |
| `commonStyle` | `string` — inline style with font, size, fill |
| `repeat` | `boolean` |
| `multiline` | `boolean` |
| `vCenter` | `boolean` |
| `center` | `boolean` |
| `lineY(index)` | `function` — returns Y coordinate for a line |
| `sequenceOpacity(index)` | `function` — returns the opacity `<animate>` element |
| `clamp01(value)` | `function` — clamps value to [0, 1] |

#### Step 3 — Register in `api/animations/index.js`

```js
module.exports = {
    // ... existing entries ...
    myanimation: require('./myanimation'),
};
```

#### Step 4 — Register in `api/index.js`

Add your animation name to the `validAnimations` array:

```js
const validAnimations = [
    'typing', 'fade', 'slide', /* ... */,
    'myanimation',  // ← add here
];
```

#### Step 5 — Add it to the demo site in `index.html`

Find the `ANIMATIONS` array in the `<script>` section:

```js
const ANIMATIONS = [
    // ... existing entries ...
    { id: 'myanimation', label: 'My Animation', description: 'Short description of the visual effect.' },
];
```

#### Step 6 — Test it thoroughly

```bash
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

`index.html` is a self-contained file with no build step. Edit it and refresh `http://localhost:3000`.

Guidelines:

- Keep it a **single file** with no external dependencies (exception: Google Fonts via `<link>`)
- Do not introduce a bundler, framework, or npm dependencies
- Maintain the existing dark color scheme and design language
- New controls should update the preview and regenerate the URL in real time

---

### Documentation

Improvements to `README.md` or `CONTRIBUTING.md` are always welcome:

- Fixing typos or unclear wording
- Adding new usage examples
- Improving parameter descriptions
- Documenting new features

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

5. **PRs should pass the manual test checklist** (see Step 6 above for animations).

---

## Code Style

There is no linter configured, but please follow the existing conventions:

- **Indentation:** 4 spaces (no tabs)
- **Quotes:** single quotes in JavaScript
- **Semicolons:** yes
- **Variable declarations:** `const` by default, `let` only when reassignment is needed
- **Comments:** sparingly, for non-obvious logic only
- **SVG strings:** template literals with consistent 4-space indentation
- **No external npm packages** — the `api/` folder has zero dependencies by design

---

## Animation API Contract

Each animation module exports a single function:

```js
module.exports = (ctx) => { /* ... */ return svgFragment; };
```

The `ctx` object shape:

```js
{
    lines:           string[],   // array of decoded text lines (never empty)
    textColor:       string,     // e.g. "#36BCF7"
    commonStyle:     string,     // inline CSS string
    textX:           string,     // "50%" or "20"
    textAnchor:      string,     // "middle" or "start"
    intSize:         number,     // font size in px
    intWidth:        number,     // SVG width in px
    intHeight:       number,     // SVG height in px
    lineDurS:        number,     // seconds per line
    pauseS:          number,     // seconds pause between lines
    slotS:           number,     // lineDurS + pauseS
    cycleDurS:       number,     // total cycle duration in seconds
    center:          boolean,
    vCenter:         boolean,
    multiline:       boolean,
    repeat:          boolean,
    lineY:           (index: number) => number,
    sequenceOpacity: (index: number) => string,   // SVG <animate> element
    clamp01:         (value: number) => string,
}
```

The function must return a `string` of valid SVG markup **without** the `<svg>` wrapper. The wrapper is added by `api/index.js`.

---

Thanks for contributing — every improvement, no matter how small, makes this project better for everyone. 🙌
