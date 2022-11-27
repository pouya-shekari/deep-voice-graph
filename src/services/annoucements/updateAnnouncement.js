import axios from "@lib/axios";

const updateAnnouncement = async (url, token, announcement) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const newAnnouncement = {
    announcementId: announcement.id,
    text: announcement.newTitle,
  };
  try {
    const { data } = await axios.put(url, newAnnouncement, config);
    return data;
  } catch (e) {
    throw Error(e.response.status);
  }
};

export default updateAnnouncement;
