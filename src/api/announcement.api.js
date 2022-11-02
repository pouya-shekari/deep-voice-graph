import http from "../services/http.service";
// TODO: question and announcement
export async function getAnnouncements(url, config) {
  try {
    return await http.getAll(url, config);
  } catch (e) {
    return Promise.reject(e);
  }
}
