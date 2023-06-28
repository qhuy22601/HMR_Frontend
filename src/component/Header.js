import React from "react";
import { FaSearch, FaBell,FaUserCircle, FaHome,
  FaUser,
  FaMoneyBillAlt,
  FaCog,
  FaCalendarTimes,FaFacebookMessenger } from "react-icons/fa";
import styles from "./styles/Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Contact from "./chat/Contact"
import { allUsersRoute, host } from "./utils/APIRoutes";
import ChatContain from "./chat/ChatContain";
import { io } from "socket.io-client";
import SearchInput from "./searchInput/Index";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Drawer,
  Tooltip,
  Popover,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/solid/ChatBubbleLeftRightIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Facebook } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "./hooks/use-popover";
import { AccountPopover } from "./layouts/dashboard/account-popover";
import { Typography } from "antd";
import { makeStyles } from "@mui/styles";
import { backend } from "./utils/APIRoutes";
import moment from "moment";
const { Title } = Typography;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 300,
  },
  chatContainer: {
    padding: theme.spacing(2),
  },
}));

function Header({ onLoginRedirect, onNavOpen }) {
  const [notificationCount, setNotificationCount] = useState();
  const userName = localStorage.getItem("LastName");
  const id = localStorage.getItem("Id");
  const [notif, setNotif] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mess, setMess] = useState(false);
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showChat, setShowChat] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const SIDE_NAV_WIDTH = 280;
  const TOP_NAV_HEIGHT = 64;
  const accountPopover = usePopover();
  const notificationPopover = usePopover();
  const socket = useRef();

  const handleToggleDrawer = (open) => () => {
    setOpen(open);
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("chat-app-current-user")));
  }, []);
  async function countUnread() {
    try {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BACK_END}/api/absence/count-unread`,
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
        url: `${process.env.REACT_APP_BACK_END}/api/absence/unread`,
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
  }, [notificationCount]);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    getNotif();
    console.log(notif);
    notificationPopover.handleOpen();
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

  const [ava, setAva] = useState(localStorage.getItem("Avata"));

  async function getNotif() {
    const res = await axios.get(`${process.env.REACT_APP_BACK_END}/api/absence/notif`, {
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
      // read()
    }
  }

  function handleCloseChat() {
    setCurrentChat(undefined);
  }

  const classes = useStyles();

  const drawerContent = (
    <Box style={{ width: 300 }}>
      <Contact
        contacts={contacts}
        changeChat={handleChatChange}
        style={{ padding: "16px" }}
      />
    </Box>
  );

  return (
    // <div className={styles.navbar}>
    //   <div className={styles.navbar_container}>
    //     <div className={styles.navbar_search}>
    //       <div className={styles.search_container}>
    //         <input
    //           type="text"
    //           className={styles.search_input}
    //           placeholder="Search"
    //         />
    //         <FaSearch className={styles.search_icon} />
    //       </div>
    //     </div>
    //     <div className={styles.navbar_options}>
    //       <div className={styles.options_container}>
    //         <ul className={styles.sidebar_nav}>
    //           <li className={styles.sidebar_nav_item}>
    //             <Link to="/" className={styles.sidebar_nav_link}>
    //               <FaHome className={styles.sidebar_icon} />
    //               <span className={styles.sidebar_text}>Home</span>
    //             </Link>
    //           </li>
    //           <li className={styles.sidebar_nav_item}>
    //             <Link to="/employee" className={styles.sidebar_nav_link}>
    //               {/* <Link to="/employee"> */}
    //               <FaUser className={styles.sidebar_icon} />
    //               <span className={styles.sidebar_text}>Employees</span>
    //             </Link>
    //             {/* </span> */}
    //           </li>
    //           <li className={styles.sidebar_nav_item}>
    //             <span className={styles.sidebar_nav_link}>
    //               <FaMoneyBillAlt className={styles.sidebar_icon} />
    //               <span className={styles.sidebar_text}>Payslip</span>
    //             </span>
    //           </li>
    //           <li className={styles.sidebar_nav_item}>
    //             <Link to="/leave" className={styles.sidebar_nav_link}>
    //               <FaCalendarTimes className={styles.sidebar_icon} />
    //               <span className={styles.sidebar_text}>Leave</span>
    //             </Link>
    //           </li>
    //           <li className={styles.sidebar_nav_item}>
    //             <span className={styles.sidebar_nav_link}>
    //               <FaCog className={styles.sidebar_icon} />
    //               <span className={styles.sidebar_text}>Settings</span>
    //             </span>
    //           </li>
    //           {/* <li className={styles.sidebar_nav_item} onClick={""}>
    //             <span className={styles.sidebar_nav_link}>
    //               <BiLogOut className={styles.sidebar_icon} />
    //               <span className={styles.sidebar_text}>Log Out</span>
    //             </span>
    //           </li> */}
    //         </ul>
    //       </div>
    //     </div>
    // <div className={styles.mess}>
    //   <FaFacebookMessenger
    //     style={{ color: "#1877F2", fontSize: "24" }}
    //     onClick={handleMessClick}
    //   />
    // {mess && (
    //   <div className={styles.contactsContainer} onClick={handleMessClick}>
    //     <Contact
    //       contacts={contacts}
    //       changeChat={handleChatChange}
    //       className={styles.contacts}
    //     />
    //   </div>
    // )}
    // <div className={styles.chat}>
    //   {currentChat === undefined ? (
    //     <div></div>
    //   ) : (
    //     <ChatContain
    //       currentChat={currentChat}
    //       socket={socket}
    //       className={styles.chatContainer}
    //       onClose={handleCloseChat}
    //     />
    //   )}
    //   </div>
    // </div>
    //     {localStorage.getItem("Token") ? (
    //       <div className={styles.navbar_items}>
    // <div
    //   className={styles.navbar_notification}
    //   onClick={handleBellClick}
    // >
    //   <FaBell className={styles.notification_icon} />
    //   {notificationCount > 0 && (
    //     <div className={styles.notification_count}>
    //       {notificationCount}
    //     </div>
    //   )}
    //   {showNotifications && (
    //     <div className={styles.notification_dropdown}>
    //       {notif.map((notification) => {
    //         return (
    //           <div
    //             key={notification.id}
    //             className={styles.notification_item}
    //           >
    //             <div className={styles.notification_status}>
    //               {notification.status}
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   )}
    // </div>
    //         <div className={styles.navbar_user}>
    //           <FaUserCircle className={styles.user_icon} />
    //           <Link to={`/profile/${id}`}>
    //             {userName}
    //           </Link>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className={styles.navbar_items}>
    //         <a href="/#/login">SignIn</a>
    //       </div>
    //     )}
    //   </div>
    // </div>
    /////////////////////////////////////////////////////////////////////////////
    // <>
    //   <Box
    //     component="header"
    //     sx={{
    //       backdropFilter: "blur(6px)",
    //       // backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
    //       position: "sticky",
    //       left: {
    //         lg: `${SIDE_NAV_WIDTH}px`,
    //       },
    //       top: 0,
    //       width: {
    //         lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
    //       },
    //       zIndex: (theme) => theme.zIndex.appBar,
    //     }}
    //   >
    //     <Stack
    //       alignItems="center"
    //       direction="row"
    //       justifyContent="space-between"
    //       spacing={2}
    //       sx={{
    //         minHeight: TOP_NAV_HEIGHT,
    //         px: 2,
    //       }}
    //     >
    //       <Stack alignItems="center" direction="row" spacing={2}>
    //         {/* {!lgUp && (
    //             <IconButton onClick={onNavOpen}>
    //               <SvgIcon fontSize="small">
    //                 <Bars3Icon />
    //               </SvgIcon>
    //             </IconButton>
    //           )} */}
    //         <Tooltip title="Search">
    //           <IconButton>
    //             <SvgIcon fontSize="small">
    //               <MagnifyingGlassIcon />
    //             </SvgIcon>
    //           </IconButton>
    //         </Tooltip>
    //       </Stack>
    //       {localStorage.getItem("Token") ? (
    //         <Stack alignItems="center" direction="row" spacing={2}>
    //           <Tooltip title="Contacts">
    //             <IconButton>
    //               <SvgIcon fontSize="small">
    //                 <UsersIcon />
    //               </SvgIcon>
    //             </IconButton>
    //           </Tooltip>
    //           <Tooltip title="Notifications">
    //             <IconButton onClick={handleBellClick}>
    //               <Badge
    //                 badgeContent={notificationCount}
    //                 color="success"
    //                 variant="dot"
    //               >
    //                 <SvgIcon fontSize="small">
    //                   <BellIcon />
    //                 </SvgIcon>
    //               </Badge>
    //             </IconButton>
    //           </Tooltip>
    //           <Avatar
    //             onClick={accountPopover.handleOpen}
    //             ref={accountPopover.anchorRef}
    //             sx={{
    //               cursor: "pointer",
    //               height: 40,
    //               width: 40,
    //             }}
    //             src={ava}
    //           />
    //         </Stack>
    //       ) : (
    //         <>
    //           <Link to="/login">
    //             <Typography>SignIn</Typography>
    //           </Link>
    //         </>
    //       )}
    //     </Stack>
    //   </Box>
    //   <AccountPopover
    //     anchorEl={accountPopover.anchorRef.current}
    //     open={accountPopover.open}
    //     onClose={accountPopover.handleClose}
    //   />
    //   <Divider></Divider>
    // </>
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <SearchInput />
          </Stack>
          {/* <Typography>{notificationCount}</Typography> */}
          {localStorage.getItem("Token") ? (
            <Stack alignItems="center" direction="row" spacing={2}>
              {/* <Tooltip title="Contacts">
                <IconButton onClick={handleToggleDrawer(true)}>
                  <SvgIcon fontSize="small">
                    <UsersIcon />
                  </SvgIcon>
                </IconButton>
              </Tooltip> */}
              <Tooltip title="Messenger">
                <IconButton onClick={handleMessClick}>
                  <SvgIcon fontSize="small">
                    <ChatBubbleLeftRightIcon
                      style={{ color: "#1877F2", fontSize: 24 }}
                    />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
              {mess && (
                <div
                  className={styles.contactsContainer}
                  onClick={handleMessClick}
                >
                  <Contact
                    contacts={contacts}
                    changeChat={handleChatChange}
                    className={styles.contacts}
                  />
                </div>
              )}

              <Tooltip title="Notifications">
                <IconButton
                  onClick={handleBellClick}
                  ref={notificationPopover.anchorRef}
                >
                  <Badge
                    badgeContent={notificationCount}
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
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                }}
                src={ava}
              />
              <Popover
                open={notificationPopover.open}
                anchorEl={notificationPopover.anchorRef.current}
                onClose={notificationPopover.handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box p={2} style={{ width: "200px",height:"50%"}}>
                  {notif.map((notification) => (
                    <Typography
                      key={notification.id}
                      style={{
                        display: "flex",
                        padding: "3px",
                        height: "60px",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        justifyContent: "flex-end",
                        alignItems: "stretch",
                        boxShadow: "1px 2px 1px 1px gray",
                        borderRadius:"8px"
                      }}
                    >
                      <Title level={5}>{notification.lastName} </Title>
                      <Typography>
                        {moment(notification.startDate).format("YYYY-MM-DD")}
                      </Typography>
                    </Typography>
                  ))}
                </Box>
              </Popover>
            </Stack>
          ) : (
            <>
              <Link to="/login">
                <Typography>SignIn</Typography>
              </Link>
            </>
          )}
        </Stack>
      </Box>
      <div className={styles.chat}>
        {currentChat === undefined ? (
          <div></div>
        ) : (
          <ChatContain
            currentChat={currentChat}
            socket={socket}
            className={styles.chatContainer}
            onClose={handleCloseChat}
          />
        )}
      </div>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />

      <Divider></Divider>
    </>
  );
}

export default Header;