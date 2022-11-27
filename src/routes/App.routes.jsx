import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "@context/Auth";
import RequireAuth from "@cmp/HOC/RequireAuth";
import PATHS from "@constants/PATHS";
import LoginPage from "@views/Login";
import Snak from "@cmp/UI/Snak";
import SnakProvider from "@context/Snak";
import UserLayout from "@layouts/User/index.layout";
import ModalProvider from "@context/Modal";
import Dashboard from "@views/Dashboard";
import Announcements from "@views/Announcements";
import Questions from "@views/Questions";
import Checkers from "@views/Checkers";
import Actions from "@views/Actions";
import Graph from "@views/Graph";
const AppRoutes = () => {
  return (
    <AuthProvider>
      <SnakProvider>
        <ModalProvider>
          <Snak />
          <Routes>
            <Route path={PATHS.LOGIN} element={<LoginPage />} />
            <Route element={<UserLayout />}>
              <Route
                path={PATHS.HOME}
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path={PATHS.ANNOUNCEMENTS}
                element={
                  <RequireAuth>
                    <Announcements />
                  </RequireAuth>
                }
              />
              <Route
                path={PATHS.QUESTIONS}
                element={
                  <RequireAuth>
                    <Questions />
                  </RequireAuth>
                }
              />
              <Route
                path={PATHS.CHECKERS}
                element={
                  <RequireAuth>
                    <Checkers />
                  </RequireAuth>
                }
              />
              <Route
                path={PATHS.ACTIONS}
                element={
                  <RequireAuth>
                    <Actions />
                  </RequireAuth>
                }
              />
              <Route
                path={`${PATHS.FLOWS}/:id`}
                element={
                  <RequireAuth>
                    <Graph />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path={"*"}
              element={
                <RequireAuth>
                  <h1>Not Found</h1>
                </RequireAuth>
              }
            />
          </Routes>
        </ModalProvider>
      </SnakProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
