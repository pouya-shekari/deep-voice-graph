import React from "react";
import useSWR from "swr";
import { BASE_URL } from "../../../config/variables.config";
import { getFlow } from "../../../api/flow.api";
const getFlowHandler = async (url) => {
  const { data } = await getFlow(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

const Draw = (props) => {
  const { data, error, mutate } = useSWR(
    `${BASE_URL}/flow/${props.params.id}`,
    getFlowHandler
  );
  if (error) {
    return <div>Fail</div>;
  }
  if (!data) {
    return <div>Loading</div>;
  }
  return <div>Flow loaded.</div>;
};

export default Draw;
