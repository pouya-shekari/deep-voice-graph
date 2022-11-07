import React from "react";
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
            {data.map((row, index) => (
              <TableRow
                key={uuidv4()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {tableHeaders.map((header) => (
                  <TableCell align="center" key={uuidv4()}>
                    {header.title}
                  </TableCell>
                ))}
                <TableCell align="center">{row.announcementId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Simple;
