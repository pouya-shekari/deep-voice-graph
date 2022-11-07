import React, { useState } from "react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAnnouncements } from "../../api/announcement.api";
import { BASE_URL } from "../../config/variables.config";
import AddDialog from "./Add";
import { SimpleTable } from "../UI/Table/Tabel";
const fetcher = async (url) => {
  const { data } = await getAnnouncements(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      applicationId: 8,
      isQuestion: false,
    },
  });
  return data;
};

const tableHeaders = [
  { colNumber: 0, title: "شناسه اعلان", field: "id" },
  { colNumber: 1, title: "عنوان اعلان", field: "title" },
  { colNumber: 2, title: "مدت زمان انتظار (ms)", field: "waitTime" },
  { colNumber: 3, title: "وضعیت اعلان", field: "isEnable" },
];

const List = () => {
  const { data, error } = useSWR(`${BASE_URL}/announcement/list`, fetcher);

  if (error)
    return (
      <Alert
        variant="filled"
        severity="error"
        sx={{ justifyContent: "center", gap: "5px" }}
      >
        خطا! لطفا اتصال اینترنت خود را بررسی نمایید.
      </Alert>
    );
  if (!data)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}
      >
        <CircularProgress />
      </Box>
    );
  const tableData = data.map(({ announcementId, isEnable, text, waitTime }) => {
    return {
      id: announcementId,
      title: text,
      isEnable,
      waitTime,
      actions: ["delete", "edit"],
    };
  });

  // return (
  //   <div aria-label="add new announcement" className="mb-3">
  //     <Button variant="contained" color="success" startIcon={<AddIcon />}>
  //       افزودن اعلان جدید
  //     </Button>
  //     <SimpleTable
  //       label={"Annoucement Table"}
  //       data={tableData}
  //       hasAction={true}
  //       actions={[
  //         { type: "delete", label: "حذف اعلان" },
  //         { type: "edit", label: "ویرایش اعلان" },
  //       ]}
  //       tableHeaders={tableHeaders}
  //       options={{}}
  //     />
  //   </div>
  // );
  return (
    <>
      <div aria-label="add new announcement" className="mb-3">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={openAddDialogHandler}
        >
          افزودن اعلان جدید
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="announcements table"
          size="large"
        >
          <TableHead>
            <TableRow className="bg-light">
              <TableCell align="center">شناسه اعلان</TableCell>
              <TableCell align="center">عنوان</TableCell>
              <TableCell align="center">مدت زمان انتظار (ms)</TableCell>
              <TableCell align="center">وضعیت اعلان</TableCell>
              <TableCell align="center">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.announcementId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.announcementId}</TableCell>
                <TableCell align="center">{row.text}</TableCell>
                <TableCell align="center">{row.waitTime}</TableCell>
                <TableCell align="center">
                  <Alert
                    severity={row.isEnable ? "success" : "error"}
                    sx={{ justifyContent: "center" }}
                  >
                    {row.isEnable ? "فعال" : "غیرفعال"}
                  </Alert>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    حذف اعلان
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddDialog open={addOpen} closeHandler={closeAddDialogHandler} />
    </>
  );
};

export default List;
