import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const getAnnouncements = async (url, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      applicationId: APPLICATIONID,
      isQuestion: false,
    },
  };
  try {
    const { data } = await axios.getAll(url, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default getAnnouncements;
