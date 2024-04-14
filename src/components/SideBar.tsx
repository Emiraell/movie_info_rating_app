import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

interface IProps {
  openDrawer: boolean;
  toggleDrawer: () => void;
  navItems: { name: string; path: string }[];
}

export default function SideBar({
  openDrawer,
  toggleDrawer,
  navItems,
}: IProps) {
  return (
    <nav>
      <Drawer
        variant="temporary"
        sx={{ display: { sm: "none" } }}
        open={openDrawer}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ textAlign: "center", my: 3, paddingX: 5 }}>
          <Typography fontWeight="bold" color="red" variant="h6">
            Emiflix
          </Typography>

          <List sx={{ marginTop: 3 }}>
            {navItems.map((item) => (
              <ListItem key={item.name}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}
