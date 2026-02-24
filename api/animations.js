/**
 * SVG Animation Generator — animations.js
 * Dispatcher for text animations (one file per animation)
 */

const animationMap = require('./animations/index');
const { clamp01, getLineY, buildSequenceOpacity } = require('./animations/_utils');

const FONTS = {
    monospace: "'Courier New', Courier, monospace",
    sans: "'Segoe UI', Ubuntu, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    code: "'Fira Code', 'JetBrains Mono', monospace",
};

const getAnimation = (type, {
    lines,
    color,
    size,
    duration,
    pause,
    width,
    height,
    font,
    background,
    center,
    vCenter,
    multiline,
    letterSpacing,
    repeat,
}) => {
    const fontFamily = FONTS[font] || FONTS.monospace;
    const textColor = `#${color}`;
    const bgColor = background && background !== '00000000' ? `#${background}` : 'transparent';
    const textAnchor = center ? 'middle' : 'start';
    const textX = center ? '50%' : '20';

    const intSize = parseInt(size);
    const intWidth = parseInt(width);
    const intHeight = parseInt(height);
    const intDuration = parseInt(duration);
    const intPause = parseInt(pause);

    const commonStyle = `
        font-family: ${fontFamily};
        font-weight: bold;
        font-size: ${intSize}px;
        fill: ${textColor};
        letter-spacing: ${letterSpacing || 'normal'};
    `;

    const lineDurS = intDuration / 1000;
    const pauseS = intPause / 1000;
    const slotS = lineDurS + pauseS;
    const cycleDurS = slotS * Math.max(lines.length, 1);

    const lineY = (index) => getLineY({
        multiline,
        vCenter,
        intHeight,
        intSize,
        linesCount: lines.length,
        index,
    });

    const sequenceOpacity = (index) => buildSequenceOpacity({
        index,
        slotS,
        lineDurS,
        cycleDurS,
        repeat,
    });

    const bgRect = bgColor !== 'transparent'
        ? `<rect width="${intWidth}" height="${intHeight}" fill="${bgColor}" />`
        : '';

    const renderer = animationMap[type] || animationMap.typing;
    const content = renderer({
        lines,
        textColor,
        intSize,
        intWidth,
        intHeight,
        textX,
        textAnchor,
        commonStyle,
        center,
        vCenter,
        multiline,
        repeat,
        lineDurS,
        pauseS,
        slotS,
        cycleDurS,
        clamp01,
        lineY,
        sequenceOpacity,
    });

    return `${bgRect}${content}`;
};

module.exports = getAnimation;
