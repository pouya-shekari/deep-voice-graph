import BASEURL from "@constants/BASEURL";
import {
    screen,
    render,
    waitForElementToBeRemoved,
    fireEvent,
    waitFor
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
        screen.getByRole("table", { name: "flow table" })
    ).toBeInTheDocument();
});

test("data table show no data when flow is empty", async () => {
    server.use(
        rest.get(`${BASEURL}/flow/list?applicationId=5`, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json([]));
        })
    );
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <List />
        </SWRConfig>
    );
    await waitForElementToBeRemoved(screen.queryByRole("progressbar"));
    expect(screen.getByRole("table", { name: "flow table" })).toHaveTextContent(
        /داده‌ای یافت نشد/i
    );
});

test("data table has 3 rows when has 2 action", () => {
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
        "شناسه فلوچارت"
    );
    expect(screen.getAllByRole("cell")[0]).toHaveTextContent("131");
});

test("error snack should be shown when request failed", async () => {
    server.use(
        rest.get(`${BASEURL}/flow/list?applicationId=5`, (req, res, ctx) => res(ctx.status(400)))
    );
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <List />
        </SWRConfig>
    );
    await waitForElementToBeRemoved(screen.queryByRole("progressbar"));
    expect(screen.getAllByRole("alert", { name: "flow-error" })).toHaveLength(
        1
    );
    expect(screen.getByRole("alert", { name: "flow-error" })).toHaveTextContent(
        /دریافت اطلاعات با خطا مواجه شد!/i
    );
});

test("add flow button should be enable", () => {
    render(<List />);
    expect(
        screen.getByRole("button", { name: "افزودن فلوچارت جدید" })
    ).toBeEnabled();
});

test("all flows should have enable see flowchart and enable/disable button", () => {
    render(<List />);
    expect(screen.getAllByRole("button", { name: "مشاهده فلوچارت" })).toHaveLength(
        screen.getAllByRole("row").length - 1
    );
    expect(screen.getAllByRole("button", { name: "غیرفعال سازی" })).toHaveLength(
        screen.getAllByRole("row").length - 1
    );
    screen.getAllByRole("button", { name: "مشاهده فلوچارت" }).forEach((el) => {
        expect(el).toBeEnabled();
    });
    screen.getAllByRole("button", { name: "غیرفعال سازی" }).forEach((el) => {
        expect(el).toBeEnabled();
    });
});

test("add flow modal is shown when add flow button clicked", async () => {
    const user = userEvent.setup();
    render(<List />);
    const addBtn = screen.getByRole("button", { name: "افزودن فلوچارت جدید" });
    await user.click(addBtn);
    expect(
        screen.getByRole("presentation", { name: /add-flow-modal/i })
    ).toBeInTheDocument();
});

test("edit flow modal is shown when each flow table row clicked", async () => {
    const user = userEvent.setup();
    render(<List />);
    const eventNode = screen.getAllByRole("cell")[0]
    await user.click(eventNode)
    expect(
        screen.getByRole("presentation", { name: /edit-flow-modal/i })
    ).toBeInTheDocument();
});

test("duplicate flow modal is shown when duplicate flow button clicked", async () => {
    const user = userEvent.setup();
    render(<List />);
    const eventNode = screen.getAllByRole("cell")[0]
    expect(eventNode).toHaveTextContent("131");
    await waitFor(()=> fireEvent.contextMenu(eventNode))
    const addBtn = screen.getByRole("menuitem", { name: "کپی از فلوچارت" });
    await user.click(addBtn)
    expect(
        screen.getByRole("presentation", { name: /copy-flow-modal/i })
    ).toBeInTheDocument();
});
