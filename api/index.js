const getAnimation = require('./animations');

module.exports = (req, res) => {
    // ── Parse query params ──────────────────────────────────────
    const {
        lines: rawLines = 'Hello+World!',
        color       = '36BCF7',
        size        = '20',
        animation   = 'typing',
        duration    = '5000',
        pause       = '1000',
        width       = '435',
        height      = '50',
        font        = 'monospace',
        background  = '00000000',
        center      = 'false',
        vCenter     = 'false',
        multiline   = 'false',
        letterSpacing = 'normal',
        repeat      = 'true',
        random      = 'false',
        separator   = ';',
    } = req.query;

    // Split multi-line text
    const lines = rawLines
        .split(separator)
        .map(l => decodeURIComponent(l.replace(/\+/g, ' ')).trim())
        .filter(Boolean);

    if (lines.length === 0) lines.push('Hello World!');

    // ── Sanitize ────────────────────────────────────────────────
    const safeColor = (color || '36BCF7').replace(/[^a-fA-F0-9]/g, '').slice(0, 6) || '36BCF7';
    const safeBg    = (background || '00000000').replace(/[^a-fA-F0-9]/g, '').slice(0, 8) || '00000000';
    const safeSize  = Math.min(Math.max(parseInt(size) || 20, 8), 120);
    const safeDur   = Math.min(Math.max(parseInt(duration) || 5000, 200), 30000);
    const safePause = Math.min(Math.max(parseInt(pause) || 1000, 0), 10000);
    const safeW     = Math.min(Math.max(parseInt(width) || 435, 50), 1200);
    const safeH     = Math.min(Math.max(parseInt(height) || 50, 20), 400);

    const opts = {
        lines,
        color: safeColor,
        size: safeSize,
        duration: safeDur,
        pause: safePause,
        width: safeW,
        height: safeH,
        font,
        background: safeBg,
        center: center === 'true',
        vCenter: vCenter === 'true',
        multiline: multiline === 'true',
        letterSpacing,
        repeat: repeat !== 'false',
        random: random === 'true',
    };

    const validAnimations = [
        'typing','fade','slide','bounce','pulse','blink',
        'shake','rainbow','glitch','stroke','wave','flip',
        'neon','matrix','zoom','blur',
    ];
    const animType = validAnimations.includes(animation) ? animation : 'typing';

    // ── Render ──────────────────────────────────────────────────
    const svgContent = getAnimation(animType, opts);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${safeW}"
     height="${safeH}"
     viewBox="0 0 ${safeW} ${safeH}">
    ${svgContent}
</svg>`);
};
