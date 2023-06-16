import React from "react";
import { Popover, Box, Typography } from "@mui/material";

function NotificationPopover({ open, anchorEl, onClose, notifications }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ p: 2, minWidth: 200 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Notifications
        </Typography>
        <div>
          {notifications.map((notification) => (
            <div key={notification.id}>
              <Typography>{notification.message}</Typography>
            </div>
          ))}
        </div>
      </Box>
    </Popover>
  );
}

export default NotificationPopover;
