import http from "../services/http.service";
// TODO: question and announcement
export async function getAllFlows(url, config) {
  try {
    return await http.getAll(url, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function addFlow(url, data, config) {
  try {
    return await http.post(url, data, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function lockFlow(url, data, config) {
  try {
    return await http.put(url, data, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function updateFlow(url, data, config) {
  try {
    return await http.put(url, data, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}
