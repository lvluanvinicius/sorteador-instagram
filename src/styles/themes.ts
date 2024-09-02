// 1. import `extendTheme` function
import {
  extendTheme,
  type ThemeConfig,
  type Theme,
  DeepPartial,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

// 3. extend the theme
const customTheme = extendTheme({
  config,
  colors: {
    primary: {
      default: "#001020",
      750: "#001020",
    },
    secondary: {
      default: "#091622",
      500: "#050b11",
      100: "#08141f",
    },
    white: "#fff",
    gradients: {
      instagram: "linear-gradient(to right, #833AB4, #FD1D1D)",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "primary.default")(props),
        color: mode("primary.default", "white")(props),
      },
    }),
  },
} as DeepPartial<Theme>);

export default customTheme;
