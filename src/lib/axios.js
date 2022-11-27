import axios from "axios";
import BASEURL from "@constants/BASEURL";

class HttpService {
  constructor() {
    axios.defaults.baseURL = BASEURL;
  }

  getAll = (url, config) => {
    return axios.get(url, config);
  };

  getId = (url, id) => {
    return axios.get(`${url}/${id}`);
  };

  post = (url, data, config) => {
    return axios.post(url, data, config);
  };

  put = (url, data, config) => {
    return axios.put(url, data, config);
  };

  patch = (url, data, id) => {
    return axios.patch(`${url}/${id}`, data);
  };

  delete = (url, config) => {
    return axios.delete(`${url}`, config);
  };
}

export default new HttpService();
