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
import {addQuestion, deleteQuestion, getQuestion} from "../../api/question.api";
import Transition from "../ModalTransition/Transition";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import TextField from '@mui/material/TextField';
import BeatLoader from "react-spinners/BeatLoader";
import {CircularProgress} from "@mui/material";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openDialog , setOpenDialog] = React.useState(false)
    const [itemIdNumberForDelete , setItemIdNumberForDelete] = React.useState(null)

    const deleteHandler = (id) => {
        setOpenDialog(true);
        setItemIdNumberForDelete(id)

    };

    const handleClose = () => {
        setItemIdNumberForDelete(null)
        setOpenDialog(false);
    };

    const handleExit = () => {
        setOpenDialog(false);
        deleteQuestion(itemIdNumberForDelete,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
                /*applicationId: 8,*/
                announcementId: itemIdNumberForDelete,
            },
        }).then(()=>{
            toast.success("آیتم با موفقیت حذف شد.")
            setItemIdNumberForDelete(null)
            props.onChange()
        }).catch(()=>{
            toast.error("خطا در حذف سوال!");
            setItemIdNumberForDelete(null)
        })
    };

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
            onClick={()=>{deleteHandler(row.announcementId)}}
          >
            حذف سوال
          </Button>
        </TableCell>
      </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight:'bold'}} align="left">عنوان پاسخ</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor:'whiteSmoke'}}>
                                {row.responses.map((historyRow) => (
                                    <TableRow key={historyRow}>
                                        <TableCell>{historyRow}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                {"آیا از حذف این سوال اطمینان دارید؟"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    در صورت انتخاب گزینه حذف، اگر این سوال در هیچ فلوچارتی مورد استفاده قرار نگرفته باشد، از لیست سوالات شما حذف خواهد شد.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={handleExit}>حذف</Button>
                <Button className={style.deleteBtn} onClick={handleClose}>لغو</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}

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
  const [updateList , setUpdateList] = React.useState(false)
    const [open,setOpen] = React.useState(false)
    const [options,setOptions] = React.useState([])
    const [questionTitle,setQuestionTitle] = React.useState('')
    const [waitTime , setWaitTime] = React.useState('')


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
      })
      .catch((err) => {
        toast.error("اتصال با خطا مواجه شد.");
      });
  }, [updateList]);

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

    const faToEnDigits = function (input) {
        if (input == undefined)
            return;
        var returnModel = "", symbolMap = {
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '۰': '0'
        };
        input = input.toString();
        for (let i = 0; i < input.length; i++)
            if (symbolMap[input[i]])
                returnModel += symbolMap[input[i]];
            else
                returnModel += input[i];
        return returnModel;
    }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = ()=>{
      setUpdateList(!updateList)
  }

    const openAddDialogHandler = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
        setOptions([])
    };

    const handleSendQuestion = () =>{
        if(questionTitle.trim() === ''){
            toast.error('عنوان نمی‌تواند خالی باشد.')
        }
        else if(waitTime.trim() === ''){
            toast.error('زمان انتظار نمی‌تواند خالی باشد.')
        }else if(isNaN(faToEnDigits(waitTime.trim())) || faToEnDigits(waitTime.trim())<=0){
            toast.error('زمان انتظار معتبر نیست.')
        }
        else if(options == false){
            toast.error('پاسخی یافت نشد.')
        }else{
            let flag = false
            options.forEach(item=>{
                if(item.trim() === ''){
                    flag = true
                }
            })
            if (flag === true){
                toast.error('پاسخ نمی‌تواند خالی باشد.')
            }else {
                let answers = []
                options.map(item=>{
                    answers.push(item.trim())
                })
                const data = {
                    "applicationId": 8,
                    "text": questionTitle.trim(),
                    "waitTime": faToEnDigits(waitTime.trim()),
                    "statusCode": 1,
                    "isQuestion": true,
                    "responses":answers
                }
                addQuestion(data,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }).then(()=>{
                    toast.success('سوال با موفقیت اضافه شد.')
                    setOpen(false)
                    setOptions([])
                    setQuestionTitle('')
                    setWaitTime('')
                    handleChange()
                }).catch((err)=>{
                    if (err.response.status == 409){
                        toast.error('عنوان سوال تکراری می‌باشد.')
                    }
                    else{
                        toast.error('خطا')
                    }
                })
            }
        }
    }

    function handleOptionChange(
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        const values = options
        values[index] = event.target.value
        setOptions([...values])
    }

    function handleAddOption() {
        setOptions([...options, ''])
    }

    function handleRemoveOption(index: number) {
        const values = options
        values.splice(index, 1)
        setOptions([...values])
    }

    const handleQuestionTitle = (event)=>{
        setQuestionTitle(event.target.value)
    }

    const handleWaitTime = (event)=>{
        setWaitTime(event.target.value)
    }

    return (
    <>
      {loading ? (
        <div style={{display:'flex',justifyContent:'center'}}>
            <CircularProgress />
        </div>
      ) : (
        <div dir="rtl">
            <div aria-label="add new announcement" className="mb-3">
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={openAddDialogHandler}
                >
                    افزودن سوال جدید
                </Button>
            </div>
            <Dialog className={style.addDialog} open={open} onClose={handleClose}>
                <DialogTitle>افزودن سوال</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="عنوان سوال"
                        label="عنوان سوال"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleQuestionTitle}
                    />
                    <br/>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="مدت زمان انتظار"
                        label="مدت زمان انتظار (ms)"
                        fullWidth
                        variant="standard"
                        onChange={handleWaitTime}
                    />
                </DialogContent>
                <DialogActions sx={{justifyContent:'start', padding:'0.5rem 1.5rem 0'}}>
                    <Button variant={"contained"} color={"primary"} onClick={handleAddOption}>افزودن پاسخ</Button>
                </DialogActions>
                <DialogContent >

                    {options.map((_option, i) => (
                        <div key={i} style={{display:'flex' , alignItems:'end' , justifyContent:'space-between' , gap:'0.5rem'}}>
                            <TextField
                                sx={{flexGrow:1}}
                                autoFocus={true}
                                margin="dense"
                                id="عنوان پاسخ"
                                label="عنوان پاسخ"
                                type="text"
                                variant="standard"
                                value={options[i]}
                                onChange={(event) => handleOptionChange(event, i)}
                            />
                            <Button variant={"contained"} startIcon={<DeleteIcon />} color={"error"} onClick={()=>handleRemoveOption(i)}>حذف پاسخ</Button>
                        </div>
                    ))}

                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"success"} onClick={handleSendQuestion}>افزودن</Button>
                    <Button className={style.deleteBtn} onClick={handleClose}>لغو</Button>
                </DialogActions>
            </Dialog>
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
                  <Row onChange={handleChange} key={row.announcementId} row={row} />
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
