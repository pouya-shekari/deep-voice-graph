import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const createAnnouncement = async (url, token, title) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const announcement = {
    applicationId: APPLICATIONID,
    text: title,
    isQuestion: false,
    responses: [],
  };
  try {
    const { data } = await axios.post(url, announcement, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default createAnnouncement;
