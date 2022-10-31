import { Component } from "react";
import { PATHS } from "../config/routes.config";
import { Route, Routes } from "react-router-dom";
import * as Page from "../pages";
import { ProtectedRoute, PrivateRoute, PublicRoute } from "./components";

class AppRoute extends Component {
  render() {
    return (
      <Routes>
          <Route
              path={PATHS.HOME}
              element={
                  <PrivateRoute component={(props) => <Page.Home {...props} />} />
              }
          />
          <Route
              path={PATHS.LOGIN}
              element={
                  <ProtectedRoute component={(props) => <Page.Login {...props} />} />
              }
          />
          <Route
              path={PATHS.NOT_FOUND}
              element={
                  <PublicRoute component={(props) => <Page.NotFound {...props} />} />
              }
          />
      </Routes>
    );
  }
}

export { AppRoute };
