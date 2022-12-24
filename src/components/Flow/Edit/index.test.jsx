import {
    screen,
    render,
    waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Edit from ".";

test("edit modal should be shown correctly", () => {
    render(<Edit onEdit={jest.fn()} nameEN={'Test'} nameFA={'تست'} description={'فلوچارت تستی'} />, {
        wrapperProps: {
            modalOptions: { isEditFlowModalOpen: true },
        },
    });
    expect(
        screen.getByRole("presentation", { name: "edit-flow-modal" })
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: "عنوان فارسی فلوچارت" })).toHaveValue(
        "تست"
    );
    expect(screen.getByRole("textbox", { name: "عنوان انگلیسی فلوچارت" })).toHaveValue(
        "Test"
    );
    expect(screen.getByRole("textbox", { name: "توضیحات" })).toHaveValue(
        "فلوچارت تستی"
    );
    expect(screen.getByRole("button", { name: "ویرایش فلوچارت" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
    expect(screen.queryByText("عنوان فارسی فلوچارت نمی‌تواند خالی باشد.")).toBeFalsy();
    expect(screen.queryByText("عنوان انگلیسی فلوچارت نمی‌تواند خالی باشد.")).toBeFalsy();
    expect(screen.queryByText("توضیحات فلوچارت نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("flow can not be edited with empty faName and enName and description", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditFlowModalOpen: true },
        },
    });
    const flowFaName = screen.getByRole("textbox", { name: "عنوان فارسی فلوچارت" });
    const flowEnName = screen.getByRole("textbox", { name: "عنوان انگلیسی فلوچارت" });
    const description = screen.getByRole("textbox", { name: "توضیحات" });
    const addBtn = screen.getByRole("button", { name: "ویرایش فلوچارت" });
    await user.clear(flowFaName);
    await user.clear(flowEnName);
    await user.clear(description);
    await user.click(addBtn);
    expect(screen.getByText("عنوان فارسی فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("عنوان انگلیسی فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("توضیحات فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(editHandler).toBeCalledTimes(0);

    await user.type(flowFaName, "     ");
    await user.type(flowEnName, "     ");
    await user.type(description, "     ");
    await user.click(addBtn);
    expect(screen.getByText("عنوان فارسی فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("عنوان انگلیسی فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(screen.getByText("توضیحات فلوچارت نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(editHandler).toBeCalledTimes(0);
});

test("user can edit flow with new values", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditFlowModalOpen: true },
        },
    });
    const flowFaName = screen.getByRole("textbox", { name: "عنوان فارسی فلوچارت" });
    const flowEnName = screen.getByRole("textbox", { name: "عنوان انگلیسی فلوچارت" });
    const description = screen.getByRole("textbox", { name: "توضیحات" });
    const addBtn = screen.getByRole("button", { name: "ویرایش فلوچارت" });
    await user.type(flowFaName, "تست");
    await user.type(flowEnName, "Test");
    await user.type(description, "فلوچارت تستی");
    await user.click(addBtn);
    expect(editHandler).toBeCalledTimes(1);
    expect(editHandler).toBeCalledWith( "Test","تست", "فلوچارت تستی");
});

test("flow modal must close when user click on cancel button", async () => {
    const editHandler = jest.fn();
    const user = userEvent.setup();
    render(<Edit onEdit={editHandler} />, {
        wrapperProps: {
            modalOptions: { isEditFlowModalOpen: true },
        },
    });
    const cancelBtn = screen.getByRole("button", { name: "انصراف" });
    await user.click(cancelBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "edit-flow-modal" })
    );
    expect(editHandler).toBeCalledTimes(0);
});