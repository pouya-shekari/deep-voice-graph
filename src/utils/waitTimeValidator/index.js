import faToEnDigits from "@utils/faToEnDigits";

const waitTimeValidator = (value) => {
  if (
    value.trim() === "" ||
    isNaN(faToEnDigits(value.trim())) ||
    faToEnDigits(value.trim()) <= 0
  ) {
    return false;
  }
  return true;
};

export default waitTimeValidator;
