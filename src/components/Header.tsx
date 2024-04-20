import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import SideBar from "./SideBar";
import { useAppSelector } from "../store/features/store";

export default function Header() {
  const navItems: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Tv Shows", path: "/tvshows" },
  ];

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  const userLoggedIn: null | string = useAppSelector(
    (state) => state.userAuth.guestId
  );

  return (
    <Box>
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
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item.name} sx={{ color: "red" }}>
                  <Link to={item.path}>{item.name}</Link>
                </Button>
              ))}
            </Box>
          )}{" "}
          {userLoggedIn && (
            <IconButton
              color="inherit"
              size="large"
              sx={{ display: { sm: "none" } }}
              onClick={toggleDrawer}
            >
              {!openDrawer && <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <SideBar
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        navItems={navItems}
      />
    </Box>
  );
}
