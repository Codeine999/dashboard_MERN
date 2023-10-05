// color design tokens export
export const tokensDark = {
    grey: {
      0: "#f2f2f2", // manually adjusted
      10: "#f6f6f6", // manually adjusted
      50: "#21295c", // manually adjusted
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#fcfcfc",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
      1000: "#000000", // manually adjusted
      1100: "#fcfcfc", //navbar light
      1200: "#292929", //navbar dark
    },
    primary: {
      // blue
      100: "#d3d4de",
      200: "#a6a9be",
      300: "#7a7f9d",
      400: "#4d547d",
      500: "#212530", // sidebar
      600: "#212121",  // พื้นหลัง dark mode
      700: "#141937",
      800: "#0d1025",
      900: "#070812",
    },
    secondary: {
      // yellow
      50: "#f0f0f0", // manually adjusted
      100: "#fcfcfc", // สีตัวอักษร dark mode
      200: "#fcfcfc", // ขื่อเมนู icons dark mode
      300: "#ffe3a3", // สีแทบ dark mode
      400: "#ffda85",
      500: "#453047",
      600: "#ffe3a3", //สีแทบ light monde
      700: "#EFF0F5", //สีเมนู light mode
      800: "#EFF5FF", //สีตัวอักษร menu head
      900: "#332a14",
    },
    more:{
      50: "#4C5066",
    }
  };
  
  // function that reverses the color palette
  function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[400],
                light: tokensDark.primary[300],
                base: tokensDark.more[50],
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
              
                alt: tokensDark.primary[500],
                nav: tokensDark.grey[1200],
              },
            }
          : {
              // palette values for light mode
              primary: {
                ...tokensLight.primary,
                main: tokensDark.grey[50],
                light: tokensDark.grey[100],
                base: tokensDark.grey[100],
               
              },
              blogwhite: {
                ...tokensLight.grey,
                light: tokensDark.grey[300],

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
                default: tokensDark.grey[0],
                alt:  tokensDark.primary[500],
                nav: tokensDark.grey[1100],
                se: tokensDark.grey[0],
              },
            }),
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };