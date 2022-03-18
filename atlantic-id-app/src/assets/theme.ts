import * as COLORS from './colors';

interface ColorType {
    main: string;
    contrastText: string;
    active: string;
    focus: string;
    hover: string;
}

interface ColorTypes {
    primary: ColorType;
    secondary: ColorType;
    white: ColorType;
    black: ColorType;
}

const primary: ColorType = {
    main: COLORS.ATLANTIC_GREEN,
    contrastText: COLORS.WHITE_SMOKE,
    active: COLORS.WHITE_SMOKE,
    focus: COLORS.WHITE_SMOKE,
    hover: COLORS.WHITE_SMOKE
};
  
const secondary: ColorType = {
    main: COLORS.WHITE,
    contrastText: "black",
    active: COLORS.WHITE,
    focus: COLORS.WHITE,
    hover: COLORS.WHITE
};

const white: ColorType = {
    main: COLORS.WHITE,
    contrastText: COLORS.ATLANTIC_GREEN,
    active: COLORS.WHITE,
    focus: COLORS.WHITE_SMOKE,
    hover: COLORS.WHITE_SMOKE
  };

const black: ColorType = {
    main: "black",
    contrastText: "black",
    active: "black",
    focus: "black",
    hover: "black"
}

const colors: ColorTypes = {
    primary,
    secondary,
    white,
    black,
};

type ColorTypeKey = keyof typeof colors;

export {
    ColorTypeKey,
    ColorType,
    ColorTypes,
    colors,
    black,
    white,
    secondary,
    primary
}