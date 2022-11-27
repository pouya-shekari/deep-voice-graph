const allowToAddResource = (type) => {
  const invalidTypes = ["Start", "End", "Forward"];
  return !invalidTypes.includes(type);
};

export default allowToAddResource;
