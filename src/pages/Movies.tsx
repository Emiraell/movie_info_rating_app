import { Toolbar } from "@mui/material";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Movies() {
  return (
    <>
      <Header />
      <Toolbar />
      <Hero homePage={false} pageName="Movies" />
    </>
  );
}
