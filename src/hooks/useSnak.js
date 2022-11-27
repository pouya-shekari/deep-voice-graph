import { useContext } from "react";
import { SnakContext } from "@context/Snak";

const useSnak = () => {
  return useContext(SnakContext);
};

export default useSnak;
