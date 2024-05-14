import usefetch from "../../hooks/useFetch";
import { Box, Grid, Typography } from "@mui/material";
import RatedTemplate from "./RatedTemplate";

export default function RatedMovies() {
  // import usefetch hook and pass the url to fetch rated movies by user
  // by using the user guest session id stored in the local Storage
  const { data, isLoading, error } = usefetch({
    url: `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guestId"
    )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=e275c12b8ea2881d84a808d6b980804e`,
    detail: false,
  });
  return (
    <Box mx={2}>
      {isLoading && (
        <div className="mt-15 mb-40 text-center tracking-wider text-gray-100 italic text-lg">
          Loading......
        </div>
      )}
      {error && (
        <div className="mt-15 mb-40 text-center tracking-wider text-gray-100 italic text-lg">
          Error in fetching movie detial <br /> please refresh the page
        </div>
      )}

      {/* display  if no error from the fetch hook */}
      {!isLoading && !error && (
        <Box mb={20}>
          <Typography variant="h5" component="div" color={"white"} py={2}>
            Movies
          </Typography>
          <Grid container gap={2}>
            {data?.map((movie) => (
              <RatedTemplate movie={movie} type="movie" key={movie.id} />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
