import axios from "@lib/axios";

const loginUser = async (data) => {
  try {
    const response = await axios.post("/user/login", data);
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default loginUser;
