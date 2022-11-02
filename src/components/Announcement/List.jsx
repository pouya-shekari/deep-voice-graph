import React, { useEffect } from "react";
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
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { getAnnouncements } from "../../api/announcement.api";
import { BASE_URL } from "../../config/variables.config";
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
      <div className="text-center mt-5">
        <ClipLoader color="rgb(45,55,145)" />
      </div>
    );
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="announcements table"
        size="large"
      >
        <TableHead>
          <TableRow>
            <TableCell align="right">شناسه اعلان</TableCell>
            <TableCell align="right">عنوان</TableCell>
            <TableCell align="right">مدت زمان انتظار (ms)</TableCell>
            <TableCell align="right">وضعیت اعلان</TableCell>
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
              {row.isEnable && (
                <TableCell align="right">
                  <span className="badge text-bg-success">فعال</span>
                </TableCell>
              )}
              {!row.isEnable && (
                <TableCell align="right">
                  <span className="badge text-bg-danger">غیرفعال</span>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
