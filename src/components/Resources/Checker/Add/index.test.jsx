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
            modalOptions: { isAddCheckerModalOpen: true },
        },
    });
    expect(
        screen.getByRole("presentation", { name: "add-checker-modal" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "عنوان چکر" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "URL چکر" })).toHaveValue("");
    expect(
        screen.getByRole("button", { name: "افزودن چکر جدید" })
    ).toBeEnabled();
    expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
    expect(screen.queryByText("عنوان چکر نمی‌تواند خالی باشد.")).toBeFalsy();
    expect(screen.queryByText("URL چکر نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("checker can not be added with empty name and url", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(<Add updateListHandler={updateList} />, {
        wrapperProps: {
            modalOptions: { isAddCheckerModalOpen: true },
        },
    });
    const addBtn = screen.getByRole("button", { name: "افزودن چکر جدید" });
    await user.click(addBtn);
    expect(screen.getByText("عنوان چکر نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("URL چکر نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(updateList).toBeCalledTimes(0);
});

test("checker can add successfully", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(
        <>
            <Snak />
            <Add updateListHandler={updateList} />
        </>,
        {
            wrapperProps: {
                modalOptions: { isAddCheckerModalOpen: true },
            },
        }
    );

    const checkerName = screen.getByRole("textbox", { name: "عنوان چکر" });
    const checkerURL = screen.getByRole("textbox", { name: "URL چکر" });
    const addBtn = screen.getByRole("button", { name: "افزودن چکر جدید" });
    await user.type(checkerName, "Checker 3");
    await user.type(checkerURL, "URL 3");
    expect(screen.queryByText("در حال افزودن چکر...")).not.toBeInTheDocument();
    await user.click(addBtn);
    expect(screen.getByText("در حال افزودن چکر...")).toBeInTheDocument();
    expect(updateList).toBeCalledTimes(1);
    expect(updateList).toHaveBeenCalledWith({
        checkerId: "test1",
        text: "Checker 3",
        url: "URL 3",
        isEnable: true,
        flowNames: null,
    });
    await waitFor(() => {
        expect(screen.queryByText("در حال افزودن چکر...")).not.toBeInTheDocument();
    });
    expect(screen.getByText("چکر با موفقیت افزوده شد.")).toBeInTheDocument();
});

test("checker name can not be duplicate", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(
        <>
            <Snak />
            <Add updateListHandler={updateList} />
        </>,
        {
            wrapperProps: {
                modalOptions: { isAddCheckerModalOpen: true },
            },
        }
    );

    const checkerName = screen.getByRole("textbox", { name: "عنوان چکر" });
    const checkerURL = screen.getByRole("textbox", { name: "URL چکر" });
    const addBtn = screen.getByRole("button", { name: "افزودن چکر جدید" });
    await user.type(checkerName, "Checker 1");
    await user.type(checkerURL, "URL 1");
    expect(screen.queryByText("در حال افزودن چکر...")).not.toBeInTheDocument();
    await user.click(addBtn);
    expect(screen.getByText("در حال افزودن چکر...")).toBeInTheDocument();
    expect(updateList).toBeCalledTimes(0);
    await waitFor(() => {
        expect(screen.queryByText("در حال افزودن چکر...")).not.toBeInTheDocument();
    });
    expect(screen.getByText("نام چکر تکراری می‌باشد.")).toBeInTheDocument();
});

test("checker modal must close when user click on cancel button", async () => {
    const user = userEvent.setup();
    const updateList = jest.fn();

    render(<Add updateListHandler={updateList} />, {
        wrapperProps: {
            modalOptions: { isAddCheckerModalOpen: true },
        },
    });
    const cancelBtn = screen.getByRole("button", { name: "انصراف" });
    await user.click(cancelBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "add-checker-modal" })
    );
    expect(updateList).toBeCalledTimes(0);
});
