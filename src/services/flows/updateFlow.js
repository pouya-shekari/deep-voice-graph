import axios from "@lib/axios";

const updateFlow = async (url, token, flow) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newFlow = {
    flowId: flow.id,
    nameEN: flow.nameEN,
    nameFA: flow.nameFA,
    description: flow.description,
  };
  try {
    const { data } = await axios.put(url, newFlow, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default updateFlow;
