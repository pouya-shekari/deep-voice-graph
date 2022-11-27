import React from "react";
import { createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const RTL = (props) => {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
};

const theme = createTheme({
  direction: "rtl",
  palette: {
    cancel: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const Theme = ({ children }) => {
  return (
    <RTL>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </RTL>
  );
};

export default Theme;
