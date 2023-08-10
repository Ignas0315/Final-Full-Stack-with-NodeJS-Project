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
                          ...tokensDark.primary,
                          main: tokensDark.primary[400],
                          light: tokensDark.primary[400],
                          inner: tokensDark.grey[100],
                      },
                      secondary: {
                          ...tokensDark.secondary,
                          main: tokensDark.secondary[300],
                      },
                      neutral: {
                          ...tokensDark.grey,
                          main: tokensDark.grey[500],
                      },
                      background: {
                          default: tokensDark.primary[600],
                          alt: tokensDark.primary[500],
                          very: tokensDark.primary[600],
                          disabled: tokensDark.grey[300],
                      },
                  }
                : {
                      // palette values for light mode
                      primary: {
                          ...tokensLight.grey,
                          main: tokensDark.grey[600],
                          light: tokensDark.grey[100],
                      },
                      secondary: {
                          ...tokensLight.secondary,
                          main: tokensDark.secondary[600],
                          light: tokensDark.secondary[700],
                      },
                      neutral: {
                          ...tokensLight.grey,
                          main: tokensDark.grey[500],
                      },
                      background: {
                          default: tokensDark.grey[10],
                          alt: tokensDark.grey[50],
                          very: tokensDark.grey[500],
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
