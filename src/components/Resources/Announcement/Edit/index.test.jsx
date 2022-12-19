import {
    screen,
    render,
    waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Edit from ".";

test("edit modal should be shown correctly", () => {
    render(<Edit onEdit={jest.fn()} title="Announcement 1" />, {
        wrapperProps: {
            modalOptions: { isEditAnnouncementModalOpen: true },
        },
    });
    expect(
        screen.getByRole("presentation", { name: "edit-announcement-modal" })
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: "عنوان اعلان" })).toHaveValue(
        "Announcement 1"
    );

    expect(screen.getByRole("button", { name: "ویرایش اعلان" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
    expect(screen.queryByText("عنوان اعلان نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("Announcement can not be edited with empty name", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditAnnouncementModalOpen: true },
        },
    });
    const announcementName = screen.getByRole("textbox", { name: "عنوان اعلان" });
    const addBtn = screen.getByRole("button", { name: "ویرایش اعلان" });
    await user.clear(announcementName);
    await user.click(addBtn);
    expect(screen.getByText("عنوان اعلان نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(editHandler).toBeCalledTimes(0);

    await user.type(announcementName, "     ");
    await user.click(addBtn);
    expect(screen.getByText("عنوان اعلان نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(editHandler).toBeCalledTimes(0);
});

test("user can edit announcement with new values", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditAnnouncementModalOpen: true },
        },
    });
    const announcementName = screen.getByRole("textbox", { name: "عنوان اعلان" });
    const addBtn = screen.getByRole("button", { name: "ویرایش اعلان" });
    await user.type(announcementName, "Edit announcement 1");
    await user.click(addBtn);
    expect(editHandler).toBeCalledTimes(1);
    expect(editHandler).toBeCalledWith("Edit announcement 1");
});

test("announcement modal must close when user click on cancel button", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditAnnouncementModalOpen: true },
        },
    });
    const cancelBtn = screen.getByRole("button", { name: "انصراف" });
    await user.click(cancelBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "edit-announcement-modal" })
    );
    expect(editHandler).toBeCalledTimes(0);
});
