import { Button } from "@mui/material";
import { useAppDispatch } from "../store/store";
import { fetchPopularMovies } from "../store/features/Movies";

export default function NavButtons() {
  const buttons: string[] = ["Movies", "Tv Shows"];

  const dispatch = useAppDispatch();
  return (
    <div className="text-gray-50 py-7 text-center">
      {/* <ButtonGroup> */}
      {buttons.map((button) => (
        <Button
          onClick={() => {
            button === "Movies"
              ? dispatch(fetchPopularMovies(button.toLowerCase()))
              : dispatch(fetchPopularMovies("tv"));
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
