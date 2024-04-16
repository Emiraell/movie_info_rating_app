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

export default function Header() {
  const navItems: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Tv Shows", path: "/tvshows" },
  ];

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  return (
    <Box>
      <AppBar elevation={0} component={"nav"} sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            Emifix
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: "red" }}>
                <Link to={item.path}>{item.name}</Link>
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            size="large"
            sx={{ display: { sm: "none" } }}
            onClick={toggleDrawer}
          >
            {!openDrawer && <MenuIcon />}
          </IconButton>
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
