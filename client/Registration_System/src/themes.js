import { tokensDark } from './colourTokens';

const invertColours = (colourTokens) => {
    const reversedTokens = {};
    Object.entries(colourTokens).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObject = {};
        for (let i = 0; i < length; i++) {
            reversedObject[keys[i]] = values[length - 1 - 1];
        }
        reversedTokens[key] = reversedObject;
    });
    return reversedTokens;
};

export const tokensLight = invertColours(tokensDark);

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          ...tokensDark.indigo,
                          main: tokensDark.indigo[400],
                          light: tokensDark.indigo[400],
                      },
                      secondary: {
                          ...tokensDark.white,
                          main: tokensDark.white[300],
                      },
                      neutral: {
                          ...tokensDark.zinc,
                          main: tokensDark.zinc[500],
                      },
                      background: {
                          default: tokensDark.indigo[600],
                          alt: tokensDark.indigo[500],
                      },
                  }
                : {
                      primary: {
                          ...tokensLight.indigo,
                          main: tokensDark.zinc[50],
                          light: tokensDark.zinc[100],
                      },
                      secondary: {
                          ...tokensLight.white,
                          main: tokensDark.white[600],
                          light: tokensDark.white[700],
                      },
                      neutral: {
                          ...tokensLight.zinc,
                          main: tokensDark.zinc[500],
                      },
                      background: {
                          default: tokensDark.zinc[0],
                          alt: tokensDark.zinc[50],
                      },
                  }),
        },
    };
};

// black: {
//     100: "#d3d4de",
//     200: "#a6a9be",
//     300: "#7a7f9d",
//     400: "#4d547d",
//     500: "#21295c",
//     600: "#1a214a",
//     700: "#141937",
//     800: "#0d1025",
//     900: "#070812"
// },

// green: {
//     100: "#e2faf1",
//     200: "#c5f5e2",
//     300: "#a8f1d4",
//     400: "#8becc5",
//     500: "#6ee7b7",
//     600: "#58b992",
//     700: "#428b6e",
//     800: "#2c5c49",
//     900: "#162e25"
// },
