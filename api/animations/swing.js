module.exports = (ctx) => {
    const { lines, textX, textAnchor, commonStyle, repeat, lineDurS, sequenceOpacity, lineY, slotS } = ctx;
    return lines.map((line, i) => {
        const beginS = (i * slotS).toFixed(3);
        const swingDur = Math.max(0.4, lineDurS * 0.7).toFixed(3);
        return `<text x="${textX}" y="${lineY(i)}" text-anchor="${textAnchor}" style="${commonStyle}" opacity="0">
            ${sequenceOpacity(i)}
            <animateTransform attributeName="transform" type="rotate" values="-4 ${textX} ${lineY(i)};4 ${textX} ${lineY(i)};-3 ${textX} ${lineY(i)};0 ${textX} ${lineY(i)}" dur="${swingDur}s" begin="${beginS}s" repeatCount="${repeat ? 'indefinite' : '1'}" />
            ${line}
        </text>`;
    }).join('');
};
