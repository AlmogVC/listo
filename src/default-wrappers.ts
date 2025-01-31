import { Wrapper } from './wrapper.type';

const parenthesesLineWrapper: Pick<Wrapper, 'listStart' | 'listEnd'> = {
    listStart: '(',
    listEnd: ')',
};

const squareBracketsLineWrapper: Pick<Wrapper, 'listStart' | 'listEnd'> = {
    listStart: '[',
    listEnd: ']',
};

const angleBracketsLineWrapper: Pick<Wrapper, 'listStart' | 'listEnd'> = {
    listStart: '<',
    listEnd: '>',
};

const curlyBracketsLineWrapper: Pick<Wrapper, 'listStart' | 'listEnd'> = {
    listStart: '{',
    listEnd: '}',
};

const doubleQuotationMarkItemWrapper: Pick<Wrapper, 'itemStart' | 'itemEnd'> = {
    itemEnd: '"',
    itemStart: '"',
}


export const parenthesesMultiLineWrapper: Wrapper = {
    ...parenthesesLineWrapper,
    ...doubleQuotationMarkItemWrapper,
    itemJoin: ',',
    newLine: true
};

export const squareBracketsMultiLineWrapper: Wrapper = {
    ...squareBracketsLineWrapper,
    ...doubleQuotationMarkItemWrapper,
    itemJoin: ',',
    newLine: true
};

export const angleBracketsMultiLineWrapper: Wrapper = {
    ...angleBracketsLineWrapper,
    ...doubleQuotationMarkItemWrapper,
    itemJoin: ',',
    newLine: true
};

export const curlyBracketsMultiLineWrapper: Wrapper = {
    ...curlyBracketsLineWrapper,
    ...doubleQuotationMarkItemWrapper,
    itemJoin: ',',
    newLine: true
};

export const jsonMultiLineWrapper: Wrapper = {
    ...curlyBracketsLineWrapper,
    itemStart: '"',
    itemEnd: `":""`,
    itemJoin: ',',
    newLine: true
};

