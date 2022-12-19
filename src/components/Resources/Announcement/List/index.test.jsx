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
        screen.getByRole("table", { name: "announcements table" })
    ).toBeInTheDocument();
});

test("data table show no data when announcements is empty", async () => {
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
        screen.getByRole("table", { name: "announcements table" })
    ).toHaveTextContent(/داده‌ای یافت نشد/i);
});

test("data table has 3 rows when has 2 announcement", () => {
    render(<List />);
    expect(screen.getAllByRole("row")).toHaveLength(3);
});

test("data table should have 5 columns", () => {
    render(<List />);
    expect(screen.getAllByRole("columnheader")).toHaveLength(5);
});

test("data table should load data correct", () => {
    render(<List />);
    expect(screen.getAllByRole("columnheader")[0]).toHaveTextContent(
        "شناسه اعلان"
    );
    expect(screen.getAllByRole("cell")[0]).toHaveTextContent("153");
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
    expect(screen.getAllByRole("alert", { name: "announcement-error" })).toHaveLength(
        1
    );
    expect(
        screen.getByRole("alert", { name: "announcement-error" })
    ).toHaveTextContent(/دریافت اطلاعات با خطا مواجه شد!/i);
});

test("add announcement button should be enable", () => {
    render(<List />);
    expect(
        screen.getByRole("button", { name: "افزودن اعلان جدید" })
    ).toBeEnabled();
});

test("all announcements should have enable delete and edit button", () => {
    render(<List />);
    expect(screen.getAllByRole("button", { name: "ویرایش اعلان" })).toHaveLength(
        2
    );
    expect(screen.getAllByRole("button", { name: "حذف اعلان" })).toHaveLength(2);
    screen.getAllByRole("button", { name: "ویرایش اعلان" }).forEach((el) => {
        expect(el).toBeEnabled();
    });
    screen.getAllByRole("button", { name: "حذف اعلان" }).forEach((el) => {
        expect(el).toBeEnabled();
    });
});

test("add announcement modal is shown when add announcement button clicked", async () => {
    const user = userEvent.setup();
    render(<List />);
    const addBtn = screen.getByRole("button", { name: "افزودن اعلان جدید" });
    await user.click(addBtn);
    expect(
        screen.getByRole("presentation", { name: /add-announcement-modal/i })
    ).toBeInTheDocument();
});
