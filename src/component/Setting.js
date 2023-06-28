import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsPassword } from "./sections/setting/settings-password";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "./theme";
import Header from "./Header";
import styled from "styled-components";
import { SideNav } from "../component/layouts/dashboard/side-nav";
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

function Setting() {
  const handleLoginRedirect = () => {
    window.location.href = "#/login";
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
        <Header onLoginRedirect={handleLoginRedirect}></Header>
        <SideNav onClose={() => setOpenNav(false)} open={openNav} />
        <LayoutRoot>
          <LayoutContainer>
            <>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 8,
                  marginLeft: "auto",
                  marginRight: 0,
                  width: "80%",
                }}
              >
                <Container maxWidth="lg">
                  <Stack spacing={3}>
                    <Typography variant="h4">Cài đặt</Typography>
                    <SettingsPassword />
                  </Stack>
                </Container>
              </Box>
            </>
          </LayoutContainer>
        </LayoutRoot>
      </>
    </ThemeProvider>
  );
}

export default Setting;
