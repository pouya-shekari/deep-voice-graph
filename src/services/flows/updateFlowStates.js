import axios from "@lib/axios";

const updateFlowStates = async (url, token, flow) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(url, flow, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default updateFlowStates;
