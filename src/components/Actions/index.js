import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import Transition from "../ModalTransition/Transition";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import TextField from '@mui/material/TextField';
import {CircularProgress} from "@mui/material";
import {addAction, deleteAction, editAction, getActions} from "../../api/actions.api";
import {APPLICATIONID} from "../../config/variables.config";
import {Close} from "@mui/icons-material";

function Row(props) {
    const { row } = props;
    const [openDialog , setOpenDialog] = React.useState(false)
    const [itemIdNumberForDelete , setItemIdNumberForDelete] = React.useState(null)
    const [openEditDialog , setOpenEditDialog] = React.useState(false)
    const [itemIdNumberForEdit , setItemIdNumberForEdit] = React.useState(null)
    const [actionTitle , setActionTitle] = React.useState('')
    const [url , setURL] = React.useState('')
    const [changeTitleFlag , setChangeTitleFlag] = React.useState(false)
    const [changeURLFlag , setChangeURLFlag] = React.useState(false)

    const deleteHandler = (id) => {
        setOpenDialog(true);
        setItemIdNumberForDelete(id)

    };

    const editHandler = (id)=>{
        setOpenEditDialog(true)
        setItemIdNumberForEdit(id)
    }

    const handleClose = () => {
        setItemIdNumberForDelete(null)
        setItemIdNumberForEdit(null)
        setOpenDialog(false);
        setOpenEditDialog(false)
        setChangeTitleFlag(false)
        setChangeURLFlag(false)
    };

    const handleExit = () => {
        setOpenDialog(false);
        deleteAction({
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
                /*applicationId: 8,*/
                actionId: itemIdNumberForDelete,
            },
        }).then(()=>{
            toast.success("عملکرد با موفقیت حذف شد.")
            setItemIdNumberForDelete(null)
            props.onChange()
        }).catch((err)=>{
            if (err.response.status == 404){
                toast.error('این عملکرد قابل حذف نمی‌باشد.')
            }
            else{
                toast.error('عملیات با خطا مواجه شد.')
            }
            setItemIdNumberForDelete(null)
        })
    };

    const handleEdit = ()=>{
        if(actionTitle.trim() == ''){
            toast.error('عنوان نمی‌تواند خالی باشد.')
        }else if(url.trim() == ''){
            toast.error('آدرس url نمی‌تواند خالی باشد.')
        }else{
            const data = {
                "actionId": itemIdNumberForEdit,
                "text": actionTitle.trim(),
                "url": url.trim()
            }
            editAction(data,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }).then((res)=>{
                toast.success('ویرایش عملکرد با موفقیت انجام شد.')
                setChangeURLFlag(false)
                setChangeTitleFlag(false)
                setOpenEditDialog(false);
                setItemIdNumberForEdit(null)
                props.onChange()
            }).catch((err)=>{
                toast.error('عملیات با خطا مواجه شد.')
                setChangeURLFlag(false)
                setChangeTitleFlag(false)
                setOpenEditDialog(false);
                setItemIdNumberForEdit(null)
            })
        }
    }


    const handleActionTitle = (event)=>{
        setChangeTitleFlag(true)
        if(!changeURLFlag){
            setURL(row.url)
            setChangeURLFlag(true)
        }
        setActionTitle(event.target.value)
    }

    const handleURL = (event)=>{
        setChangeURLFlag(true)
        if(!changeTitleFlag){
            setActionTitle(row.text)
            setChangeTitleFlag(true)
        }
        setURL(event.target.value)
    }

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell align="center" component="th" scope="row">
                    {row.actionId}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.text}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {row.url}
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
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                        <Button onClick={()=>{editHandler(row.actionId)}} variant="contained" startIcon={<EditIcon />}>
                            ویرایش عملکرد
                        </Button>
                        <Button
                            color={"error"}
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={()=>{deleteHandler(row.actionId)}}
                        >
                            حذف عملکرد
                        </Button>
                    </div>
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
                    {"آیا از حذف این عملکرد اطمینان دارید؟"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        در صورت انتخاب گزینه حذف، اگر این عملکرد در هیچ فلوچارتی مورد استفاده قرار نگرفته باشد، از لیست عملکردهای شما حذف خواهد شد.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button startIcon={<DeleteIcon />} variant="contained" color="error" onClick={handleExit}>حذف</Button>
                    <Button startIcon={<Close />} className={style.deleteBtn} onClick={handleClose}>انصراف</Button>
                </DialogActions>
            </Dialog>

            <Dialog className={style.addDialog} open={openEditDialog} onClose={handleClose}>
                <DialogTitle>ویرایش عملکرد</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="عنوان عملکرد"
                        label="عنوان عملکرد"
                        type="text"
                        defaultValue={row.text}
                        fullWidth
                        variant="standard"
                        onChange={handleActionTitle}
                    />
                    <br/>
                    <TextField
                        autoFocus={true}
                        margin="dense"
                        id="url"
                        label="url"
                        fullWidth
                        defaultValue={row.url}
                        variant="standard"
                        onChange={handleURL}
                    />
                </DialogContent>
                <DialogActions>
                    <Button startIcon={<EditIcon />} disabled={!changeTitleFlag || !changeURLFlag} variant={"contained"} color={"primary"} onClick={handleEdit} >ویرایش</Button>
                    <Button startIcon={<Close />} className={style.deleteBtn} onClick={handleClose}>انصراف</Button>
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

const ActionsList = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [actionsList, setActionsList] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [updateList , setUpdateList] = React.useState(false)
    const [open,setOpen] = React.useState(false)
    const [actionTitle,setActionTitle] = React.useState('')
    const [actionURL , setActionURL] = React.useState('')

    React.useEffect(() => {
        getActions({
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
                applicationId: APPLICATIONID
            },
        })
            .then((res) => {
                setActionsList(res.data);
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
        setActionURL('')
        setActionTitle('')
        setOpen(false)
    };

    const handleSenAction = () =>{
        if(actionTitle.trim() === ''){
            toast.error('عنوان نمی‌تواند خالی باشد.')
        }else if(actionURL.trim() === ''){
            toast.error('آدرس URL نمی‌تواند خالی باشد.')
        }
        else{
                const data = {
                    "applicationId": APPLICATIONID,
                    "text": actionTitle.trim(),
                    "url": actionURL.trim(),
                }
                addAction(data,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }).then(()=>{
                    toast.success('عملکرد با موفقیت اضافه شد.')
                    setOpen(false)
                    setActionTitle('')
                    setActionURL('')
                    handleChange()
                }).catch((err)=>{
                    if (err.response.status == 409){
                        toast.error('عنوان عملکرد تکراری می‌باشد.')
                    }
                    else{
                        toast.error('خطا')
                    }
                })

        }
    }

    const handleActionTitle = (event)=>{
        setActionTitle(event.target.value)
    }

    const handleURLChange = (event)=>{
        setActionURL(event.target.value)
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
                            افزودن عملکرد جدید
                        </Button>
                    </div>
                    <Dialog className={style.addDialog} open={open} onClose={handleClose}>
                        <DialogTitle>افزودن عملکرد</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus={true}
                                margin="dense"
                                id="عنوان عملکرد"
                                label="عنوان عملکرد"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleActionTitle}
                            />
                            <br/>
                            <TextField
                                autoFocus={true}
                                margin="dense"
                                id="url"
                                label="url"
                                fullWidth
                                variant="standard"
                                onChange={handleURLChange}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button startIcon={<AddIcon />} variant={"contained"} color={"success"} onClick={handleSenAction}>افزودن</Button>
                            <Button startIcon={<Close />} className={style.deleteBtn} onClick={handleClose}>انصراف</Button>
                        </DialogActions>
                    </Dialog>
                    <TableContainer component={Paper}>
                        <Table aria-label="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align={"center"}>شناسه عملکرد</TableCell>
                                    <TableCell align={"center"}>عنوان عملکرد</TableCell>
                                    <TableCell align={"center"}>URL</TableCell>
                                    <TableCell align={"center"}>وضعیت عملکرد</TableCell>
                                    <TableCell align={"center"}>عملیات</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                        ? actionsList.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        : actionsList
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
                                        count={actionsList.length}
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

export {ActionsList};
