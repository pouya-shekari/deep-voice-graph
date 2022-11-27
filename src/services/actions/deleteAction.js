import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const deleteAction = async (url, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      applicationId: APPLICATIONID,
      actionId: id,
    },
  };
  try {
    const { data } = await axios.delete(url, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default deleteAction;
