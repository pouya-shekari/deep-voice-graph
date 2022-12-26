import nodeHasCorrectTargetNumber from "./nodeHasCorrectTargetNumber";
import targetNotCorrectFromStart from './targetNotCorrectFromStart';
import announcementHaveLeastOneSource from './announcementHaveLeastOneSource';
import questionAnswersHaveTarget from './questionAnswersHaveTarget';
import endNodeHaveAnnouncementSource from './endNodeHaveAnnouncementSource';
import forwardNodeHaveAnnouncementSource from './forwardNodeHaveAnnouncementSource';
import checkLoopForNode from './checkLoopForNode';
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
  const [isEndNodeHaveAnnouncementSource , endNodeNotHaveAnnouncementSource] = endNodeHaveAnnouncementSource(
      node,
      edges.filter((edg) => edg.target === node.id)
  );
  const [isForwardNodeHaveAnnouncementSource , forwardNodeNotHaveAnnouncementSource] = forwardNodeHaveAnnouncementSource(
      node,
      edges.filter((edg) => edg.target === node.id)
  );

  const [isNodeLoop , nodeHaveLoopError] = checkLoopForNode(node , edges.filter((edg) => edg.source === node.id))
  if (!isTargetNumberCorrect) node.data.errors.push(targetNumberError);
  if (!isTargetCorrectFromStart) node.data.errors.push(targetNotCorrectFromStartError);
  if (!isAnnouncementHasOneSource) node.data.errors.push(announcementHasNotOneSourceError);
  if (!isQuestionAnswersHaveTarget) node.data.errors.push(questionAnswersNotTargetError);
  if (!isEndNodeHaveAnnouncementSource) node.data.errors.push(endNodeNotHaveAnnouncementSource);
  if (!isForwardNodeHaveAnnouncementSource) node.data.errors.push(forwardNodeNotHaveAnnouncementSource);
  if (!isNodeLoop) node.data.errors.push(nodeHaveLoopError);
  return node;
};

export default nodeValidator;
