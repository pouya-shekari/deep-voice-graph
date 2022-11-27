import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const deleteChecker = async (url, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      applicationId: APPLICATIONID,
      checkerId: id,
    },
  };
  try {
    const { data } = await axios.delete(url, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default deleteChecker;
