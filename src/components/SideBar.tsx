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
  const { name } = useAppSelector((state) => state.userAuth);
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
          <Divider />

          <Tooltip title="logout" onClick={() => dispatch(logout())}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                mt: 3,
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Avatar>{name[0]}</Avatar>
              <Typography>{name}</Typography>
            </Box>
          </Tooltip>
          {/* Link list */}
          <List sx={{ mt: 1 }}>
            {navItems.map((item) => (
              <ListItem key={item.name} sx={{ textAlign: "center" }}>
                <Link to={item.path} className=" w-full text-gray-200 ">
                  <ListItemText primary={item.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}
