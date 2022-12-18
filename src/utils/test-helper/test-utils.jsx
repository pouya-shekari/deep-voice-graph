import React from "react";
import { render } from "@testing-library/react";
import Theme from "@cmp/UI/Theme";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "@context/Auth";
import SnakProvider from "@context/Snak";
import ModalProvider from "@context/Modal";

const AllTheProviders = ({ children, options }) => {
  return (
    <BrowserRouter>
      <Theme>
        <AuthProvider>
          <SnakProvider>
            <ModalProvider defaultValues={{ ...options?.modalOptions }}>
              {children}
            </ModalProvider>
          </SnakProvider>
        </AuthProvider>
      </Theme>
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: () => (
      <AllTheProviders options={{ ...options?.wrapperProps }} children={ui} />
    ),
    ...options,
  });

export * from "@testing-library/react";

export { customRender as render };
