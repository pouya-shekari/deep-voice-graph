import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const createAction = async (url, token, action) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newAction = {
    applicationId: APPLICATIONID,
    text: action.title,
    url: action.url,
  };
  try {
    const { data } = await axios.post(url, newAction, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default createAction;
