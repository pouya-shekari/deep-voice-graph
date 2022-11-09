import { Component } from "react";
import { PATHS } from "../config/routes.config";
import { Route, Routes } from "react-router-dom";
import * as Page from "../pages";
import { ProtectedRoute, PrivateRoute, PublicRoute } from "./components";

class AppRoute extends Component {
  render() {
    return (
      <Routes>
        {/* PrivateRoutes */}
        <Route
          path={PATHS.HOME}
          element={
            <PrivateRoute component={(props) => <Page.Home {...props} />} />
          }
        />
        <Route
          path={PATHS.CHECKERS}
          element={
            <PrivateRoute component={(props) => <Page.Checkers {...props} />} />
          }
        />
        <Route
          path={PATHS.ACTINOS}
          element={
            <PrivateRoute component={(props) => <Page.Actions {...props} />} />
          }
        />
        <Route
          path={PATHS.QUESTIONS}
          element={
            <PrivateRoute
              component={(props) => <Page.Questions {...props} />}
            />
          }
        />
        <Route
          path={PATHS.ANNOUNCEMENTS}
          element={
            <PrivateRoute
              component={(props) => <Page.Announcements {...props} />}
            />
          }
        />
        <Route
          path={PATHS.FLOWS}
          element={
            <PrivateRoute component={(props) => <Page.Flows {...props} />} />
          }
        />
        <Route
          path={`${PATHS.FLOWS}/:id`}
          element={
            <PrivateRoute component={(props) => <Page.DrawFlow {...props} />} />
          }
        />
        {/* ProtectedRoutes */}
        <Route
          path={PATHS.LOGIN}
          element={
            <ProtectedRoute component={(props) => <Page.Login {...props} />} />
          }
        />
        {/* PublicRoutes */}
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
