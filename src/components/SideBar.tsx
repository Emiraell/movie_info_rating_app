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
        PaperProps={{ sx: { backgroundColor: "black" } }}
        variant="temporary"
        sx={{ display: { sm: "none" } }}
        open={openDrawer}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            textAlign: "center",
            my: 3,
            width: 240,
          }}
        >
          <Typography fontWeight="bold" color="red" variant="h6">
            Emiflix
          </Typography>

          <List sx={{ marginTop: 3 }}>
            {navItems.map((item) => (
              <ListItem key={item.name}>
                <ListItemText
                  primary={item.name}
                  sx={{ textAlign: "center", color: "wheat" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}
