import nodeHasCorrectTargetNumber from "./nodeHasCorrectTargetNumber";
const nodeValidator = (node, edges) => {
  node.data.errors = [];
  const [isTargetNumberCorrect, targetNumberError] = nodeHasCorrectTargetNumber(
    node,
    edges.filter((edg) => edg.source === node.id)
  );
  if (!isTargetNumberCorrect) node.data.errors.push(targetNumberError);
  return node;
};

export default nodeValidator;
