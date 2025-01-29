import { Wrapper } from "./wrapper.type";

export function getFormattedText(textToFormat: string, { itemEnd, itemStart, listEnd, listStart, itemJoin, newLine }: Wrapper, eofChar: string) {
    const splittedText = textToFormat.split(eofChar);
    const betweenLinesChar = newLine ? eofChar : '';

    const joinedText = splittedText.map(chunk => {
        const start = chunk.startsWith(itemStart) ? '' : itemStart;
        const end = chunk.endsWith(itemEnd) ? '' : itemEnd;
        return `${start}${chunk}${end}`;
    }).join(`${itemJoin}${betweenLinesChar}`);

    return `${listStart}${betweenLinesChar}${joinedText}${betweenLinesChar}${listEnd}`;
};