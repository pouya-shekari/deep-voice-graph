import { MarkerType } from "reactflow";

const GetDefaultEdgeOptions = () => {
  return {
    style: { strokeWidth: 1, stroke: "black" },
    type: "smoothstep",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#fff", color: "#fff", fillOpacity: 1 },
    labelStyle: { fontSize: 10, fontWeight: 700 },
    markerEnd: {
      type: MarkerType.Arrow,
      color: "black",
      width: 20,
      height: 20,
    },
  };
};

export default GetDefaultEdgeOptions;
