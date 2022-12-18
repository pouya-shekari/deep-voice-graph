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
      modalOptions: { isAddActionModalOpen: true },
    },
  });
  expect(
    screen.getByRole("presentation", { name: "add-action-modal" })
  ).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "عنوان اکشن" })).toHaveValue("");
  expect(screen.getByRole("textbox", { name: "URL اکشن" })).toHaveValue("");
  expect(
    screen.getByRole("button", { name: "افزودن اکشن جدید" })
  ).toBeEnabled();
  expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
  expect(screen.queryByText("عنوان اکشن نمی‌تواند خالی باشد.")).toBeFalsy();
  expect(screen.queryByText("URL اکشن نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("action can not be added with empty name and url", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(<Add updateListHandler={updateList} />, {
    wrapperProps: {
      modalOptions: { isAddActionModalOpen: true },
    },
  });
  const addBtn = screen.getByRole("button", { name: "افزودن اکشن جدید" });
  await user.click(addBtn);
  expect(screen.getByText("عنوان اکشن نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(screen.getByText("URL اکشن نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(updateList).toBeCalledTimes(0);
});

test("action can add succesfully", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <Add updateListHandler={updateList} />
    </>,
    {
      wrapperProps: {
        modalOptions: { isAddActionModalOpen: true },
      },
    }
  );

  const actionName = screen.getByRole("textbox", { name: "عنوان اکشن" });
  const actionURL = screen.getByRole("textbox", { name: "URL اکشن" });
  const addBtn = screen.getByRole("button", { name: "افزودن اکشن جدید" });
  await user.type(actionName, "Action 3");
  await user.type(actionURL, "URL 3");
  expect(screen.queryByText("در حال افزودن اکشن...")).not.toBeInTheDocument();
  await user.click(addBtn);
  expect(screen.getByText("در حال افزودن اکشن...")).toBeInTheDocument();
  expect(updateList).toBeCalledTimes(1);
  expect(updateList).toHaveBeenCalledWith({
    actionId: "test1",
    text: "Action 3",
    url: "URL 3",
    isEnable: true,
    flowNames: null,
  });
  await waitFor(() => {
    expect(screen.queryByText("در حال افزودن اکشن...")).not.toBeInTheDocument();
  });
  expect(screen.getByText("اکشن با موفقیت افزوده شد.")).toBeInTheDocument();
});

test("action name can not be duplicate", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <Add updateListHandler={updateList} />
    </>,
    {
      wrapperProps: {
        modalOptions: { isAddActionModalOpen: true },
      },
    }
  );

  const actionName = screen.getByRole("textbox", { name: "عنوان اکشن" });
  const actionURL = screen.getByRole("textbox", { name: "URL اکشن" });
  const addBtn = screen.getByRole("button", { name: "افزودن اکشن جدید" });
  await user.type(actionName, "Action 1");
  await user.type(actionURL, "URL 1");
  expect(screen.queryByText("در حال افزودن اکشن...")).not.toBeInTheDocument();
  await user.click(addBtn);
  expect(screen.getByText("در حال افزودن اکشن...")).toBeInTheDocument();
  expect(updateList).toBeCalledTimes(0);
  await waitFor(() => {
    expect(screen.queryByText("در حال افزودن اکشن...")).not.toBeInTheDocument();
  });
  expect(screen.getByText("نام اکشن تکراری می‌باشد.")).toBeInTheDocument();
});

test("action modal must close when user click on cancel button", async () => {
  const user = userEvent.setup();
  const updateList = jest.fn();

  render(<Add updateListHandler={updateList} />, {
    wrapperProps: {
      modalOptions: { isAddActionModalOpen: true },
    },
  });
  const cancelBtn = screen.getByRole("button", { name: "انصراف" });
  await user.click(cancelBtn);
  await waitForElementToBeRemoved(
    screen.queryByRole("presentation", { name: "add-action-modal" })
  );
  expect(updateList).toBeCalledTimes(0);
});
