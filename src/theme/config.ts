import { createTheme } from "@mantine/core";
import { appColor } from "./color";

export const theme = createTheme({
  colors: {
    appColor,
  },
  primaryColor: "appColor",
});
