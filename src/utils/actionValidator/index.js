const actionValidator = (value) => {
  if (value.trim() === "") {
    return false;
  }
  return true;
};
export default actionValidator;
