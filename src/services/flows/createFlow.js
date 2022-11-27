import APPLICATIONID from "@constants/APPLICATIONID";
import axios from "@lib/axios";

const createFlow = async (url, token, flow) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newFlow = {
    applicationId: APPLICATIONID,
    nameEN: flow.en,
    nameFA: flow.fa,
    description: flow.desc,
  };
  try {
    const { data } = await axios.post(url, newFlow, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default createFlow;
