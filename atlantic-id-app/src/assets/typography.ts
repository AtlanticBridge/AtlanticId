const FontBody = {
    BOLD: 'bold-body',
    STANDARD: 'standard-body',
    ITALIC: 'italic-body',
    BOLDITALIC: 'italic-bold-body'
};

const FontHeader = {
    BOLD: 'bold-header',
    STANDARD: 'standard-header',
    ITALIC: 'italic-header',
    BOLDITALIC: 'italic-bold-header'
};
  
type Keys = keyof typeof FontBody;
  
type FontStyleBody = typeof FontBody[Keys];
  
type FontStyleHeader = typeof FontHeader[Keys];

export {
    FontBody,
    FontHeader,
    FontStyleBody,
    FontStyleHeader
}