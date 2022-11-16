import http from "../services/http.service";
// TODO: question and announcement
export async function getCheckers(url, config) {
  try {
    return await http.getAll(url, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function addChecker(url, data, config) {
  try {
    return await http.post(url, data, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function editChecker(url, data, config) {
  try {
    return await http.put(url, data, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function deleteChecker(url, config) {
  try {
    return await http.delete(url, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}
