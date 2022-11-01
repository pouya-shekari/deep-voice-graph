import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LOGO from "../../../../assets/media/hara.png";
import { PATHS } from "../../../../config/routes.config";
import {IS_LOGGED_IN, TOKEN} from "../../../../config/variables.config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = (props) => {
  const [open, setOpen] = React.useState(false);
  const [exit, setExit] = React.useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    setOpen(false);
    setExit(true);
  };

  React.useEffect(() => {
    if (exit) {
      localStorage.removeItem(IS_LOGGED_IN);
      localStorage.removeItem(TOKEN)
      toast.success("خروج با موفقیت انجام شد.");
      navigate(PATHS.LOGIN);
    }
  }, [exit]);

  return (
    <Box>
      <AppBar component="nav" sx={{ backgroundColor: "rgb(45,55,145)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            onClick={() => {
              navigate(PATHS.HOME);
            }}
            sx={{
              cursor: "pointer",
              display: { xs: "none", sm: "inline" },
            }}
          >
            هوش افزار راهبر آریامن
          </Typography>
          <Avatar
            onClick={() => {
              navigate(PATHS.HOME);
            }}
            sx={{
              backgroundColor: "transparent",
              mt: 1,
              display: { xs: "inline", sm: "none" },
            }}
            variant="rounded"
          >
            <img src={LOGO} width={30} height={30} alt={"LOGO"} />
          </Avatar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={logoutHandler}
            sx={{ mr: 2, transform: "rotate(180deg)" }}
          >
            <ExitToAppIcon />
          </IconButton>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {"آیا قصد خروج از حساب کاربری خود را دارید؟"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                در صورت خروج از حساب کاربری خود، برای استفاده مجدد از سرویس،
                باید فرآیند ورود را انجام دهید.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleExit}>خروج</Button>
              <Button onClick={handleClose}>لغو</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export { Header };
