import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const AuthCard = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout(auth);
      navigate("/");
    } catch {
      console.log("Falha ao sair");
    }
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar src={props.avatarSrc} />
      </IconButton>
      <Typography>
        {props.displayName}
      </Typography>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default AuthCard;
