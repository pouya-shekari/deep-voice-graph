import axios from "@lib/axios";

const updateAction = async (url, token, action) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newAction = {
    actionId: action.id,
    text: action.newTitle,
    url: action.newUrl,
  };
  try {
    const { data } = await axios.put(url, newAction, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default updateAction;
