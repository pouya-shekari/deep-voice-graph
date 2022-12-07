const nodeHasCorrectTargetNumber = (node, nodeEdges) => {
  if (
    node.type === "Action" ||
    node.type === "Announcement" ||
    node.type === "Start"
  ) {
    const isTargetsOkay = nodeEdges.length === 1;
    return [
      isTargetsOkay,
      isTargetsOkay ? "" : "تعداد خروجی‌های این گره باید 1 باشد.",
    ];
  }
  if (node.type === "Checker") {
    const isTargetsOkay = nodeEdges.length === 2;
    return [
      isTargetsOkay,
      isTargetsOkay ? "" : "تعداد خروجی‌های این گره باید 2 باشد.",
    ];
  }
  return [true, ""];
};

export default nodeHasCorrectTargetNumber;
