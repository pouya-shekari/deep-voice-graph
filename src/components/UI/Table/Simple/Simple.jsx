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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const renderOperators = (action, row) => {
  switch (action.type) {
    case "delete":
      return (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={action.onClick.bind(this, row.id)}
          sx={{ m: 1 }}
          data-id={row.id}
        >
          {action.label}
        </Button>
      );
    case "edit":
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={action.onClick.bind(this, row.id)}
          sx={{ mx: 1 }}
          data-id={row.id}
        >
          {action.label}
        </Button>
      );
    case "draw":
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<RemoveRedEyeIcon />}
          onClick={action.onClick.bind(this, row.id)}
          sx={{ mx: 1 }}
          data-id={row.id}
        >
          {action.label}
        </Button>
      );
    case "enable":
      if (row.enable) {
        return (
          <Button
            variant="contained"
            color="error"
            startIcon={<ErrorOutlineIcon />}
            onClick={action.onClick.bind(this, row.id)}
            sx={{ mx: 1 }}
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
          onClick={action.onClick.bind(this, row.id)}
          sx={{ mx: 1 }}
          data-id={row.id}
        >
          فعال‌ سازی
        </Button>
      );
    default:
      break;
  }
};

const Simple = ({ label, data, hasAction, actions, tableHeaders, options }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 680 }} aria-label={label} size="large">
          <TableHead>
            <TableRow className="bg-light">
              {tableHeaders.map((header) => (
                <TableCell align="center" key={uuidv4()} component="th">
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
              >
                {tableHeaders.map((header) => (
                  <TableCell align="center" key={uuidv4()}>
                    {row[header.field]}
                  </TableCell>
                ))}
                {hasAction && (
                  <TableCell align="center">
                    {actions.map((action) => (
                      <Fragment key={uuidv4()}>
                        {renderOperators(action, row)}
                      </Fragment>
                    ))}
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
