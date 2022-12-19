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
            modalOptions: { isAddAnnouncementModalOpen: true },
        },
    });
    expect(
        screen.getByRole("presentation", { name: "add-announcement-modal" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "عنوان اعلان" })).toHaveValue("");
    expect(
        screen.getByRole("button", { name: "افزودن اعلان جدید" })
    ).toBeEnabled();
    expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
    expect(screen.queryByText("عنوان اعلان نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("announcement can not be added with empty name", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(<Add updateListHandler={updateList} />, {
        wrapperProps: {
            modalOptions: { isAddAnnouncementModalOpen: true },
        },
    });
    const addBtn = screen.getByRole("button", { name: "افزودن اعلان جدید" });
    await user.click(addBtn);
    expect(screen.getByText("عنوان اعلان نمی‌تواند خالی باشد.")).toBeTruthy();
    expect(updateList).toBeCalledTimes(0);
});

test("announcement can add successfully", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(
        <>
            <Snak />
            <Add updateListHandler={updateList} />
        </>,
        {
            wrapperProps: {
                modalOptions: { isAddAnnouncementModalOpen: true },
            },
        }
    );

    const announcementName = screen.getByRole("textbox", { name: "عنوان اعلان" });
    const addBtn = screen.getByRole("button", { name: "افزودن اعلان جدید" });
    await user.type(announcementName, "Announcement 3");
    expect(screen.queryByText("در حال افزودن اعلان...")).not.toBeInTheDocument();
    await user.click(addBtn);
    expect(screen.getByText("در حال افزودن اعلان...")).toBeInTheDocument();
    expect(updateList).toBeCalledTimes(1);
    expect(updateList).toHaveBeenCalledWith({
        announcementId: "test1",
        text: "Announcement 3",
        isQuestion: false,
        responses: [],
        isEnable: true,
        flowNames: null,
    });
    await waitFor(() => {
        expect(screen.queryByText("در حال افزودن اعلان...")).not.toBeInTheDocument();
    });
    expect(screen.getByText("اعلان با موفقیت افزوده شد.")).toBeInTheDocument();
});

test("Announcement name can not be duplicate", async () => {
    const updateList = jest.fn();
    const user = userEvent.setup();
    render(
        <>
            <Snak />
            <Add updateListHandler={updateList} />
        </>,
        {
            wrapperProps: {
                modalOptions: { isAddAnnouncementModalOpen: true },
            },
        }
    );

    const announcementName = screen.getByRole("textbox", { name: "عنوان اعلان" });
    const addBtn = screen.getByRole("button", { name: "افزودن اعلان جدید" });
    await user.type(announcementName, "Announcement 1");
    expect(screen.queryByText("در حال افزودن اعلان...")).not.toBeInTheDocument();
    await user.click(addBtn);
    expect(screen.getByText("در حال افزودن اعلان...")).toBeInTheDocument();
    expect(updateList).toBeCalledTimes(0);
    await waitFor(() => {
        expect(screen.queryByText("در حال افزودن اعلان...")).not.toBeInTheDocument();
    });
    expect(screen.getByText("نام اعلان تکراری می‌باشد.")).toBeInTheDocument();
});

test("announcement modal must close when user click on cancel button", async () => {
    const user = userEvent.setup();
    const updateList = jest.fn();

    render(<Add updateListHandler={updateList} />, {
        wrapperProps: {
            modalOptions: { isAddAnnouncementModalOpen: true },
        },
    });
    const cancelBtn = screen.getByRole("button", { name: "انصراف" });
    await user.click(cancelBtn);
    await waitForElementToBeRemoved(
        screen.queryByRole("presentation", { name: "add-announcement-modal" })
    );
    expect(updateList).toBeCalledTimes(0);
});
