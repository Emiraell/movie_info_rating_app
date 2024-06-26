import usefetch from "../../hooks/useFetch";
import { Box, Grid, Typography } from "@mui/material";
import RatedTemplate from "./RatedTemplate";
import { useEffect } from "react";

export default function RatedMovies() {
  // import usefetch hook and pass the url to fetch rated movies by user
  // by using the user guest session id stored in the local Storage
  const { data, isLoading, error, refetch } = usefetch({
    url: `https://api.themoviedb.org/3/guest_session/${sessionStorage.getItem(
      "guestId"
    )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_MY_API_KEY
    }`,
    detail: false,
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Box mx={2}>
      {isLoading && (
        <div className="mt-10 mb-40 text-center tracking-wider text-gray-100 italic text-lg">
          Loading......
        </div>
      )}
      {error && (
        <div className="mt-10 mb-40 status_message">
          Error in fetching rated movies please refresh
          <br /> the page if you already rated a movie
        </div>
      )}

      {/* display  if no error from the usefetch hook */}
      {!isLoading && !error && (
        <Box mb={20}>
          <Typography variant="h5" component="div" color={"white"} py={2}>
            Movies
          </Typography>

          {!data && (
            <div className="mt-5 mb-20 status_message text-white">
              you haven't rated a movie yet
            </div>
          )}
          <Grid container spacing={4}>
            {data?.map((movie) => (
              <RatedTemplate
                movie={movie}
                type="movie"
                key={movie.id}
                refetch={refetch}
              />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
