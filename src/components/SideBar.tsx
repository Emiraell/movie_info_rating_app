import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/features/Auth";

// recived props
interface SideBarProps {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  navItems: { name: string; path: string }[];
}

export default function SideBar({
  openDrawer,
  setOpenDrawer,
  navItems,
}: SideBarProps) {
  const name: string = useAppSelector((state) => state.userAuth.name);
  const dispatch = useAppDispatch();
  return (
    <nav>
      {/* A drawer for the side using drawer api material ui */}
      <Drawer
        PaperProps={{ sx: { backgroundColor: "#051124", width: 240 } }}
        variant="temporary"
        sx={{ display: { sm: "none" } }}
        open={openDrawer}
        onClose={() => setOpenDrawer(!openDrawer)}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            textAlign: "center",
            my: 3,
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", color: "#ffeb3b", letterSpacing: 2 }}
            variant="h6"
          >
            Emiflix
          </Typography>
          <Divider />3{/* Link list */}
          <List sx={{ mt: 1 }}>
            {navItems.map((item) => (
              <ListItem
                key={item.name}
                sx={{ textAlign: "center", cursor: "pointer" }}
              >
                <Link to={item.path} className=" w-full text-gray-200 ">
                  <ListItemText primary={item.name} />
                </Link>
              </ListItem>
            ))}
          </List>
          <Tooltip title="logout" onClick={() => dispatch(logout())}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                mt: 1,
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Avatar>{name[0]?.toUpperCase()}</Avatar>
              <Typography
                className=" text-emerald-500"
                sx={{ fontSize: 18, letterSpacing: 2 }}
              >
                {name.substring(0, 7)}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Drawer>
    </nav>
  );
}
