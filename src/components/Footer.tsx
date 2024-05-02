import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="text-gray-200 bg-blue-950 text-center py-2 tracking-wider md:text-lg">
      <Typography
        component="div"
        sx={{ letterSpacing: 2, color: "yellow", fontSize: 20 }}
      >
        Emifix
      </Typography>
      <div className="flex justify-center gap-10 py-2 text-blue-300">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/tvshows">Tvshows</Link>
      </div>
      <p>
        coypright 2024 | All right reserved by{" "}
        <a href="" className="text-yellow-300 italic cursor-pointer">
          Emiflix
        </a>
      </p>
    </div>
  );
}
