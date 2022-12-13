import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, InputAdornment, Button } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import useAuth from "@hooks/useAuth";
import usernameValidator from "@utils/login-form-validator/username.validator.js";
import passwordValidator from "@utils/login-form-validator/password.validator.js";
import loginUser from "@services/auth/login";
import useSnak from "@hooks/useSnak";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState({ username: false, password: false });

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { showSnak } = useSnak();

  let from = location.state?.from?.pathname || "/";

  const isFormValid = () => {
    const isUsernameValid = usernameValidator(usernameRef.current.value);
    const isPasswordValid = passwordValidator(passwordRef.current.value);
    setError({
      username: !isUsernameValid,
      password: !isPasswordValid,
    });
    return isUsernameValid && isPasswordValid;
  };

  const signinHandler = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      showSnak({
        type: "error",
        message: "نام کاربری و گذرواژه الزامی می‌باشد.",
      });
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await loginUser({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      auth.signin(data.token);
      showSnak({ type: "success", message: "با موفقیت وارد شدید. خوش آمدید!" });
      navigate(from, { replace: true });
    } catch (error) {
      if (error?.response?.status === 401) {
        showSnak({
          type: "error",
          message: "نام کاربری یا گذرواژه معتبر نمی‌باشد.",
        });
        return;
      }
      showSnak({
        type: "error",
        message: "خطایی رخ داد، لطفا دوباره تلاش کنید.",
      });
    }
    setIsLoading(false);
  };

  return (
    <Box
      component={"form"}
      sx={{ width: "100%" }}
      role="form"
      name="hara-login-form"
    >
      <TextField
        sx={{ mb: 3 }}
        required
        id="username"
        label="نام کاربری"
        type="text"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
          "aria-label": "login-phone-number",
        }}
        inputRef={usernameRef}
        error={error.username}
      />
      <TextField
        sx={{ mb: 3 }}
        required
        id="password"
        label="گذرواژه"
        type="password"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
        }}
        inputRef={passwordRef}
        error={error.password}
      />

      <Button
        variant="contained"
        color="success"
        sx={{ width: "100%" }}
        onClick={signinHandler}
        disabled={isLoading}
        startIcon={<LockOpenIcon />}
      >
        {isLoading ? "در حال ورود..." : "ورود"}
      </Button>
    </Box>
  );
};

export default LoginForm;
