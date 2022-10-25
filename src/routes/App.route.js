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
            <PublicRoute component={(props) => <Page.Home {...props} />} />
          }
        />
      </Routes>
    );
  }
}

export { AppRoute };
