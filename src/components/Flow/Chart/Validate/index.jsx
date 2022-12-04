import React from "react";
import { Button } from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";
import nodeValidator from "@utils/flowValidator/nodeValidator";
const Validate = ({ nodes, edges, onValidateEnd }) => {
  const validateFlowHandler = () => {
    const validatedNodes = nodes.map((node) => nodeValidator(node, edges));
    // const invalidNodesCount = validateFlowHandler
    // onValidateEnd(validatedNodes);
    console.log(validatedNodes);
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<RuleIcon />}
        onClick={validateFlowHandler}
      >
        اعتبارسنجی فلوچارت
      </Button>
    </>
  );
};

export default Validate;
