import axios from "@lib/axios";

const updateQuestion = async (url, token, question) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newQuestion = {
    announcementId: question.id,
    text: question.newTitle,
  };
  try {
    const { data } = await axios.put(url, newQuestion, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default updateQuestion;
