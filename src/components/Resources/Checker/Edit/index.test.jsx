import {
    screen,
    render,
    waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Edit from ".";

test("edit modal should be shown correctly", () => {
    render(<Edit onEdit={jest.fn()} title="Checker 1" url={"URL 1"} />, {
        wrapperProps: {
            modalOptions: { isEditCheckerModalOpen: true },
        },
    });
    expect(
        screen.getByRole("presentation", { name: "edit-checker-modal" })
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: "عنوان چکر" })).toHaveValue(
        "Checker 1"
    );
    expect(screen.getByRole("textbox", { name: "URL چکر" })).toHaveValue(
        "URL 1"
    );
    expect(screen.getByRole("button", { name: "ویرایش چکر" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
    expect(screen.queryByText("عنوان چکر نمی‌تواند خالی باشد.")).toBeFalsy();
    expect(screen.queryByText("URL چکر نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("checker can not be edited with empty name and url", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditCheckerModalOpen: true },
        },
    });
    const checkerName = screen.getByRole("textbox", { name: "عنوان چکر" });
    const checkerURL = screen.getByRole("textbox", { name: "URL چکر" });
    const addBtn = screen.getByRole("button", { name: "ویرایش چکر" });
    await user.clear(checkerName);
    await user.clear(checkerURL);
    await user.click(addBtn);
    expect(screen.getByText("عنوان چکر نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("URL چکر نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(editHandler).toBeCalledTimes(0);

    await user.type(checkerURL, "     ");
    await user.type(checkerURL, "     ");
    await user.click(addBtn);
    expect(screen.getByText("عنوان چکر نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("URL چکر نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(editHandler).toBeCalledTimes(0);
});

test("user can edite checker with new values", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditCheckerModalOpen: true },
        },
    });
    const checkerName = screen.getByRole("textbox", { name: "عنوان چکر" });
    const checkerURL = screen.getByRole("textbox", { name: "URL چکر" });
    const addBtn = screen.getByRole("button", { name: "ویرایش چکر" });
    await user.type(checkerName, "Edit checker 1");
    await user.type(checkerURL, "Edit url 1");
    await user.click(addBtn);
    expect(editHandler).toBeCalledTimes(1);
    expect(editHandler).toBeCalledWith("Edit checker 1", "Edit url 1");
});

test("checker modal must close when user click on cancel button", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditCheckerModalOpen: true },
        },
    });
    const cancelBtn = screen.getByRole("button", { name: "انصراف" });
    await user.click(cancelBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "edit-checker-modal" })
    );
    expect(editHandler).toBeCalledTimes(0);
});
