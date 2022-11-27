import Action from "@cmp/Flow/CustomNodes/Action";
import Start from "@cmp/Flow/CustomNodes/Start";
import Announcement from "@cmp/Flow/CustomNodes/Announcement";
import Checker from "@cmp/Flow/CustomNodes/Checker";
import Question from "@cmp/Flow/CustomNodes/Question";
import End from "@cmp/Flow/CustomNodes/End";
import Forward from "@cmp/Flow/CustomNodes/Forward";

const CUSTOMNODETYPES = {
  Start: Start,
  Announcement: Announcement,
  Checker: Checker,
  Question: Question,
  Action: Action,
  End: End,
  Forward: Forward,
};

export default CUSTOMNODETYPES;
