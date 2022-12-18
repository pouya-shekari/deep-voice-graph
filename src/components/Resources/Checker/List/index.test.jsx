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
        screen.getByRole("table", { name: "checker table" })
    ).toBeInTheDocument();
});

test("data table show no data when checker is empty", async () => {
    server.use(
        rest.get(`${BASEURL}/checker/list`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json([]));
        })
    );
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <List />
        </SWRConfig>
    );
    await waitForElementToBeRemoved(screen.queryByRole("progressbar"));
    expect(screen.getByRole("table", { name: "checker table" })).toHaveTextContent(
        /داده‌ای یافت نشد/i
    );
});

test("data table has 3 rows when has 2 checker", () => {
    render(<List />);
    expect(screen.getAllByRole("row")).toHaveLength(3);
});

test("data table should have 6 columns", () => {
    render(<List />);
    expect(screen.getAllByRole("columnheader")).toHaveLength(6);
});

test("data table should load data correct", () => {
    render(<List />);
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent(
        "شناسه چکر"
    );
    expect(screen.getAllByRole("cell")[0]).toHaveTextContent("149");
});

test("error snack should be shown when request failed", async () => {
    server.use(
        rest.get(`${BASEURL}/checker/list`, (req, res, ctx) => res(ctx.status(400)))
    );
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <List />
        </SWRConfig>
    );
    await waitForElementToBeRemoved(screen.queryByRole("progressbar"));
    expect(screen.getAllByRole("alert", { name: "checker-error" })).toHaveLength(
        1
    );
    expect(screen.getByRole("alert", { name: "checker-error" })).toHaveTextContent(
        /دریافت اطلاعات با خطا مواجه شد!/i
    );
});

test("add checker button should be enable", () => {
    render(<List />);
    expect(
        screen.getByRole("button", { name: "افزودن چکر جدید" })
    ).toBeEnabled();
});

test("all checkers should have enable delete and edit button", () => {
    render(<List />);
    expect(screen.getAllByRole("button", { name: "ویرایش چکر" })).toHaveLength(
        screen.getAllByRole("row").length - 1
    );
    expect(screen.getAllByRole("button", { name: "حذف چکر" })).toHaveLength(
        screen.getAllByRole("row").length - 1
    );
    screen.getAllByRole("button", { name: "ویرایش چکر" }).forEach((el) => {
        expect(el).toBeEnabled();
    });
    screen.getAllByRole("button", { name: "حذف چکر" }).forEach((el) => {
        expect(el).toBeEnabled();
    });
});

test("add checker modal is shown when add checker button clicked", async () => {
    const user = userEvent.setup();
    render(<List />);
    const addBtn = screen.getByRole("button", { name: "افزودن چکر جدید" });
    await user.click(addBtn);
    expect(
        screen.getByRole("presentation", { name: /add-checker-modal/i })
    ).toBeInTheDocument();
});
