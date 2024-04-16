import { Box, TextField, Toolbar, Typography } from "@mui/material";
import Header from "../../components/Header";
import movie from "../../assets/Images/movie_1.jpg";

export default function Main() {
  return (
    <>
      <Box sx={{}}>
        <Header />
        <Toolbar />
        {/* <Box> */}
        <div
          className=" h-[40vh] md:h-[50vh] bg-gray-700 bg-cover bg-no-repeat bg-blend-multiply"
          style={{ backgroundImage: `url(${movie})` }}
        >
          <div className=" w-[70%] m-auto md:w-[50%] py-10 tracking-wider">
            <div className=" font-bold text-2xl">
              <p className=" text-yellow-300 py-2 italic">Emiflix</p>

              <p className=" text-gray-200">
                Unlimited <span className=" text-yellow-300">Movies</span>{" "}
                <br /> TVs Shows, & More.
              </p>
            </div>
            <div className="py-10">
              <Typography color="white">Start streaming now</Typography>
              <input
                type="text"
                className=" outline-none bg-gray-300 rounded w-full p-1"
              />
            </div>
          </div>
        </div>
        {/* </Box> */}
      </Box>
    </>
  );
}
