import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Edit from ".";

test("edit modal should be shown correctly", () => {
  render(<Edit onEdit={jest.fn()} title="Action 1" url={"URL 1"} />, {
    wrapperProps: {
      modalOptions: { isEditActionModalOpen: true },
    },
  });
  expect(
    screen.getByRole("presentation", { name: "edit-action-modal" })
  ).toBeInTheDocument();

  expect(screen.getByRole("textbox", { name: "عنوان اکشن" })).toHaveValue(
    "Action 1"
  );
  expect(screen.getByRole("textbox", { name: "URL اکشن" })).toHaveValue(
    "URL 1"
  );
  expect(screen.getByRole("button", { name: "ویرایش اکشن" })).toBeEnabled();
  expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
  expect(screen.queryByText("عنوان اکشن نمی‌تواند خالی باشد.")).toBeFalsy();
  expect(screen.queryByText("URL اکشن نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("action can not be edited with empty name and url", async () => {
  const editHandler = jest.fn();
  const user = userEvent.setup();
  render(<Edit onEdit={editHandler} />, {
    wrapperProps: {
      modalOptions: { isEditActionModalOpen: true },
    },
  });
  const actionName = screen.getByRole("textbox", { name: "عنوان اکشن" });
  const actionURL = screen.getByRole("textbox", { name: "URL اکشن" });
  const addBtn = screen.getByRole("button", { name: "ویرایش اکشن" });
  await user.clear(actionName);
  await user.clear(actionURL);
  await user.click(addBtn);
  expect(screen.getByText("عنوان اکشن نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(screen.getByText("URL اکشن نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(editHandler).toBeCalledTimes(0);

  await user.type(actionName, "     ");
  await user.type(actionURL, "     ");
  await user.click(addBtn);
  expect(screen.getByText("عنوان اکشن نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(screen.getByText("URL اکشن نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(editHandler).toBeCalledTimes(0);
});

test("user can edite action with new values", async () => {
  const editHandler = jest.fn();
  const user = userEvent.setup();
  render(<Edit onEdit={editHandler} />, {
    wrapperProps: {
      modalOptions: { isEditActionModalOpen: true },
    },
  });
  const actionName = screen.getByRole("textbox", { name: "عنوان اکشن" });
  const actionURL = screen.getByRole("textbox", { name: "URL اکشن" });
  const addBtn = screen.getByRole("button", { name: "ویرایش اکشن" });
  await user.type(actionName, "Edit action 1");
  await user.type(actionURL, "Edit url 1");
  await user.click(addBtn);
  expect(editHandler).toBeCalledTimes(1);
  expect(editHandler).toBeCalledWith("Edit action 1", "Edit url 1");
});

test("action modal must close when user click on cancel button", async () => {
  const editHandler = jest.fn();
  const user = userEvent.setup();
  render(<Edit onEdit={editHandler} />, {
    wrapperProps: {
      modalOptions: { isEditActionModalOpen: true },
    },
  });
  const cancelBtn = screen.getByRole("button", { name: "انصراف" });
  await user.click(cancelBtn);
  await waitForElementToBeRemoved(
    screen.queryByRole("presentation", { name: "edit-action-modal" })
  );
  expect(editHandler).toBeCalledTimes(0);
});
