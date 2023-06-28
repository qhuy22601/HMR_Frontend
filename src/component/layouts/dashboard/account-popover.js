import { useCallback, useState } from 'react';
// import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import axios from 'axios';
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  // const router = useRouter();

  const handleSignOut = useCallback(() => {
    onClose?.();
    axios
      .post(`${process.env.REACT_APP_BACK_END}/api/auth/logout`)
      .then((response) => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Sign-out failed:", error);
      });
  }, [onClose]);

  const [id, setId] = useState(localStorage.getItem("Id"))
  const [name, setName] = useState(
    localStorage.getItem("FirstName") + " " + localStorage.getItem("LastName")
  );


  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Tài khoản</Typography>
        <Typography color="text.secondary" variant="body2">
          {name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
