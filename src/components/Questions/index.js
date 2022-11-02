import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import style from "./index.module.scss";
import { toast } from "react-toastify";
import { getQuestion } from "../../api/question.api";

/*function createData(id,title,wait,status) {
    return {
        id,
        title,
        wait,
        status,
        answers: [
            {
                title:'yes'
            },
            {
                title:'no'
            },
        ],
    };
}*/

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.announcementId}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.text}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.waitTime}
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          <Alert
            severity={row.isEnable == true ? "success" : "error"}
            sx={{ justifyContent: "center" }}
          >
            <strong>{row.isEnable == true ? "فعال" : "غیر فعال"}</strong>
          </Alert>
        </TableCell>
        <TableCell align="center">
          <Button variant="contained" startIcon={<EditIcon />}>
            ویرایش سوال
          </Button>
          <button
            className="btn btn-primary"
            style={{
              border: "none",
              outline: "none",
              cursor: "default",
              backgroundColor: "transparent",
            }}
          ></button>
          <Button
            color={"error"}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            حذف سوال
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                پاسخ‌ها
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">عنوان پاسخ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/*{row.responses.slice(1,rows.responses.lenght-2).split(',').map((historyRow) => (
                                        <TableRow key={historyRow}>
                                            <TableCell>{historyRow}</TableCell>
                                        </TableRow>
                                    ))}*/}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

/*const rows = [
    createData(1, 'آیا اینطوریه؟' , 100 , 'فعال' ),
    createData(2, 'آیا اونطوریه؟' , 100 , 'فعال' ),
    createData(3, 'چگونه؟' , 100 , 'فعال' ),
    createData(4, 'چرا اینطوریه؟' , 100 , 'غیر فعال' ),
    createData(5, 'چرا اونطوریه؟' , 100 , 'فعال' ),
    createData(6, 'چرا اینطوری نیست؟' , 100 , 'فعال' ),
    createData(7, 'چرا اونطوری نیست؟' , 100 , 'فعال' ),
];*/

function TablePaginationActions(props) {
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, mr: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "ltr" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "ltr" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "ltr" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "ltr" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const QuestionsList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [questionsList, setQuestionsList] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getQuestion({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        applicationId: 8,
        isQuestion: true,
      },
    })
      .then((res) => {
        setQuestionsList(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("اتصال با خطا مواجه شد.");
      });
  }, []);

  const enToFaDigits = function (input) {
    if (input == undefined) return;
    var returnModel = "",
      symbolMap = {
        1: "۱",
        2: "۲",
        3: "۳",
        4: "۴",
        5: "۵",
        6: "۶",
        7: "۷",
        8: "۸",
        9: "۹",
        0: "۰",
      };
    input = input.toString();
    for (let i = 0; i < input.length; i++)
      if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
      else returnModel += input[i];
    return returnModel;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div dir="rtl">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align={"center"}>شناسه سوال</TableCell>
                  <TableCell align={"center"}>عنوان سوال</TableCell>
                  <TableCell align={"center"}>مدت زمان انتظار (ms)</TableCell>
                  <TableCell align={"center"}>وضعیت سوال</TableCell>
                  <TableCell align={"center"}>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? questionsList.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : questionsList
                ).map((row) => (
                  <Row key={row.announcementId} row={row} />
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    className={style.paginationTable}
                    labelDisplayedRows={(from = page) =>
                      `${enToFaDigits(from.from)} - ${enToFaDigits(
                        from.to === -1 ? from.count : from.to
                      )}  از  ${enToFaDigits(from.count)}`
                    }
                    labelRowsPerPage={"تعداد در هر صفحه"}
                    rowsPerPageOptions={[
                      { label: "۵", value: 5 },
                      { label: "۱۰", value: 10 },
                      { label: "۲۵", value: 25 },
                      { label: "همه", value: -1 },
                    ]}
                    colSpan={3}
                    count={questionsList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export { QuestionsList };
