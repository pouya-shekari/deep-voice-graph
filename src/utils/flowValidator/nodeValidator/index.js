import nodeHasCorrectTargetNumber from "./nodeHasCorrectTargetNumber";
import targetNotCorrectFromStart from './targetNotCorrectFromStart';
import announcementHaveLeastOneSource from './announcementHaveLeastOneSource';
const nodeValidator = (node, edges) => {
  node.data.errors = [];
  const [isTargetNumberCorrect, targetNumberError] = nodeHasCorrectTargetNumber(
    node,
    edges.filter((edg) => edg.source === node.id)
  );
  const [isTargetCorrectFromStart, targetNotCorrectFromStartError] = targetNotCorrectFromStart(
      node,
      edges.filter((edg) => edg.source === node.id)
  );
  announcementHaveLeastOneSource(node,edges.filter((edg) => edg.source === node.id),edges)
  if (!isTargetNumberCorrect) node.data.errors.push(targetNumberError);
  if (!isTargetCorrectFromStart) node.data.errors.push(targetNotCorrectFromStartError);
  return node;
};

export default nodeValidator;
