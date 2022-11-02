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
const List = () => {
  const { data, error } = useSWR(`${BASE_URL}/announcement/list`, fetcher);
  const [addOpen, setAddOpen] = useState(false);

  const openAddDialogHandler = () => setAddOpen(true);
  const closeAddDialogHandler = () => setAddOpen(false);

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
              <TableCell align="right">شناسه اعلان</TableCell>
              <TableCell align="right">عنوان</TableCell>
              <TableCell align="right">مدت زمان انتظار (ms)</TableCell>
              <TableCell align="right">وضعیت اعلان</TableCell>
              <TableCell align="right">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.announcementId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.announcementId}</TableCell>
                <TableCell align="right">{row.text}</TableCell>
                <TableCell align="right">{row.waitTime}</TableCell>
                <TableCell align="right">
                  <Alert
                    severity={row.isEnable ? "success" : "error"}
                    sx={{ justifyContent: "center" }}
                  >
                    {row.isEnable ? "فعال" : "غیرفعال"}
                  </Alert>
                </TableCell>
                <TableCell align="right">
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
