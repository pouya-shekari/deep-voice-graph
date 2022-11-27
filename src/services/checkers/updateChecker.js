import axios from "@lib/axios";

const updateChecker = async (url, token, checker) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newChecker = {
    checkerId: checker.id,
    text: checker.newTitle,
    url: checker.newUrl,
  };
  try {
    const { data } = await axios.put(url, newChecker, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default updateChecker;
