import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@routes/App.routes";
import Theme from "@cmp/UI/Theme";

import "@assets/styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Theme>
      <AppRoutes />
    </Theme>
  </BrowserRouter>
);
