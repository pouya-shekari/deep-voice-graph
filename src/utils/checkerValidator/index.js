const checkerValidator = (value) => {
  if (value.trim() === "") {
    return false;
  }
  return true;
};
export default checkerValidator;
