const usernameValidator = (value) => {
  if (value.trim() === "") {
    return false;
  }
  return true;
};

export default usernameValidator;
