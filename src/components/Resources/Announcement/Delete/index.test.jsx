import {
    screen,
    render,
    waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Delete from ".";

test("delete modal should be shown correctly", () => {
    render(<Delete onDelete={jest.fn()} />, {
        wrapperProps: {
            modalOptions: { isDeleteAnnouncementModalOpen: true },
        },
    });
    expect(
        screen.getByRole("presentation", { name: "delete-announcement-modal" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "حذف اعلان" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
});

test("delete handler must be called when click on delete button", async () => {
    const user = userEvent.setup();
    const deleteHandler = jest.fn();
    render(<Delete onDelete={deleteHandler} />, {
        wrapperProps: {
            modalOptions: { isDeleteAnnouncementModalOpen: true },
        },
    });
    await user.click(screen.getByRole("button", { name: "حذف اعلان" }));
    expect(deleteHandler).toBeCalledTimes(1);
});

test("close delete modal when user click on cancel btn", async () => {
    const user = userEvent.setup();
    const deleteHandler = jest.fn();
    render(<Delete onDelete={deleteHandler} />, {
        wrapperProps: {
            modalOptions: { isDeleteAnnouncementModalOpen: true },
        },
    });
    await user.click(screen.getByRole("button", { name: "انصراف" }));
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "delete-announcement-modal" })
    );
    expect(deleteHandler).toBeCalledTimes(0);
});
