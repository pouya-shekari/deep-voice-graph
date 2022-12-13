import { screen, render, waitFor } from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import * as router from "react-router";

import LoginForm from ".";
import Snak from "@cmp/UI/Snak";
import { server } from "../../mock/server";
import { rest } from "msw";
import BASEURL from "@constants/BASEURL";

test("login form is show in the page", () => {
  render(<LoginForm />);
  expect(screen.getByRole("form", { name: "" })).toBeInTheDocument();
});

test("form should render with empty values & required", async () => {
  render(<LoginForm />);
  const username = screen.getByRole("textbox", { name: /نام کاربری/i });
  const password = screen.getByLabelText(/گذرواژه/i);
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(username).toHaveValue("");
  expect(password).toHaveValue("");
  expect(username).toHaveAttribute("required");
  expect(password).toHaveAttribute("required");
});

test("form has submit button & it is enable", async () => {
  render(<LoginForm />);
  const submitBtn = screen.getByRole("button", { name: /ورود/i });
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn).toBeEnabled();
});

test("inputs change correctly", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  const username = screen.getByRole("textbox", { name: /نام کاربری/i });
  const password = screen.getByLabelText(/گذرواژه/i);

  await user.type(username, "Mohamad");
  expect(username).toHaveValue("Mohamad");

  await user.type(password, "1234");
  expect(password).toHaveValue("1234");
});

test("form should not send with empty inputs", async () => {
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <LoginForm />
    </>
  );
  const submitBtn = screen.getByRole("button", { name: /ورود/i });
  await user.click(submitBtn);
  expect(
    screen.getByRole("presentation", { name: "snakbar" })
  ).toHaveTextContent("نام کاربری و گذرواژه الزامی می‌باشد.");
});

test("form should not send with empty username", async () => {
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <LoginForm />
    </>
  );
  const password = screen.getByLabelText(/گذرواژه/i);
  const submitBtn = screen.getByRole("button", { name: /ورود/i });

  await user.type(password, "1234");
  await user.click(submitBtn);
  expect(
    screen.getByRole("presentation", { name: "snakbar" })
  ).toHaveTextContent("نام کاربری و گذرواژه الزامی می‌باشد.");
});

test("form should not send with empty password", async () => {
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <LoginForm />
    </>
  );
  const username = screen.getByRole("textbox", { name: /نام کاربری/i });
  const submitBtn = screen.getByRole("button", { name: /ورود/i });

  await user.type(username, "Mohamad");
  await user.click(submitBtn);
  expect(
    screen.getByRole("presentation", { name: "snakbar" })
  ).toHaveTextContent("نام کاربری و گذرواژه الزامی می‌باشد.");
});

test("form submit and user can login with correct username and password", async () => {
  const user = userEvent.setup();
  const navigate = jest.fn();
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  render(
    <>
      <Snak />
      <LoginForm />
    </>
  );
  const username = screen.getByRole("textbox", { name: /نام کاربری/i });
  const password = screen.getByLabelText(/گذرواژه/i);
  const submitBtn = screen.getByRole("button", { name: /ورود/i });

  await user.type(username, "Mohamad");
  await user.type(password, "1234");
  await user.click(submitBtn);
  expect(navigate).toBeCalledTimes(1);
});

test("user can not login with wrong username or password", async () => {
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <LoginForm />
    </>
  );
  const username = screen.getByRole("textbox", { name: /نام کاربری/i });
  const password = screen.getByLabelText(/گذرواژه/i);
  const submitBtn = screen.getByRole("button", { name: /ورود/i });

  await user.type(username, "Reza");
  await user.type(password, "1234");
  await user.click(submitBtn);

  await screen.findByRole("presentation", { name: "snakbar" });
  expect(
    screen.getByRole("presentation", { name: "snakbar" })
  ).toHaveTextContent("نام کاربری یا گذرواژه معتبر نمی‌باشد.");
});
