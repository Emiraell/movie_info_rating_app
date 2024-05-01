import { Button } from "@mui/material";
import { useAppDispatch } from "../store/store";
import { fetchPopularMovies } from "../store/features/movies/Popular";
import { Dispatch, SetStateAction } from "react";
import { fetchTopRated } from "../store/features/movies/TopRated";
import { fetchTrending } from "../store/features/movies/Trending";

interface IProps {
  setPopular: Dispatch<SetStateAction<boolean>>;
  setTopRated: Dispatch<SetStateAction<boolean>>;
  setTrending: Dispatch<SetStateAction<boolean>>;
  popular: boolean;
  topRated: boolean;
  trending: boolean;
}
export default function NavButtons({
  setPopular,
  setTopRated,
  setTrending,
  popular,
  topRated,
  trending,
}: IProps) {
  const buttons: string[] = ["Movies", "Tv Shows"];

  const dispatch = useAppDispatch();
  return (
    <div className="text-gray-50 py-7 text-center">
      {/* <ButtonGroup> */}
      {buttons.map((button) => (
        <button
          className="mx-3"
          onClick={() => {
            if (popular) {
              if (button === "Movies") {
                dispatch(fetchPopularMovies("movie"));
                setPopular(true);
                console.log("popularMovie");
              } else {
                dispatch(fetchPopularMovies("tv"));
                setPopular(false);
                console.log("popularTv");
              }
            } else if (topRated) {
              if (button === "Movies") {
                dispatch(fetchTopRated("movie"));
                setTopRated(true);
                console.log("topMovie");
              } else {
                dispatch(fetchTopRated("tv"));
                setTopRated(false);
                console.log("toptv");
              }
            } else if (trending) {
              if (button === "Movies") {
                dispatch(fetchTrending("movie"));
                setTrending(true);
                console.log("trendingMovie");
              } else {
                dispatch(fetchTrending("tv"));
                setTrending(false);
                console.log("trendingtv");
              }
            }
          }}
          // variant="outlined"
          // sx={{
          //   mx: 1,
          //   letterSpacing: 2,
          //   backgroundColor: "transparent",
          //   border: "1px solid yellow",
          //   borderRadius: 10,
          // }}
          key={button}
        >
          {button}
        </button>
      ))}
      {/* </ButtonGroup> */}
    </div>
  );
}
