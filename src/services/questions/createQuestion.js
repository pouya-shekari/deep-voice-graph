import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const createQuestion = async (url, token, question) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newQuestion = {
    applicationId: APPLICATIONID,
    text: question.title,
    isQuestion: true,
    responses: [...question.answers],
  };
  try {
    const { data } = await axios.post(url, newQuestion, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default createQuestion;
