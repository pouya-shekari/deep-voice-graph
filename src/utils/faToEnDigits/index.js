const faToEnDigits = function (input) {
  if (input === undefined) return;
  let returnModel = "";
  const symbolMap = {
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    "۰": "0",
  };
  input = input.toString();
  for (let i = 0; i < input.length; i++)
    if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
    else returnModel += input[i];
  return returnModel;
};

export default faToEnDigits;
