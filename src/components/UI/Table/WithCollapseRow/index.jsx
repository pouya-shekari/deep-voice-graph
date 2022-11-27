import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Row from "@cmp/UI/Table/WithCollapseRow/Row";

const WithCollapseRow = ({
  data,
  label,
  hasAction,
  actions,
  tableHeaders,
  subTableItem,
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 680 }} aria-label={label} size="large">
          <TableHead>
            <TableRow className="bg-light">
              <TableCell sx={{ width: 100 }} />
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
              <TableRow key={uuidv4()}>
                <TableCell
                  align="center"
                  key={uuidv4()}
                  colSpan={
                    hasAction
                      ? tableHeaders.length + 2
                      : tableHeaders.length + 1
                  }
                >
                  داده‌ای یافت نشد.
                </TableCell>
              </TableRow>
            )}

            {data.map((row) => (
              <Row
                row={row}
                hasAction={hasAction}
                tableHeaders={tableHeaders}
                actions={actions}
                key={uuidv4()}
                subTableItem={subTableItem}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WithCollapseRow;
