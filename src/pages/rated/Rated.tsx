import { Toolbar } from "@mui/material";
import Header from "../../components/Header";
import RatedMovies from "./Movies";

export default function Rated() {
  return (
    <div>
      <Header />
      <Toolbar />
      <RatedMovies />
    </div>
  );
}
