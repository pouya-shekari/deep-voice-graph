import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const createChecker = async (url, token, checker) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newChecker = {
    applicationId: APPLICATIONID,
    text: checker.title,
    url: checker.url,
  };
  try {
    const { data } = await axios.post(url, newChecker, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default createChecker;
