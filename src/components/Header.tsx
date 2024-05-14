import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import SideBar from "./SideBar";
import { useAppSelector } from "../store/store";

export default function Header() {
  // links name and path for both side bar and header
  const navItems: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Tv Shows", path: "/tvshows" },
    { name: "Rated", path: "/rated" },
  ];

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  // check if user is logged in
  const { guestId: userLoggedIn, name } = useAppSelector(
    (state) => state.userAuth
  );

  return (
    <>
      <AppBar
        elevation={0}
        component={"nav"}
        sx={{ backgroundColor: "#051124" }}
      >
        <Toolbar>
          <Typography
            component="div"
            sx={{ flexGrow: 1, letterSpacing: 2, color: "yellow" }}
          >
            Emifix
          </Typography>
          {userLoggedIn && (
            // display header links if user is logged in
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item.name} sx={{ color: "red" }}>
                  <Link to={item.path}>{item.name}</Link>
                </Button>
              ))}
              <Tooltip title={"logout"}>
                <Avatar>{name.substring(0, 1)}</Avatar>
              </Tooltip>
            </Box>
          )}
          {userLoggedIn && (
            <IconButton
              color="inherit"
              size="large"
              sx={{ display: { sm: "none" } }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              {!openDrawer && <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* side bar for small screens */}
      <SideBar
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        navItems={navItems}
      />
    </>
  );
}
