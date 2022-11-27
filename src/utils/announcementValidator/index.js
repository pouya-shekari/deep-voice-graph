const announcementValidator = (value) => {
  if (value.trim() === "") {
    return false;
  }
  return true;
};
export default announcementValidator;
