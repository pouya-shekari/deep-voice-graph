import axios from "@lib/axios";

const lockFlow = async (url, token, enable) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      enable: enable,
    },
  };
  try {
    const { data } = await axios.put(url, {}, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default lockFlow;
