import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { SideNav } from "../component/layouts/dashboard/side-nav";
import { TopNav } from "../component/layouts/dashboard/top-nav";
import FileDisplay from "./pages/FileDisplay";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";
import Header from "./Header";
import {
  Box,
  Card,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "./layouts/dashboard/layout";
import { OverviewBudget } from "./sections/overview/overview-budget";
import { OverviewLatestOrders } from "./sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "./sections/overview/overview-latest-products";
import { OverviewSales } from "./sections/overview/overview-sales";
import { OverviewTasksProgress } from "./sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "./sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "./sections/overview/overview-total-profit";
import { OverviewTraffic } from "./sections/overview/overview-traffic";
import BirthDate from "./pages/BirthDate";
import { backend } from "./utils/APIRoutes";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled.div`
  display: flex;
  flex: 1 1 auto;
  max-width: 100%;
  ${({ theme }) => `
    @media (min-width: ${theme.breakpoints}px) {
      padding-left: ${SIDE_NAV_WIDTH}px;
    }
  `}
`;

const LayoutContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: 100%;
`;

export default function State() {
  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, [location.pathname, handlePathnameChange]);

  return (
    <ThemeProvider theme={createTheme()}>
      <>
        {/* <TopNav onNavOpen={() => setOpenNav(true)} onLoginRedirect={handleLoginRedirect} /> */}
        <Header onLoginRedirect={handleLoginRedirect}></Header>
        <SideNav onClose={() => setOpenNav(false)} open={openNav} />
        <LayoutRoot>
          <LayoutContainer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8,
                width: "80%",
                marginLeft: "auto",
                marginRight: 0,
              }}
            >
              <Container maxWidth="xl">
                <Grid container spacing={3}>
                  <Grid xs={12} sm={6} lg={3}>
                    <OverviewBudget
                      difference={12}
                      positive
                      sx={{ height: "100%" }}
                      value="$24k"
                    />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3}>
                    <OverviewTotalCustomers
                      difference={16}
                      positive={false}
                      sx={{ height: "100%" }}
                      value="1.6k"
                    />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3}>
                    <OverviewTasksProgress
                      sx={{ height: "100%" }}
                      value={75.5}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} lg={3}>
                    <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
                  </Grid>
                  <Grid xs={12} lg={8}>
                    <Box
                      style={{
                        backgroundImage:
                          "url('https://marketplace.canva.com/EAE9XG0hOgk/1/0/1600w/canva-pink-red-colorful-birthday-zoom-virtual-background-32bHJ9XZg4U.jpg')",
                        backgroundSize: "cover",
                        padding: "10px",

                        minHeight: "645px", // Adjust the height as needed
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          marginBottom: "40px",
                        }}
                      >
                        Sinh nhật trong tháng:{" "}
                      </Typography>
                      <BirthDate></BirthDate>
                    </Box>
                  </Grid>
                  <Grid xs={12} md={6} lg={4}>
                    <Card>
                      <Typography
                        variant="h4"
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        Tin:{" "}
                      </Typography>
                      <FileDisplay></FileDisplay>
                    </Card>
                  </Grid>
                  <Grid xs={12} md={6} lg={4}>
                    <Box>product</Box>
                  </Grid>
                  <Grid xs={12} md={12} lg={8}>
                    <Box>order</Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </LayoutContainer>
        </LayoutRoot>
      </>
    </ThemeProvider>
  );
}
