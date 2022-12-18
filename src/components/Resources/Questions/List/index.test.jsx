import BASEURL from "@constants/BASEURL";
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { server } from "src/mock/server";
import { SWRConfig } from "swr";
import List from ".";

test("data table is shown after progressbar", async () => {
  render(<List />);
  await waitForElementToBeRemoved(screen.queryByRole("progressbar"));
  expect(
    screen.getByRole("table", { name: "questions table" })
  ).toBeInTheDocument();
});

test("data table show no data when action is empty", async () => {
  server.use(
    rest.get(`${BASEURL}/announcement/list`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <List />
    </SWRConfig>
  );
  await waitForElementToBeRemoved(screen.queryByRole("progressbar"));
  expect(
    screen.getByRole("table", { name: "questions table" })
  ).toHaveTextContent(/داده‌ای یافت نشد/i);
});

test("data table has 2 rows when has 2 question", () => {
  render(<List />);
  expect(screen.getAllByRole("row", { name: "main" })).toHaveLength(2);
});

test("data table should have 6 columns", () => {
  render(<List />);
  expect(screen.getAllByRole("columnheader")).toHaveLength(6);
});

test("data table should load data correct", () => {
  render(<List />);
  expect(screen.getAllByRole("columnheader")[1]).toHaveTextContent(
    "شناسه سوال"
  );
  expect(screen.getAllByRole("cell")[1]).toHaveTextContent("153");
});

test("error snack should be shown when request failed", async () => {
  server.use(
    rest.get(`${BASEURL}/announcement/list`, (req, res, ctx) =>
      res(ctx.status(400))
    )
  );
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <List />
    </SWRConfig>
  );
  await waitForElementToBeRemoved(screen.queryByRole("progressbar"));
  expect(screen.getAllByRole("alert", { name: "question-error" })).toHaveLength(
    1
  );
  expect(
    screen.getByRole("alert", { name: "question-error" })
  ).toHaveTextContent(/دریافت اطلاعات با خطا مواجه شد!/i);
});

test("add question button should be anable", () => {
  render(<List />);
  expect(
    screen.getByRole("button", { name: "افزودن سوال جدید" })
  ).toBeEnabled();
});

test("all questions should have enable delete and edit button", () => {
  render(<List />);
  expect(screen.getAllByRole("button", { name: "ویرایش سوال" })).toHaveLength(
    2
  );
  expect(screen.getAllByRole("button", { name: "حذف سوال" })).toHaveLength(2);
  screen.getAllByRole("button", { name: "ویرایش سوال" }).forEach((el) => {
    expect(el).toBeEnabled();
  });
  screen.getAllByRole("button", { name: "حذف سوال" }).forEach((el) => {
    expect(el).toBeEnabled();
  });
});

test("add question modal is shown when add question button clicked", async () => {
  const user = userEvent.setup();
  render(<List />);
  const addBtn = screen.getByRole("button", { name: "افزودن سوال جدید" });
  await user.click(addBtn);
  expect(
    screen.getByRole("presentation", { name: /add-question-modal/i })
  ).toBeInTheDocument();
});
