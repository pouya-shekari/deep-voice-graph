import React, { useState, Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Collapse,
  Box,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";

const renderAction = (action, row) => {
  const defaultActions = ["error", "success", "cancel", "warning", "primary"];
  if (!defaultActions.includes(action.type)) {
    switch (action.type) {
      case "enable/disable":
        if (row.enable) {
          return (
            <Button
              variant="contained"
              color="error"
              startIcon={<ErrorOutlineIcon />}
              onClick={action.onClickHandler.bind(this, row.id)}
              sx={{ m: 1 }}
              data-id={row.id}
            >
              غیرفعال سازی
            </Button>
          );
        }
        return (
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={action.onClickHandler.bind(this, row.id)}
            sx={{ m: 1 }}
            data-id={row.id}
          >
            فعال‌ سازی
          </Button>
        );
      default:
        break;
    }
  }
  return (
    <Button
      variant="contained"
      color={action.type}
      startIcon={action.icon}
      onClick={action.onClickHandler.bind(this, row.id)}
      sx={{ m: 1 }}
      data-id={row.id}
    >
      {action.label}
    </Button>
  );
};

const Row = ({ hasAction, tableHeaders, row, actions, subTableItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        key={uuidv4()}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        aria-label="main"
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {tableHeaders.map((header) => (
          <TableCell
            align="center"
            key={uuidv4()}
            sx={header.style}
            title={
              typeof row[header.field] === "string" ? row[header.field] : ""
            }
          >
            {row[header.field]}
          </TableCell>
        ))}
        {hasAction && (
          <TableCell align="center">
            {actions.map((action, index) => (
              <Fragment key={index}>{renderAction(action, row)}</Fragment>
            ))}
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }} align="left">
                      عنوان پاسخ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ backgroundColor: "whiteSmoke" }}>
                  {row[subTableItem].map((item) => (
                    <TableRow key={item}>
                      <TableCell>{item}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
