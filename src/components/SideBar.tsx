import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface IProps {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  navItems: { name: string; path: string }[];
}

export default function SideBar({
  openDrawer,
  setOpenDrawer,
  navItems,
}: IProps) {
  return (
    <nav>
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

          <List sx={{ marginTop: 3 }}>
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
