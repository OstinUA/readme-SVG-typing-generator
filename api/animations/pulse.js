module.exports = (ctx) => {
    const { lines, textX, textAnchor, commonStyle, repeat, lineDurS, intWidth, center, sequenceOpacity, lineY } = ctx;
    const cx = center ? intWidth / 2 : 20;
    return lines.map((line, i) => `<text x="${textX}" y="${lineY(i)}" text-anchor="${textAnchor}" style="${commonStyle}" opacity="0" transform-origin="${cx} ${lineY(i)}">
        ${sequenceOpacity(i)}
        <animateTransform attributeName="transform" type="scale" values="1;1.08;1;0.96;1" keyTimes="0;0.3;0.5;0.75;1" additive="sum" dur="${lineDurS}s" begin="${(i * ctx.slotS).toFixed(3)}s" repeatCount="${repeat ? 'indefinite' : '1'}" />
        ${line}
    </text>`).join('');
};
