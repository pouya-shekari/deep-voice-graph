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
const renderOperators = (action, id) => {
  switch (action.type) {
    case "delete":
      return (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={action.onClick.bind(this, id)}
          sx={{ mx: 1 }}
          data-id={id}
        >
          {action.label}
        </Button>
      );
    case "edit":
      return (
        <Button
          variant="contained"
          color="warning"
          startIcon={<EditIcon />}
          onClick={action.onClick}
          sx={{ mx: 1 }}
          data-id={id}
        >
          {action.label}
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
                        {renderOperators(action, row.id)}
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
