import React from "react";
import { Button } from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";
import nodeValidator from "@utils/flowValidator/nodeValidator";
import useSnak from "@hooks/useSnak";
const Validate = ({ nodes, edges, onValidateEnd }) => {
  const { showSnak } = useSnak();
  const validateFlowHandler = () => {
    const validatedNodes = nodes.map((node) => nodeValidator(node, edges));
    const invalidNodesCount = validatedNodes.filter(
      (nds) => nds.data.errors.length > 0
    ).length;
    onValidateEnd(validatedNodes);
    if (invalidNodesCount) {
      showSnak({
        type: "error",
        message: `تعداد ${invalidNodesCount} گره دارای مشکل می‌باشند.`,
      });
      return;
    }
    showSnak({
      type: "success",
      message: `فلوچارت معتبر می‌باشد.`,
    });
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
