import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@utils/test-helper/test-utils";
import userEvent from "@testing-library/user-event";
import Add from ".";
import Snak from "@cmp/UI/Snak";

test("modal should render in default state correctly", () => {
  render(<Add updateListHandler={jest.fn()} />, {
    wrapperProps: {
      modalOptions: { isAddQuestionModalOpen: true },
    },
  });
  expect(
    screen.getByRole("presentation", { name: "add-question-modal" })
  ).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: "عنوان سوال" })).toHaveValue("");
  expect(screen.queryAllByRole("textbox", { name: "عنوان پاسخ" })).toHaveLength(
    0
  );
  expect(
    screen.getByRole("button", { name: "افزودن سوال جدید" })
  ).toBeEnabled();
  expect(
    screen.getByRole("button", { name: "تعریف پاسخ برای سوال" })
  ).toBeEnabled();
  expect(screen.getByRole("button", { name: "انصراف" })).toBeEnabled();
  expect(screen.queryByText("عنوان سوال نمی‌تواند خالی باشد.")).toBeFalsy();
});

test("question title can not be empty", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(<Add updateListHandler={updateList} />, {
    wrapperProps: {
      modalOptions: { isAddQuestionModalOpen: true },
    },
  });
  const addQuestionBtn = screen.getByRole("button", {
    name: "افزودن سوال جدید",
  });
  await user.click(addQuestionBtn);
  expect(screen.getByText("عنوان سوال نمی‌تواند خالی باشد.")).toBeTruthy();
  expect(updateList).toBeCalledTimes(0);
});

test("each time user click on add answer new empty textfield added", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(<Add updateListHandler={updateList} />, {
    wrapperProps: {
      modalOptions: { isAddQuestionModalOpen: true },
    },
  });
  const addAnswerBtn = screen.getByRole("button", {
    name: "تعریف پاسخ برای سوال",
  });
  await user.click(addAnswerBtn);
  await user.click(addAnswerBtn);
  expect(screen.getAllByRole("textbox", { name: "عنوان پاسخ" })).toHaveLength(
    2
  );
  screen
    .getAllByRole("textbox", { name: "عنوان پاسخ" })
    .forEach((el) => expect(el).toHaveValue(""));
});

test("each answer should have delete button", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(<Add updateListHandler={updateList} />, {
    wrapperProps: {
      modalOptions: { isAddQuestionModalOpen: true },
    },
  });
  const addAnswerBtn = screen.getByRole("button", {
    name: "تعریف پاسخ برای سوال",
  });
  await user.click(addAnswerBtn);
  await user.click(addAnswerBtn);
  expect(screen.getAllByRole("button", { name: "حذف پاسخ" })).toHaveLength(2);
});

test("user should add 2 or more answers", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <Add updateListHandler={updateList} />
    </>,
    {
      wrapperProps: {
        modalOptions: { isAddQuestionModalOpen: true },
      },
    }
  );
  const questionTitle = screen.getByRole("textbox", { name: "عنوان سوال" });
  const addAnswerBtn = screen.getByRole("button", {
    name: "تعریف پاسخ برای سوال",
  });
  const addQuestionBtn = screen.getByRole("button", {
    name: "افزودن سوال جدید",
  });
  await user.type(questionTitle, "Question 01");
  await user.click(addAnswerBtn);
  await user.click(addQuestionBtn);
  expect(
    screen.getByText("افزودن حداقل 2 پاسخ الزامی است.")
  ).toBeInTheDocument();
  await user.click(addAnswerBtn);
  await user.click(addQuestionBtn);
  expect(
    screen.queryByText("افزودن حداقل 2 پاسخ الزامی است.")
  ).not.toBeInTheDocument();
  expect(updateList).toBeCalledTimes(0);
});

test("answers should not be empty", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <Add updateListHandler={updateList} />
    </>,
    {
      wrapperProps: {
        modalOptions: { isAddQuestionModalOpen: true },
      },
    }
  );
  const questionTitle = screen.getByRole("textbox", { name: "عنوان سوال" });
  const addAnswerBtn = screen.getByRole("button", {
    name: "تعریف پاسخ برای سوال",
  });
  const addQuestionBtn = screen.getByRole("button", {
    name: "افزودن سوال جدید",
  });
  await user.type(questionTitle, "Question 01");
  await user.click(addAnswerBtn);
  await user.click(addAnswerBtn);
  await user.click(addQuestionBtn);
  expect(
    screen.getByText("عنوان پاسخ‌ها نمی‌تواند خالی باشد.")
  ).toBeInTheDocument();
  expect(updateList).toBeCalledTimes(0);
});

test("answers should not be duplicate", async () => {
  const updateList = jest.fn();
  const user = userEvent.setup();
  render(
    <>
      <Snak />
      <Add updateListHandler={updateList} />
    </>,
    {
      wrapperProps: {
        modalOptions: { isAddQuestionModalOpen: true },
      },
    }
  );
  const questionTitle = screen.getByRole("textbox", { name: "عنوان سوال" });
  const addAnswerBtn = screen.getByRole("button", {
    name: "تعریف پاسخ برای سوال",
  });
  const addQuestionBtn = screen.getByRole("button", {
    name: "افزودن سوال جدید",
  });
  await user.type(questionTitle, "Question 01");
  await user.click(addAnswerBtn);
  await user.click(addAnswerBtn);
  await user.type(
    screen.getAllByRole("textbox", { name: "عنوان پاسخ" })[0],
    "Answer"
  );
  await user.type(
    screen.getAllByRole("textbox", { name: "عنوان پاسخ" })[1],
    "Answer"
  );
  await user.click(addQuestionBtn);
  expect(
    screen.getByText("عنوان پاسخ‌ها نمی‌تواند تکراری باشد.")
  ).toBeInTheDocument();
});

test("question text can not be duplicate", async () => {
  const user = userEvent.setup();
  const updateList = jest.fn();

  render(
    <>
      <Snak />
      <Add updateListHandler={updateList} />
    </>,
    {
      wrapperProps: {
        modalOptions: { isAddQuestionModalOpen: true },
      },
    }
  );

  const addAnswerBtn = screen.getByRole("button", {
    name: "تعریف پاسخ برای سوال",
  });
  const addQuestionBtn = screen.getByRole("button", {
    name: "افزودن سوال جدید",
  });
  const questionTitle = screen.getByRole("textbox", { name: "عنوان سوال" });
  await user.type(questionTitle, "Question 1");
  await user.click(addAnswerBtn);
  await user.type(
    screen.getAllByRole("textbox", { name: "عنوان پاسخ" })[0],
    "Answer 01"
  );
  await user.click(addAnswerBtn);
  await user.type(
    screen.getAllByRole("textbox", { name: "عنوان پاسخ" })[1],
    "Answer 02"
  );
  await user.click(addQuestionBtn);
  await waitFor(() => {
    expect(screen.queryByText("در حال افزودن سوال...")).not.toBeInTheDocument();
  });
  expect(updateList).toBeCalledTimes(0);
  expect(screen.getByText("نام سوال تکراری می‌باشد.")).toBeInTheDocument();
});

test("question can add succesfully", async () => {
  const user = userEvent.setup();
  const updateList = jest.fn();

  render(
    <>
      <Snak />
      <Add updateListHandler={updateList} />
    </>,
    {
      wrapperProps: {
        modalOptions: { isAddQuestionModalOpen: true },
      },
    }
  );

  const addAnswerBtn = screen.getByRole("button", {
    name: "تعریف پاسخ برای سوال",
  });
  const addQuestionBtn = screen.getByRole("button", {
    name: "افزودن سوال جدید",
  });
  const questionTitle = screen.getByRole("textbox", { name: "عنوان سوال" });
  await user.type(questionTitle, "Question 3");
  await user.click(addAnswerBtn);
  await user.type(
    screen.getAllByRole("textbox", { name: "عنوان پاسخ" })[0],
    "yes"
  );
  await user.click(addAnswerBtn);
  await user.type(
    screen.getAllByRole("textbox", { name: "عنوان پاسخ" })[1],
    "no"
  );
  await user.click(addQuestionBtn);
  await waitFor(() => {
    expect(screen.queryByText("در حال افزودن سوال...")).not.toBeInTheDocument();
  });
  expect(updateList).toBeCalledTimes(1);
  expect(updateList).toBeCalledWith({
    announcementId: "test id",
    text: "Question 3",
    isQuestion: true,
    responses: ["yes", "no"],
    isEnable: true,
    flowNames: null,
  });
  expect(screen.getByText("سوال با موفقیت افزوده شد.")).toBeInTheDocument();
});

test("question modal must close when user click on cancel button", async () => {
  const user = userEvent.setup();
  const updateList = jest.fn();

  render(<Add updateListHandler={updateList} />, {
    wrapperProps: {
      modalOptions: { isAddQuestionModalOpen: true },
    },
  });
  const cancelBtn = screen.getByRole("button", { name: "انصراف" });
  await user.click(cancelBtn);
  await waitForElementToBeRemoved(
    screen.queryByRole("presentation", { name: "add-question-modal" })
  );
  expect(updateList).toBeCalledTimes(0);
});
