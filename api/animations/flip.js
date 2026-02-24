module.exports = (ctx) => {
    const { lines, textX, textAnchor, commonStyle, repeat, lineDurS, intWidth, sequenceOpacity, lineY } = ctx;
    return lines.map((line, i) => `<text x="${textX}" y="${lineY(i)}" text-anchor="${textAnchor}" style="${commonStyle}" opacity="0">
        ${sequenceOpacity(i)}
        <animateTransform attributeName="transform" type="rotate" values="90 ${intWidth / 2} ${lineY(i)};0 ${intWidth / 2} ${lineY(i)};0 ${intWidth / 2} ${lineY(i)};-90 ${intWidth / 2} ${lineY(i)}" keyTimes="0;0.1;0.8;1" dur="${lineDurS}s" begin="${(i * ctx.slotS).toFixed(3)}s" repeatCount="${repeat ? 'indefinite' : '1'}" fill="freeze" />
        ${line}
    </text>`).join('');
};
