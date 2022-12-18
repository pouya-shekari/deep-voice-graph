import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Modal from "@cmp/UI/Modal";
import Answer from "@cmp/Resources/Questions/Add/Answer";

import useModal from "@hooks/useModal";
import useSnak from "@hooks/useSnak";

import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

import Title from "@utils/QuestionValidator/Title";
import localStorageHelper from "@utils/localStrogeHelper";

import createQuestion from "@services/questions/createQuestion";

const Add = ({ updateListHandler, onClose }) => {
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);
  const titleRef = useRef();
  const modal = useModal();
  const { showSnak } = useSnak();

  function containsDuplicates(array) {
    if (array.length !== new Set(array).size) {
      return true;
    }

    return false;
  }

  const closeModalHandler = () => {
    modal.close();
    setAnswers([]);
    setError("");
    if (onClose) onClose();
  };

  const addAnswerHandler = () => {
    setAnswers((prev) => [...prev, { title: "", error: "" }]);
  };

  const deleteAnswerHandler = (id) => {
    console.log(id);
    setAnswers((ans) => [...ans.filter((item, index) => index !== id)]);
  };

  const editAnswerHandler = (title, id) => {
    answers.filter((ans, index) => index === id)[0].title = title;
  };

  const onConfirm = async () => {
    setError("");
    if (!Title(titleRef.current.value)) {
      setError("عنوان سوال نمی‌تواند خالی باشد.");
      if (answers.length === 0) return;
    }
    let isValid = true;
    if (answers.length < 2) {
      showSnak({ type: "error", message: "افزودن حداقل 2 پاسخ الزامی است." });
      return;
    }

    answers.forEach((answer) => {
      if (answer.title === "") {
        showSnak({
          type: "error",
          message: "عنوان پاسخ‌ها نمی‌تواند خالی باشد.",
        });
        isValid = false;
        return;
      }
    });
    if (isValid) {
      const titles = answers.map((ans) => ans.title);
      if (containsDuplicates(titles)) {
        isValid = false;
        showSnak({
          type: "error",
          message: "عنوان پاسخ‌ها نمی‌تواند تکراری باشد.",
        });
        return;
      }
    }
    if (!isValid) return;
    try {
      const res = await createQuestion(
        `announcement/create`,
        localStorageHelper.load("token"),
        {
          title: titleRef.current.value,
          answers: answers.map((ans) => ans.title),
        }
      );
      updateListHandler(res);
      showSnak({ type: "success", message: "سوال با موفقیت افزوده شد." });
      setAnswers([]);
      modal.close();
    } catch (error) {
      if (error.message === "409") {
        showSnak({
          type: "error",
          message: "نام سوال تکراری می‌باشد.",
        });
        return;
      }
      showSnak({
        type: "error",
        message: "افزودن سوال با خطا مواجه شد.",
      });
    }
  };

  return (
    <>
      <Modal
        open={modal.modalStates.isAddQuestionModalOpen}
        label="add-question-modal"
        onClose={closeModalHandler}
        title={"افزودن سوال جدید"}
        description={
          "برای افزودن سوال جدید، وارد کردن عنوان سوال و حداقل 2 پاسخ الزامی می‌باشد."
        }
        actions={[
          {
            type: "success",
            label: "افزودن سوال جدید",
            icon: <AddIcon />,
            onClickHandler: onConfirm,
          },
          {
            type: "cancel",
            label: "انصراف",
            icon: <CloseIcon />,
            onClickHandler: closeModalHandler,
          },
        ]}
      >
        <div className="mb-3">
          <TextField
            id="question-title"
            label="عنوان سوال"
            type="text"
            fullWidth
            variant="standard"
            autoComplete={"off"}
            error={error !== ""}
            helperText={error}
            inputRef={titleRef}
          />
        </div>
        {answers.map((answer, index) => (
          <Answer
            answer={answer}
            key={uuidv4()}
            index={index}
            onDelete={deleteAnswerHandler}
            onEdit={editAnswerHandler}
          />
        ))}
        <div className="mb-3">
          <Button
            color="primary"
            variant="contained"
            startIcon={<QuestionAnswerIcon />}
            onClick={addAnswerHandler}
          >
            تعریف پاسخ برای سوال
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Add;
