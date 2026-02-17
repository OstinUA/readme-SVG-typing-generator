/**
 * SVG Animation Generator — animations.js
 * Generates SVG content for various text animation types
 */

const FONTS = {
    monospace: "'Courier New', Courier, monospace",
    sans: "'Segoe UI', Ubuntu, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    code: "'Fira Code', 'JetBrains Mono', monospace",
};

const getAnimation = (type, {
    lines,        // array of strings
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
    random,
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

    // Y position
    const yBase = vCenter
        ? intHeight / 2
        : (intHeight * 0.6);

    // Background rect
    const bgRect = bgColor !== 'transparent'
        ? `<rect width="${intWidth}" height="${intHeight}" fill="${bgColor}" />`
        : '';

    switch (type) {

        // ─────────────────────────────────────────────
        //  TYPING  (main flagship — char by char)
        // ─────────────────────────────────────────────
        case 'typing': {
            if (multiline) {
                // All lines visible, staggered reveal
                const lineH = intSize * 1.6;
                const totalH = lines.length * lineH;
                const startY = vCenter ? (intHeight - totalH) / 2 + intSize : intSize + 10;

                let items = lines.map((line, i) => {
                    const charWidth = intSize * 0.6;
                    const totalLineWidth = Math.ceil(line.length * charWidth) + 30;
                    const startTime = (i * (intDuration + intPause)) / 1000;
                    const dur = intDuration / 1000;
                    const tx = center ? (intWidth - totalLineWidth) / 2 : 20;

                    return `
                    <g>
                        <defs>
                            <clipPath id="clip${i}">
                                <rect x="${tx}" y="0" width="0" height="${intHeight}">
                                    <animate attributeName="width"
                                        values="0;${totalLineWidth};${totalLineWidth}"
                                        dur="${startTime + dur}s"
                                        begin="0s"
                                        fill="freeze" />
                                </rect>
                            </clipPath>
                        </defs>
                        <text x="${textX}" y="${startY + i * lineH}"
                            text-anchor="${textAnchor}"
                            style="${commonStyle}"
                            clip-path="url(#clip${i})"
                            opacity="0">
                            <animate attributeName="opacity" values="0;1" dur="0.01s"
                                begin="${startTime}s" fill="freeze" />
                            ${line}
                        </text>
                    </g>`;
                }).join('');

                return `${bgRect}${items}`;
            }

            // Single-line cycling typing
            const allLines = random
                ? [...lines].sort(() => Math.random() - 0.5)
                : lines;

            const lineDurMs = intDuration;
            const pauseMs = intPause;
            const cycleDur = allLines.length * (lineDurMs + pauseMs);
            const cycleDurS = cycleDur / 1000;

            let clips = '', texts = '';
            allLines.forEach((line, i) => {
                const charCount = line.length;
                const charWidth = intSize * 0.6;
                const totalLineWidth = Math.ceil(charCount * charWidth) + 30;
                const startMs = i * (lineDurMs + pauseMs);
                const startS = startMs / 1000;
                const typingS = lineDurMs * 0.4 / 1000;
                const holdS = lineDurMs * 0.3 / 1000;
                const eraseS = lineDurMs * 0.3 / 1000;

                const clipId = `clip_t${i}`;
                const tx = center ? (intWidth / 2 - totalLineWidth / 2) : 20;

                // Width keyframe times (normalized 0..1 within cycleDur)
                const t0 = (startS) / cycleDurS;
                const t1 = (startS + typingS) / cycleDurS;
                const t2 = (startS + typingS + holdS) / cycleDurS;
                const t3 = (startS + typingS + holdS + eraseS) / cycleDurS;
                const t4 = 1;

                // Clamp
                const clamp = v => Math.min(1, Math.max(0, v)).toFixed(4);

                clips += `
                <clipPath id="${clipId}">
                    <rect x="${tx}" y="0" width="0" height="${intHeight}">
                        <animate attributeName="width"
                            values="0;0;${totalLineWidth};${totalLineWidth};0;0"
                            keyTimes="${[0, clamp(t0), clamp(t1), clamp(t2), clamp(t3), clamp(t4)].join(';')}"
                            dur="${cycleDurS}s"
                            repeatCount="${repeat ? 'indefinite' : '1'}"
                            fill="freeze" />
                    </rect>
                </clipPath>`;

                // Cursor x
                const cursorValues = `${tx};${tx};${tx + totalLineWidth};${tx + totalLineWidth};${tx};${tx}`;

                texts += `
                <text x="${textX}" y="${yBase}"
                    text-anchor="${textAnchor}"
                    style="${commonStyle}"
                    clip-path="url(#${clipId})">${line}</text>
                <rect x="${tx}" y="${yBase - intSize + 4}" width="2" height="${intSize}" fill="${textColor}">
                    <animate attributeName="x"
                        values="${cursorValues}"
                        keyTimes="${[0, clamp(t0), clamp(t1), clamp(t2), clamp(t3), clamp(t4)].join(';')}"
                        dur="${cycleDurS}s"
                        repeatCount="${repeat ? 'indefinite' : '1'}"
                        fill="freeze" />
                    <animate attributeName="opacity" values="1;0;1" dur="0.65s" repeatCount="indefinite" />
                </rect>`;
            });

            return `${bgRect}<defs>${clips}</defs>${texts}`;
        }

        // ─────────────────────────────────────────────
        //  FADE
        // ─────────────────────────────────────────────
        case 'fade': {
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const startY = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                const phaseShift = multiline ? 0 : (i / lines.length);
                const durS = (intDuration + intPause) * lines.length / 1000;
                const tStart = phaseShift;
                const tEnd = phaseShift + (1 / lines.length) * 0.8;

                if (multiline) {
                    return `<text x="${textX}" y="${startY}" text-anchor="${textAnchor}" style="${commonStyle}">
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.3;0.7;1"
                            dur="${intDuration / 1000}s" begin="${i * (intDuration + intPause) / 1000}s"
                            repeatCount="${repeat ? 'indefinite' : '1'}" fill="freeze" />
                        ${line}
                    </text>`;
                }
                return `<text x="${textX}" y="${startY}" text-anchor="${textAnchor}" style="${commonStyle}" opacity="0">
                    <animate attributeName="opacity"
                        values="0;0;1;1;0;0"
                        keyTimes="0;${tStart.toFixed(3)};${(tStart + 0.05).toFixed(3)};${(tEnd - 0.05).toFixed(3)};${tEnd.toFixed(3)};1"
                        dur="${durS}s"
                        repeatCount="${repeat ? 'indefinite' : '1'}" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  SLIDE UP
        // ─────────────────────────────────────────────
        case 'slide': {
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const startY = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                const phaseS = (i / lines.length) * (intDuration + intPause) * lines.length / 1000;
                const durS = (intDuration + intPause) * lines.length / 1000;
                return `<text x="${textX}" y="${startY}" text-anchor="${textAnchor}" style="${commonStyle}" opacity="0">
                    <animate attributeName="opacity" values="0;0;1;1;0;0"
                        keyTimes="0;${(phaseS / durS).toFixed(3)};${(phaseS / durS + 0.1).toFixed(3)};${(phaseS / durS + 0.55).toFixed(3)};${(phaseS / durS + 0.65).toFixed(3)};1"
                        dur="${durS}s" repeatCount="${repeat ? 'indefinite' : '1'}" />
                    <animateTransform attributeName="transform" type="translate"
                        values="0,30;0,30;0,0;0,0;0,-20;0,-20"
                        keyTimes="0;${(phaseS / durS).toFixed(3)};${(phaseS / durS + 0.1).toFixed(3)};${(phaseS / durS + 0.55).toFixed(3)};${(phaseS / durS + 0.65).toFixed(3)};1"
                        dur="${durS}s" repeatCount="${repeat ? 'indefinite' : '1'}" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  BOUNCE
        // ─────────────────────────────────────────────
        case 'bounce': {
            const durS = intDuration / 1000;
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0;0,-${Math.round(intSize * 0.4)};0,0;0,-${Math.round(intSize * 0.2)};0,0"
                        keyTimes="0;0.25;0.5;0.75;1"
                        dur="${durS}s" repeatCount="${repeat ? 'indefinite' : '1'}"
                        begin="${i * 0.15}s" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  PULSE / SCALE
        // ─────────────────────────────────────────────
        case 'pulse': {
            const durS = intDuration / 1000;
            const cx = center ? intWidth / 2 : 20;
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}"
                    transform-origin="${cx} ${y}">
                    <animateTransform attributeName="transform" type="scale"
                        values="1;1.08;1;0.95;1"
                        keyTimes="0;0.3;0.5;0.75;1"
                        additive="sum"
                        dur="${durS}s" repeatCount="${repeat ? 'indefinite' : '1'}"
                        begin="${i * 0.2}s" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  BLINK
        // ─────────────────────────────────────────────
        case 'blink': {
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}">
                    <animate attributeName="opacity" values="1;0;1" keyTimes="0;0.5;1"
                        calcMode="discrete"
                        dur="${intDuration / 1000}s" repeatCount="${repeat ? 'indefinite' : '1'}"
                        begin="${i * 0.3}s" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  SHAKE
        // ─────────────────────────────────────────────
        case 'shake': {
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0;-2,1;2,-1;-3,2;3,-2;-2,1;2,-1;0,0"
                        dur="0.4s" repeatCount="indefinite" begin="${i * 0.05}s" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  RAINBOW / COLOR CYCLE
        // ─────────────────────────────────────────────
        case 'rainbow': {
            const durS = intDuration / 1000;
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                const shift = i * (durS / lines.length);
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}">
                    <animate attributeName="fill"
                        values="${textColor};#ff0040;#ff8c00;#ffef00;#00dd44;#0088ff;#7700ff;${textColor}"
                        dur="${durS}s" repeatCount="${repeat ? 'indefinite' : '1'}"
                        begin="${shift}s" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  GLITCH
        // ─────────────────────────────────────────────
        case 'glitch': {
            const durS = intDuration / 1000;
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                return `<g>
                    <text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}" fill="red" opacity="0.4">
                        <animateTransform attributeName="transform" type="translate"
                            values="2,0;-2,0;2,1;-2,-1;0,0" dur="${durS * 0.3}s" repeatCount="indefinite" />
                        ${line}
                    </text>
                    <text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}" fill="cyan" opacity="0.4">
                        <animateTransform attributeName="transform" type="translate"
                            values="-2,0;2,0;-2,-1;2,1;0,0" dur="${durS * 0.3}s" repeatCount="indefinite" />
                        ${line}
                    </text>
                    <text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}" opacity="0.9">
                        <animateTransform attributeName="transform" type="translate"
                            values="0,0;1,0;-1,0;0,1;0,0" dur="${durS * 0.5}s" repeatCount="indefinite" />
                        ${line}
                    </text>
                </g>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  STROKE / DRAW-ON
        // ─────────────────────────────────────────────
        case 'stroke': {
            const durS = intDuration / 1000;
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                const dashLen = Math.max(600, line.length * intSize * 0.7);
                const beginS = multiline ? i * (durS + intPause / 1000) : 0;
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}"
                    fill="none" stroke="${textColor}" stroke-width="1.5"
                    stroke-dasharray="${dashLen}" stroke-dashoffset="${dashLen}">
                    <animate attributeName="stroke-dashoffset"
                        values="${dashLen};0" dur="${durS}s" begin="${beginS}s"
                        fill="freeze" repeatCount="${repeat ? 'indefinite' : '1'}" />
                    <animate attributeName="fill" values="transparent;${textColor}"
                        keyTimes="0;1" dur="${durS}s" begin="${beginS}s"
                        fill="freeze" repeatCount="${repeat ? 'indefinite' : '1'}" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  WAVE (NEW)
        // ─────────────────────────────────────────────
        case 'wave': {
            const durS = intDuration / 1000;
            const line = lines[0];
            const chars = line.split('');
            const charWidth = intSize * 0.62;
            const totalW = chars.length * charWidth;
            const startX = center ? (intWidth - totalW) / 2 : 20;

            const charEls = chars.map((ch, i) => {
                const x = startX + i * charWidth;
                const delay = (i / chars.length) * durS * 0.5;
                return `<text x="${x}" y="${yBase}" style="${commonStyle}">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,0;0,-${intSize * 0.4};0,0"
                        dur="${durS * 0.5}s"
                        begin="${delay}s"
                        repeatCount="indefinite" />
                    ${ch}
                </text>`;
            }).join('');
            return `${bgRect}${charEls}`;
        }

        // ─────────────────────────────────────────────
        //  FLIP / ROTATE (NEW)
        // ─────────────────────────────────────────────
        case 'flip': {
            const durS = intDuration / 1000;
            const cycleDurS = (intDuration + intPause) * lines.length / 1000;
            const items = lines.map((line, i) => {
                const beginS = i * (intDuration + intPause) / 1000;
                return `<text x="${textX}" y="${yBase}" text-anchor="${textAnchor}" style="${commonStyle}" opacity="0">
                    <animate attributeName="opacity" values="0;1;1;0"
                        keyTimes="0;0.1;0.8;1"
                        dur="${cycleDurS}s" begin="${beginS}s"
                        repeatCount="${repeat ? 'indefinite' : '1'}" fill="freeze" />
                    <animateTransform attributeName="transform" type="rotate"
                        values="90 ${intWidth / 2} ${yBase};0 ${intWidth / 2} ${yBase};0 ${intWidth / 2} ${yBase};-90 ${intWidth / 2} ${yBase}"
                        keyTimes="0;0.1;0.8;1"
                        dur="${cycleDurS}s" begin="${beginS}s"
                        repeatCount="${repeat ? 'indefinite' : '1'}" fill="freeze" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  NEON GLOW (NEW)
        // ─────────────────────────────────────────────
        case 'neon': {
            const durS = intDuration / 1000;
            const filterId = `neon_filter_${Math.random().toString(36).slice(2, 7)}`;
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}"
                    filter="url(#${filterId})" opacity="0.9">
                    <animate attributeName="opacity" values="0.5;1;0.5;0.8;1;0.5"
                        dur="${durS}s" repeatCount="indefinite" begin="${i * 0.3}s" />
                    ${line}
                </text>`;
            }).join('');
            return `
            ${bgRect}
            <defs>
                <filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            ${items}`;
        }

        // ─────────────────────────────────────────────
        //  MATRIX / RAIN (NEW)
        // ─────────────────────────────────────────────
        case 'matrix': {
            const durS = intDuration / 1000;
            const line = lines[0];
            const cols = Math.floor(intWidth / (intSize * 0.6));
            let drops = '';
            for (let c = 0; c < Math.min(cols, 30); c++) {
                const x = c * (intSize * 0.6) + (intSize * 0.3);
                const delay = (Math.random() * durS).toFixed(2);
                const charPool = line.split('').concat(['0','1','#','@','!','$','%','^','&','*']);
                const ch = charPool[c % charPool.length];
                drops += `<text x="${x}" y="0" style="${commonStyle}" font-size="${Math.max(10, intSize - 4)}px" opacity="0.8">
                    <animateTransform attributeName="transform" type="translate"
                        values="0,-${intSize};0,${intHeight + intSize}"
                        dur="${(durS * 0.5 + Math.random()).toFixed(2)}s"
                        begin="${delay}s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;0.9;0.4;0.9;0"
                        dur="${(durS * 0.5).toFixed(2)}s" begin="${delay}s" repeatCount="indefinite" />
                    ${ch}
                </text>`;
            }
            return `${bgRect}${drops}`;
        }

        // ─────────────────────────────────────────────
        //  ZOOM IN / OUT (NEW)
        // ─────────────────────────────────────────────
        case 'zoom': {
            const durS = intDuration / 1000;
            const cx = intWidth / 2;
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                const phaseShift = (i / lines.length) * durS;
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}"
                    transform-origin="${cx} ${y}" opacity="0">
                    <animate attributeName="opacity" values="0;1;1;0"
                        keyTimes="0;0.2;0.7;1"
                        dur="${durS}s" begin="${phaseShift}s" repeatCount="${repeat ? 'indefinite' : '1'}" />
                    <animateTransform attributeName="transform" type="scale"
                        values="0.1;1;1;2"
                        keyTimes="0;0.2;0.7;1"
                        additive="sum"
                        dur="${durS}s" begin="${phaseShift}s" repeatCount="${repeat ? 'indefinite' : '1'}" />
                    ${line}
                </text>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  BLUR IN (NEW)
        // ─────────────────────────────────────────────
        case 'blur': {
            const durS = intDuration / 1000;
            const filterId = `blur_filter_${Math.random().toString(36).slice(2, 7)}`;
            const items = lines.map((line, i) => {
                const lineH = intSize * 1.6;
                const y = multiline
                    ? (vCenter ? (intHeight - lines.length * lineH) / 2 + intSize + i * lineH : 30 + i * lineH)
                    : yBase;
                const phaseShift = (i / lines.length) * durS;
                const animId = `blur_anim_${i}_${Math.random().toString(36).slice(2, 5)}`;
                return `<text x="${textX}" y="${y}" text-anchor="${textAnchor}" style="${commonStyle}"
                    filter="url(#${filterId}${i})" opacity="0">
                    <animate attributeName="opacity" values="0;1;1;0"
                        keyTimes="0;0.25;0.75;1"
                        dur="${durS}s" begin="${phaseShift}s" repeatCount="${repeat ? 'indefinite' : '1'}" />
                    ${line}
                </text>
                <defs>
                    <filter id="${filterId}${i}">
                        <feGaussianBlur stdDeviation="8;0;0;8">
                            <animate attributeName="stdDeviation"
                                values="10;0;0;10"
                                keyTimes="0;0.25;0.75;1"
                                dur="${durS}s" begin="${phaseShift}s" repeatCount="${repeat ? 'indefinite' : '1'}" />
                        </feGaussianBlur>
                    </filter>
                </defs>`;
            }).join('');
            return `${bgRect}${items}`;
        }

        // ─────────────────────────────────────────────
        //  DEFAULT fallback
        // ─────────────────────────────────────────────
        default: {
            const line = lines[0] || '';
            return `${bgRect}<text x="${textX}" y="${yBase}" text-anchor="${textAnchor}" style="${commonStyle}">${line}</text>`;
        }
    }
};

module.exports = getAnimation;
