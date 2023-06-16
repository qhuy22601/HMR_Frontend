// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   MenuItem,
// //   TextField,
// //   Typography,
// //   Divider,
// //   Grid,
// //   Box,
// //   Button,
// //   Collapse,
// //   Card,
// // } from "@mui/material";
// // import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// // import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// // import InputAdornment from "@mui/material/InputAdornment";
// // import AdapterDateFns from "@mui/lab/AdapterDateFns";
// // import EditIcon from "@mui/icons-material/Edit";
// // import LocalizationProvider from "@mui/lab/LocalizationProvider/";
// // import DatePicker from "@mui/lab/DatePicker";

// // export default function  Test(){

// // //       const { associateData, setAssociateData } = useContext(associateContext);
// // //   const { allOffices } = useContext(officesContext);
// // //   const { allDepartments } = useContext(departmentsContext);
// // //   const { updatedAssociate, setUpdatedAssociate } = useContext(
// // //     updatedAssociateContext
// // //   );
// //   const [openPersonal, setOpenPersonal] = useState(true);
// //   const [openPostal, setOpenPostal] = useState(false);
// //   const [personalDisabled, setPersonalDisabled] = useState(true);
// //   const [postalDisabled, setPostalDisabled] = useState(true);

// // //   const CountriesArray = JSON.parse(JSON.stringify(Countries));

// //   const onUpdate = async (event) => {
// //     // if (event.target.name === "Salary") {
// //     //   setUpdatedAssociate({
// //     //     ...updatedAssociate,
// //     //     [event.target.name]: event.target.value.replaceAll(",", ""),
// //     //   });
// //     // } else {
// //     //   setUpdatedAssociate({
// //     //     ...updatedAssociate,
// //     //     [event.target.name]: event.target.value,
// //     //   });
// //     // }
// //   };
// //   const formatter = new Intl.NumberFormat(undefined, {
// //     maximumSignificantDigits: 3,
// //   });
// //   const onUpdateNested = (event) => {
// //     // setUpdatedAssociate({
// //     //   ...updatedAssociate,
// //     //   PostalAddress: {
// //     //     ...updatedAssociate.PostalAddress,
// //     //     [event.target.name]: event.target.value,
// //     //   },
// //     // });
// //   };

// //   const handleOpenPersonal = () => {
// //     setOpenPersonal((prev) => !prev);
// //   };

// //   const EditButtonStyles = {
// //     mt: 2,
// //     bgcolor: "grey.200",
// //     border: "2px solid",
// //     boxShadow: "none",
// //     // color: postalDisabled || personalDisabled ? "#abb2b9" : "black",
// //     color: "#abb2b9",
// //     "&:hover": {
// //       backgroundColor: "#e6ebf0",
// //       color: "#4782da",
// //     },
// //   };

// //   const DisabledTextBox = {
// //     "& .Mui-disabled": {
// //       opacity: 0.8,
// //       "-webkit-text-fill-color": "black",
// //     },
// //   };
// //   return (
// //     <Card style={{width:"80%"}}>
// //       <Box sx={{ p: 0, pb: 1 }} dir="ltr">
// //         <Grid
// //           container
// //           columnSpacing={2}
// //           rowSpacing={2}
// //           direction="row"
// //           justifyContent="flex-end"
// //           alignItems="flex-end"
// //         ></Grid>
// //         <Grid container direction="rows" justifyContent="space-between">
// //           <Grid item>
// //             <Button
// //               sx={{ mt: 2 }}
// //               variant="standard"
// //               endIcon={
// //                 openPersonal ? (
// //                   <KeyboardArrowUpIcon />
// //                 ) : (
// //                   <KeyboardArrowDownIcon />
// //                 )
// //               }
// //               onClick={handleOpenPersonal}
// //             >
// //               <Typography variant="overline">Personal</Typography>
// //             </Button>
// //           </Grid>
// //           <Grid item>
// //             {openPersonal && (
// //               <>
// //                 <Button
// //                   sx={EditButtonStyles}
// //                   variant="contained"
// //                   color="primary"
// //                   endIcon={<EditIcon />}
// //                   onClick={() => setPersonalDisabled((prev) => !prev)}
// //                 >
// //                   Edit
// //                 </Button>
// //                 {!personalDisabled && (
// //                   <Button
// //                     sx={{ mt: 2, ml: 2 }}
// //                     variant="contained"
// //                     color="primary"
// //                     // onClick={() => updateFirebaseAndState()}
// //                   >
// //                     Save
// //                   </Button>
// //                 )}
// //               </>
// //             )}
// //           </Grid>
// //         </Grid>

// //         <Collapse in={openPersonal} timeout="auto" unmountOnExit>
// //           <Grid
// //             sx={{ p: 1, pb: 5, pt: 5 }}
// //             container
// //             columnSpacing={2}
// //             rowSpacing={2}
// //             direction="row"
// //             justifyContent="flex-start"
// //             alignItems="flex-start"
// //           >
// //             <Grid item xs={8} xl={4}>
// //               <TextField
// //                 style={{ width: "100%" }}
// //                 variant="standard"
// //                 size="small"
// //                 name="FirstName"
// //                 label="First Name"
// //                 disabled={personalDisabled}
// //                 sx={DisabledTextBox}
// //                 onChange={(e) => onUpdate(e)}
// //               />
// //             </Grid>
// //             <Grid item xs={8} xl={4}>
// //               <TextField
// //                 disabled={personalDisabled}
// //                 style={{ width: "100%" }}
// //                 size="small"
// //                 variant="standard"
// //                 name="LastName"
// //                 label="Last Name"
// //                 onChange={(e) => onUpdate(e)}
// //                 sx={DisabledTextBox}
// //               />
// //             </Grid>
// //             <Grid item xs={12} xl={4}>
// //               <TextField
// //                 disabled={personalDisabled}
// //                 style={{ width: "100%" }}
// //                 size="small"
// //                 variant="standard"
// //                 name="Title"
// //                 label="Title"
// //                 onChange={(e) => onUpdate(e)}
// //                 sx={DisabledTextBox}
// //               />
// //             </Grid>
// //             <Grid item xs={8} xl={4}>
// //               <TextField
// //                 style={{ width: "100%" }}
// //                 size="small"
// //                 disabled={personalDisabled}
// //                 variant="standard"
// //                 name="PhoneNumber"
// //                 label="Phone Number"
// //                 onChange={(e) => onUpdate(e)}
// //                 sx={DisabledTextBox}
// //               />
// //             </Grid>
// //             <Grid item xs={7} xl={4}>
// //               <TextField
// //                 size="small"
// //                 disabled={personalDisabled}
// //                 variant="standard"
// //                 style={{ width: "100%" }}
// //                 onChange={(e) => onUpdate(e)}
// //                 select // tell TextField to render select
// //                 name="EmplStatus"
// //                 label="Employment Status"
// //                 sx={DisabledTextBox}
// //               >
// //                 <MenuItem key={"Employed"} value="Employed">
// //                   Employed
// //                 </MenuItem>
// //                 <MenuItem key={"Terminated"} value="Terminated">
// //                   Terminated
// //                 </MenuItem>
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} xl={4}>
// //               <TextField
// //                 disabled={personalDisabled}
// //                 variant="standard"
// //                 style={{ width: "100%" }}
// //                 size="small"
// //                 name="WorkEmail"
// //                 label="Work Email"
// //                 onChange={(e) => onUpdate(e)}
// //                 sx={DisabledTextBox}
// //               />
// //             </Grid>
// //             <Grid item xs={12} xl={4}>
// //               <TextField
// //                 disabled={personalDisabled}
// //                 variant="standard"
// //                 style={{ width: "100%" }}
// //                 size="small"
// //                 name="PrivateEmail"
// //                 label="Private Email"
// //                 onChange={(e) => onUpdate(e)}
// //                 sx={DisabledTextBox}
// //               />
// //             </Grid>
// //             <Grid item xs={5} xl={3}>
// //               <TextField
// //                 disabled={personalDisabled}
// //                 variant="standard"
// //                 onChange={(e) => onUpdate(e)}
// //                 select // tell TextField to render select
// //                 name="Gender"
// //                 label="Gender"
// //                 size="small"
// //                 sx={DisabledTextBox}
// //               >
// //                 <MenuItem key={"Male"} value="Male">
// //                   Male
// //                 </MenuItem>
// //                 <MenuItem key={"Female"} value="Female">
// //                   Female
// //                 </MenuItem>
// //               </TextField>
// //             </Grid>
// //             <Grid item>
// //               <DatePicker
// //                 sx={DisabledTextBox}
// //                 disabled={personalDisabled}
// //                 variant="standard"
// //                 size="small"
// //                 label="Date of Birth"
// //                 name="DOB"
// //                 renderInput={(params) => (
// //                   <TextField
// //                     {...params}
// //                     variant="standard"
// //                     sx={DisabledTextBox}
// //                   />
// //                 )}
// //               />
// //             </Grid>
// //             <Grid item xs={8} xl={4}>
// //               <TextField
// //                 sx={DisabledTextBox}
// //                 disabled={personalDisabled}
// //                 style={{ width: "100%" }}
// //                 size="small"
// //                 variant="standard"
// //                 name="Salary"
// //                 label="Salary"
// //                 onChange={(e) => onUpdate(e)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">VND</InputAdornment>
// //                   ),
// //                 }}
// //               />
// //             </Grid>
// //           </Grid>
// //         </Collapse>
// //       </Box>
// //     </Card>
// //   );
// // };

// import { subDays, subHours } from 'date-fns';
// import { Box, Card, Container, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from './layouts/dashboard/layout';
// import { OverviewBudget } from './sections/overview/overview-budget';
// import { OverviewLatestOrders } from './sections/overview/overview-latest-orders';
// import { OverviewLatestProducts } from './sections/overview/overview-latest-products';
// import { OverviewSales } from './sections/overview/overview-sales';
// import { OverviewTasksProgress } from './sections/overview/overview-tasks-progress';
// import { OverviewTotalCustomers } from './sections/overview/overview-total-customers';
// import { OverviewTotalProfit } from './sections/overview/overview-total-profit';
// import { OverviewTraffic } from './sections/overview/overview-traffic';
// import FileDisplay from "./pages/FileDisplay";
// const now = new Date();
// function Test(){

//   return (
//     <>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8,
//         }}
//       >
//         <Container maxWidth="xl">
//           <Grid container spacing={3}>
//             <Grid xs={12} sm={6} lg={3}>
//               <OverviewBudget
//                 difference={12}
//                 positive
//                 sx={{ height: "100%" }}
//                 value="$24k"
//               />
//             </Grid>
//             <Grid xs={12} sm={6} lg={3}>
//               <OverviewTotalCustomers
//                 difference={16}
//                 positive={false}
//                 sx={{ height: "100%" }}
//                 value="1.6k"
//               />
//             </Grid>
//             <Grid xs={12} sm={6} lg={3}>
//               <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
//             </Grid>
//             <Grid xs={12} sm={6} lg={3}>
//               <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
//             </Grid>
//             <Grid xs={12} lg={8}>
//               <Box>
//                 Sale
//               </Box>
//             </Grid>
//             <Grid xs={12} md={6} lg={4}>
//               <Card>
//                 <FileDisplay></FileDisplay>
//               </Card>
//             </Grid>
//             <Grid xs={12} md={6} lg={4}>
//               <Box>
//                 product
//               </Box>
//             </Grid>
//             <Grid xs={12} md={12} lg={8}>
//               <Box>order</Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// }

// export default Test;



function Test(){
  return(
    <>
    </>
  );
}

export default Test;