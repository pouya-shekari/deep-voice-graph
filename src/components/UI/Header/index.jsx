import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";

import LOGO from "@assets/media/hara.png";

import Modal from "@cmp/UI/Modal";
import Breadcrumb from "@cmp/UI/Breadcrumbs";

import useModal from "@hooks/useModal";
import useAuth from "@hooks/useAuth";
import HomeIcon from "@mui/icons-material/Home";
import {ConfirmationModal} from "@cmp/UI/Modal/ConfirmationModal";
const Header = () => {
  const auth = useAuth();
  const modal = useModal();
  const showLogoutModal = () => {
    modal.show({ isLogoutModalOpen: true });
  };

  const logoutHandler = () => {
    modal.close();
    auth.signout();
  };

  const closeModalHandler = () => {
      modal.close();
  };

  return (
    <>
        <ConfirmationModal
            label={"logout-modal"}
            open={modal.modalStates.isLogoutModalOpen}
            title={"آیا قصد خروج از حساب کاربری خود را دارید؟"}
            description={
                "در صورت خروج از حساب کاربری خود، برای استفاده مجدد از سرویس باید فرآیند ورود را انجام دهید."
            }
            actions={[
                {
                    label:'خروج' ,
                    icon: <ExitToAppIcon sx={{ transform: "rotate(180deg)" }} />,
                    type:"error",
                    onClickHandler:logoutHandler
                },
                {
                    label:'انصراف' ,
                    icon: <CloseIcon />,
                    type: "cancel",
                    onClickHandler:closeModalHandler
                }
            ]}
        />
      <Box>
        <AppBar component="nav" sx={{ backgroundColor: "rgb(45,55,145)" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component="div"
              onClick={() => {}}
              sx={{
                cursor: "pointer",
                display: { xs: "none", sm: "inline" },
              }}
            >
              هوش افزار راهبر آریامن
            </Typography>
            <Avatar
              onClick={() => {}}
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
              edge="end"
              onClick={showLogoutModal}
              sx={{ transform: "rotate(180deg)" }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
          <Breadcrumb />
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
