import { Button } from "@mui/material";
import { useAppDispatch } from "../store/store";
import { fetchPopularMovies } from "../store/features/movies/Popular";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setPopular: Dispatch<SetStateAction<boolean>>;
}
export default function NavButtons({ setPopular }: IProps) {
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
            if (button === "Movies") {
              dispatch(fetchPopularMovies("movie"));
              setPopular(true);
            } else {
              dispatch(fetchPopularMovies("tv"));
              setPopular(false);
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
