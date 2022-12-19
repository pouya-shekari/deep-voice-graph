import { Box, TextField, Button } from "@mui/material";
import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";

const Answer = ({ answer, index, onDelete, onEdit }) => {
  const deleteAnswerHandler = () => {
    onDelete(index);
  };

  const changeHandler = (event) => {
    onEdit(event.target.value.trim(), index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        my: 2,
        alignItems: "end",
        justifyContent: "space-between",
        gap: "0.5rem",
      }}
    >
      <TextField
        sx={{ flexGrow: 1 }}
        margin="dense"
        id={`عنوان پاسخ-${index}`}
        label="عنوان پاسخ"
        type="text"
        variant="standard"
        defaultValue={answer.title}
        onChange={changeHandler}
        error={answer.error !== ""}
        helperText={answer.error}
      />
      <Button
        variant={"contained"}
        startIcon={<DeleteIcon />}
        color={"error"}
        onClick={deleteAnswerHandler}
      >
        حذف پاسخ
      </Button>
    </Box>
  );
};

export default Answer;
