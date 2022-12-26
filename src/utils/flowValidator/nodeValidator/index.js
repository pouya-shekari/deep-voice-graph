import nodeHasCorrectTargetNumber from "./nodeHasCorrectTargetNumber";
import targetNotCorrectFromStart from './targetNotCorrectFromStart';
import announcementHaveLeastOneSource from './announcementHaveLeastOneSource';
import questionAnswersHaveTarget from './questionAnswersHaveTarget';
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
  const [isQuestionAnswersHaveTarget , questionAnswersNotTargetError] = questionAnswersHaveTarget(
      node,
      edges.filter((edg) => edg.source === node.id)
  )
  const [isAnnouncementHasOneSource , announcementHasNotOneSourceError] = announcementHaveLeastOneSource(node,edges)
  if (!isTargetNumberCorrect) node.data.errors.push(targetNumberError);
  if (!isTargetCorrectFromStart) node.data.errors.push(targetNotCorrectFromStartError);
  if (!isAnnouncementHasOneSource) node.data.errors.push(announcementHasNotOneSourceError);
  if (!isQuestionAnswersHaveTarget) node.data.errors.push(questionAnswersNotTargetError);
  return node;
};

export default nodeValidator;
