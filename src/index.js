import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoute } from "./routes/App.route";
//import { Provider } from "react-redux";
//import store from "./redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "./assets/styles/global.css";
import history from "./services/history.service";
import { unstable_HistoryRouter as BrowserRouter } from "react-router-dom";
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
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*<Provider store={store}>*/}
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <BrowserRouter history={history}>
      <RTL>
        <ThemeProvider theme={theme}>
          <AppRoute />
        </ThemeProvider>
      </RTL>
    </BrowserRouter>
  </React.StrictMode>
);
