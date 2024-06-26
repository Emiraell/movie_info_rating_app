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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SideBar from "./SideBar";
import { useAppSelector } from "../store/store";

export default function Header() {
  // links name and path for both side bar and header
  const navItems: { name: string; path: string }[] = [
    { name: "Home", path: "" },
    { name: "Movies", path: "movies" },
    { name: "Tv Shows", path: "tvshows" },
    { name: "Rated", path: "rated" },
  ];
  // naviage api to navigate around the webpage
  const navigate = useNavigate();

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
        sx={{ backgroundColor: "#05193a" }}
      >
        <Toolbar>
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              letterSpacing: 2,
              color: "yellow",
              cursor: "pointer",
            }}
            onClick={() => navigate("/movie_info_rating_app")}
          >
            Emiflix
          </Typography>
          {userLoggedIn && (
            // display header links if user is logged in
            <Box
              sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
            >
              {navItems.map((item) => (
                <Button key={item.name} sx={{ color: "red" }}>
                  <Link to={`movie_info_rating_app/${item.path}`}>
                    {item.name}
                  </Link>
                </Button>
              ))}
              <Tooltip
                title={"logout"}
                sx={{ mx: 2, bgcolor: "green", cursor: "pointer" }}
              >
                <Avatar>{name[0]?.toUpperCase()}</Avatar>
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
