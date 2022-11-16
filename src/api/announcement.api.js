import http from "../services/http.service";
// TODO: question and announcement
export async function getAnnouncements(url, config) {
  try {
    return await http.getAll(url, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function addAnnouncement(url, data, config) {
  try {
    return await http.post(url, data, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function editAnnouncement(url, data, config) {
  try {
    return await http.put(url, data, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}

export async function deleteAnnouncement(url, config) {
  try {
    return await http.delete(url, config);
  } catch (e) {
    throw Error(e.response.status);
  }
}
