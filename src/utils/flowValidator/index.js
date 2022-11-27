const flowValidator = (value) => {
  if (value.trim() === "") {
    return false;
  }
  return true;
};
export default flowValidator;
