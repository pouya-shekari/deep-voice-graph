import React from "react";
import useSWR from "swr";
import { getAnnouncements } from "../../api/announcement.api";
import { BASE_URL } from "../../config/variables.config";
const fetcher = async (url) => {
  const res = await getAnnouncements(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      // TODO: APP ID is static
      applicationId: 4,
    },
  });
  console.log(res);
  return res;
};
const List = () => {
  const { data, error } = useSWR(`${BASE_URL}/announcement/list`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>OK.</div>;
};

export default List;
