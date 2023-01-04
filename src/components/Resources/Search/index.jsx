import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
const Search = ({ onSearch }) => {
  const changeHandler = debounce((value) => {
    onSearch(value);
  }, 300);

  return (
    <>
      <TextField
        autoComplete="off"
        sx={{ mb: 3 }}
        id="search"
        label="جستجو"
        type="search"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(event) => changeHandler(event.target.value)}
      />
    </>
  );
};

export default Search;
