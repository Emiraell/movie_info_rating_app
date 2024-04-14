import { Box, Toolbar } from "@mui/material";
import Header from "../../components/Header";

export default function Main() {
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Header />
        <Toolbar />
        <Box component="main"></Box>
      </Box>
    </>
  );
}
