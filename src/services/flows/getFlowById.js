import axios from "@lib/axios";

const getFlowById = async (url, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.getAll(url, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default getFlowById;
