import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Add from ".";
import Snak from "@cmp/UI/Snak";

test("modal should render in default state correctly", () => {
    render(<Add updateListHandler={jest.fn()} />, {
        wrapperProps: {
            modalOptions: { isAddFlowModalOpen: true },
        },
    });
    expect(
        screen.getByRole("presentation", { name: "add-flow-modal" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "عنوان فارسی فلوچارت" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "عنوان انگلیسی فلوچارت" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "توضیحات" })).toHaveValue("");
    expect(
        screen.getByRole("button", { name: "افزودن فلوچارت جدید" })
    ).toBeEnabled();
    expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
    expect(screen.queryByText("عنوان فارسی فلوچارت نمی‌تواند خالی باشد.")).toBeFalsy();
    expect(screen.queryByText("عنوان انگلیسی فلوچارت نمی‌تواند خالی باشد.")).toBeFalsy();
    expect(screen.queryByText("توضیحات فلوچارت نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("flow can not be added with empty faName and enName and description", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(<Add updateListHandler={updateList} />, {
        wrapperProps: {
            modalOptions: { isAddFlowModalOpen: true },
        },
    });
    const addBtn = screen.getByRole("button", { name: "افزودن فلوچارت جدید" });
    await user.click(addBtn);
    expect(screen.getByText("عنوان فارسی فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("عنوان انگلیسی فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("توضیحات فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(updateList).toBeCalledTimes(0);
});

test("flow can add successfully", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(
        <>
            <Snak />
            <Add updateListHandler={updateList} />
        </>,
        {
            wrapperProps: {
                modalOptions: { isAddFlowModalOpen: true },
            },
        }
    );

    const flowFaName = screen.getByRole("textbox", { name: "عنوان فارسی فلوچارت" });
    const flowEnName = screen.getByRole("textbox", { name: "عنوان انگلیسی فلوچارت" });
    const flowDescription = screen.getByRole("textbox", { name: "توضیحات" });
    const addBtn = screen.getByRole("button", { name: "افزودن فلوچارت جدید" });
    await user.type(flowFaName, "تست");
    await user.type(flowEnName, "Test");
    await user.type(flowDescription, "فلوچارت تستی");
    expect(screen.queryByText("در حال افزودن فلوچارت...")).not.toBeInTheDocument();
    await user.click(addBtn);
    expect(screen.getByText("در حال افزودن فلوچارت...")).toBeInTheDocument();
    expect(updateList).toBeCalledTimes(1);
    expect(updateList).toHaveBeenCalledWith({
        flowId: 133,
        nameEN: 'Test',
        nameFA: 'تست',
        description: 'فلوچارت تستی',
        enable: true
    });
    await waitFor(() => {
        expect(screen.queryByText("در حال افزودن فلوچارت...")).not.toBeInTheDocument();
    });
    expect(screen.getByText("فلوچارت با موفقیت افزوده شد.")).toBeInTheDocument();
});

test("flow name can not be duplicate", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(
        <>
            <Snak />
            <Add updateListHandler={updateList} />
        </>,
        {
            wrapperProps: {
                modalOptions: { isAddFlowModalOpen: true },
            },
        }
    );

    const flowFaName = screen.getByRole("textbox", { name: "عنوان فارسی فلوچارت" });
    const flowEnName = screen.getByRole("textbox", { name: "عنوان انگلیسی فلوچارت" });
    const flowDescription = screen.getByRole("textbox", { name: "توضیحات" });
    const addBtn = screen.getByRole("button", { name: "افزودن فلوچارت جدید" });
    await user.type(flowFaName, "کندی");
    await user.type(flowEnName, "Slow");
    await user.type(flowDescription, "فلوچارت تستی");
    expect(screen.queryByText("در حال افزودن فلوچارت...")).not.toBeInTheDocument();
    await user.click(addBtn);
    expect(screen.getByText("در حال افزودن فلوچارت...")).toBeInTheDocument();
    expect(updateList).toBeCalledTimes(0);
    await waitFor(() => {
        expect(screen.queryByText("در حال افزودن فلوچارت...")).not.toBeInTheDocument();
    });
    expect(screen.getByText("نام فلوچارت تکراری می‌باشد.")).toBeInTheDocument();
});

test("flow modal must close when user click on cancel button", async () => {
    const user = userEvent.setup();
    const updateList = jest.fn();

    render(<Add updateListHandler={updateList} />, {
        wrapperProps: {
            modalOptions: { isAddFlowModalOpen: true },
        },
    });
    const cancelBtn = screen.getByRole("button", { name: "انصراف" });
    await user.click(cancelBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "add-flow-modal" })
    );
    expect(updateList).toBeCalledTimes(0);
});
