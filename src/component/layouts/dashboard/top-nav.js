import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import Contact from "../../chat/Contact";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import ChatContain from "../../chat/ChatContain";
import { io } from "socket.io-client";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import { alpha } from '@mui/material/styles';
import { usePopover } from "../../hooks/use-popover";
import { AccountPopover } from './account-popover';
import { createTheme } from "../../theme";
import axios from "axios";
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;





export const TopNav = (props) => {
  const { onNavOpen } = props;
  const {onLoginRedirect} = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const [notificationCount, setNotificationCount] = useState();
  const userName = localStorage.getItem("LastName");
  const id = localStorage.getItem("Id");
  const [notif, setNotif] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mess, setMess] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);


  const socket = useRef();
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("chat-app-current-user")));
  }, []);


  async function countUnread() {
    try {
      const res = await axios({
        method: "get",
        url: "/api/absence/count-unread",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      });
      setNotificationCount(res.data);
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 500) {
        onLoginRedirect();
      }
    }
  }
  async function read() {
    try {
      const res = await axios({
        method: "put",
        url: "/api/absence/unread",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      });
    } catch (error) {
      console.log(error.response.status);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      countUnread();
    }
    console.log("saasasassaas: " + notificationCount)
  }, []);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    getNotif();
    console.log(notif);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  const handleMessClick = () => {
    setMess(!mess);
  };

  async function getAll() {
    const res = await axios.get(`${allUsersRoute}/${currentUser.id}`);
    setContacts(res.data);
  }

  useEffect(() => {
    if (currentUser) {
      getAll();
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  async function getNotif() {
    const res = await axios.get("/api/absence/notif", {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    });
    if (res.data != null && res.data.status === "Fail") {
      console.log(res.data.mess);
    }
    if (res.data != null && res.data.status === "Success") {
      console.log(res.data.mess);
      setNotif(res.data.payload);
      read();
    }
  }

  function handleCloseChat() {
    setCurrentChat(undefined);
  }



  return (
    <ThemeProvider theme={createTheme}> 
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src=""
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      
      <Divider></Divider>
    </>
    </ThemeProvider>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
  onLoginRedirect: PropTypes.func,
};
