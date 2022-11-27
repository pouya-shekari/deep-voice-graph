const passwordValidator = (value) => {
  if (value.trim() === "") {
    return false;
  }
  return true;
};

export default passwordValidator;
