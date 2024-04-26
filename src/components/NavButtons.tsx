import { Button } from "@mui/material";
import { useAppDispatch } from "../store/store";
import { fetchPopularMovies } from "../store/features/movies/Popular";
import { Dispatch, SetStateAction } from "react";
import { fetchTopRated } from "../store/features/movies/TopRated";

interface IProps {
  setPopular: Dispatch<SetStateAction<boolean>>;
  setTopRated: Dispatch<SetStateAction<boolean>>;
  popular: boolean;
  topRated: boolean;
}
export default function NavButtons({
  setPopular,
  setTopRated,
  popular,
  topRated,
}: IProps) {
  const buttons: string[] = ["Movies", "Tv Shows"];

  const dispatch = useAppDispatch();
  // const displayPopularMovies = (name) => {
  // 	dispatch(fetchPopularMovies("movie"))
  // }
  return (
    <div className="text-gray-50 py-7 text-center">
      {/* <ButtonGroup> */}
      {buttons.map((button) => (
        <Button
          onClick={() => {
            if (popular) {
              if (button === "Movies") {
                dispatch(fetchPopularMovies("movie"));
                setPopular(true);
              } else {
                dispatch(fetchPopularMovies("tv"));
                setPopular(false);
              }
            } else if (topRated) {
              if (button === "Movies") {
                dispatch(fetchTopRated("movie"));
                setTopRated(true);
              } else {
                dispatch(fetchTopRated("tv"));
                setTopRated(false);
              }
            }
          }}
          variant="outlined"
          sx={{
            mx: 1,
            letterSpacing: 2,
            backgroundColor: "transparent",
            border: "1px solid yellow",
            borderRadius: 10,
          }}
          key={button}
        >
          {button}
        </Button>
      ))}
      {/* </ButtonGroup> */}
    </div>
  );
}
