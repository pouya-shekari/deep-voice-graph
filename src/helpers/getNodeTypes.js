import Action from "../components/Flow/DrawFlow/Node/CustomeNodes/Action/Action";
import Announcement from "../components/Flow/DrawFlow/Node/CustomeNodes/Announcement/Announcement";
import Checker from "../components/Flow/DrawFlow/Node/CustomeNodes/Checker/Checker";
import End from "../components/Flow/DrawFlow/Node/CustomeNodes/End/End";
import Forward from "../components/Flow/DrawFlow/Node/CustomeNodes/Forward/End";
import Question from "../components/Flow/DrawFlow/Node/CustomeNodes/Question/Question";
import Start from "../components/Flow/DrawFlow/Node/CustomeNodes/Start/Start";

const getNodeTypes = () => {
  return {
    Start: Start,
    Announcement: Announcement,
    Checker: Checker,
    Question: Question,
    Action: Action,
    End: End,
    Forward: Forward,
  };
};

export default getNodeTypes;
