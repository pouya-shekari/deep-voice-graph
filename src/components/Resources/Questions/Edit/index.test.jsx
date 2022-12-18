import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Edit from ".";

test("edit modal should be shown correctly", () => {
  render(<Edit onEdit={jest.fn()} title="Question 1" />, {
    wrapperProps: {
      modalOptions: { isEditQuestionModalOpen: true },
    },
  });
  expect(
    screen.getByRole("presentation", { name: "edit-question-modal" })
  ).toBeInTheDocument();

  expect(screen.getByRole("textbox", { name: "عنوان سوال" })).toHaveValue(
    "Question 1"
  );

  expect(screen.getByRole("button", { name: "ویرایش سوال" })).toBeEnabled();
  expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
  expect(screen.queryByText("عنوان سوال نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("question can not be edited with empty name", async () => {
  const editHandler = jest.fn();
  const user = userEvent.setup();
  render(<Edit onEdit={editHandler} />, {
    wrapperProps: {
      modalOptions: { isEditQuestionModalOpen: true },
    },
  });
  const questionName = screen.getByRole("textbox", { name: "عنوان سوال" });
  const addBtn = screen.getByRole("button", { name: "ویرایش سوال" });
  await user.clear(questionName);
  await user.click(addBtn);
  expect(screen.getByText("عنوان سوال نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(editHandler).toBeCalledTimes(0);

  await user.type(questionName, "     ");
  await user.click(addBtn);
  expect(screen.getByText("عنوان سوال نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(editHandler).toBeCalledTimes(0);
});

test("user can edite question with new values", async () => {
  const editHandler = jest.fn();
  const user = userEvent.setup();
  render(<Edit onEdit={editHandler} />, {
    wrapperProps: {
      modalOptions: { isEditQuestionModalOpen: true },
    },
  });
  const questionName = screen.getByRole("textbox", { name: "عنوان سوال" });
  const addBtn = screen.getByRole("button", { name: "ویرایش سوال" });
  await user.type(questionName, "Edit question 1");
  await user.click(addBtn);
  expect(editHandler).toBeCalledTimes(1);
  expect(editHandler).toBeCalledWith("Edit question 1");
});

test("action modal must close when user click on cancel button", async () => {
  const editHandler = jest.fn();
  const user = userEvent.setup();
  render(<Edit onEdit={editHandler} />, {
    wrapperProps: {
      modalOptions: { isEditQuestionModalOpen: true },
    },
  });
  const cancelBtn = screen.getByRole("button", { name: "انصراف" });
  await user.click(cancelBtn);
  await waitForElementToBeRemoved(
    screen.queryByRole("presentation", { name: "edit-question-modal" })
  );
  expect(editHandler).toBeCalledTimes(0);
});
