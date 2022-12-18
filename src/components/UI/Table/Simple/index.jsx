import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

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

const Simple = ({
  data,
  label,
  hasAction,
  actions,
  tableHeaders,
  onRowClick,
  onContextMenu
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 680 }} aria-label={label} size="large">
          <TableHead>
            <TableRow className="bg-light">
              {tableHeaders.map((header) => (
                <TableCell
                  align="center"
                  key={uuidv4()}
                  component="th"
                  sx={header.style}
                >
                  {header.title}
                </TableCell>
              ))}
              {hasAction && <TableCell align="center">عملیات</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow
                key={uuidv4()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="center"
                  key={uuidv4()}
                  colSpan={
                    hasAction ? tableHeaders.length + 1 : tableHeaders.length
                  }
                >
                  داده‌ای یافت نشد.
                </TableCell>
              </TableRow>
            )}

            {data.map((row) => (
              <TableRow
                key={uuidv4()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onContextMenu={onContextMenu.bind(this, row.id)}
              >
                {tableHeaders.map((header) => (
                  <TableCell
                    onClick={onRowClick ? onRowClick.bind(this, row) : null}
                    align="center"
                    key={uuidv4()}
                    sx={header.style}
                    title={
                      typeof row[header.field] === "string"
                        ? row[header.field]
                        : ""
                    }
                  >
                    {row[header.field]}
                  </TableCell>
                ))}
                {hasAction && (
                  <TableCell align={'center'}>
                    {/*<div className={'d-flex justify-content-between flex-wrap'}>*/}
                      {actions.map((action, index) => (
                          <Fragment key={index}>
                            {renderAction(action, row)}
                          </Fragment>
                      ))}
                    {/*</div>*/}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Simple;
