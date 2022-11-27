const Title = (value) => {
  if (value.trim() === "") {
    return false;
  }
  return true;
};
export default Title;
