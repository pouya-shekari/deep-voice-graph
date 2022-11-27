import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const deleteQuestion = async (url, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      applicationId: APPLICATIONID,
      announcementId: id,
    },
  };
  try {
    const { data } = await axios.delete(url, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default deleteQuestion;
