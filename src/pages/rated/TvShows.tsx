import { useEffect } from "react";
import usefetch from "../../hooks/useFetch";
import { Box, Grid } from "@mui/material";
import RatedTemplate from "./RatedTemplate";

export default function RatedTvShows() {
  const { data, isLoading, error } = usefetch({
    url: `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guestId"
    )}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=e275c12b8ea2881d84a808d6b980804e`,
    detail: false,
  });
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <Box mx={2}>
      <div className="mt-15 mb-40 text-center tracking-wider text-gray-100 italic text-lg">
        {isLoading && <div>Loading......</div>}
        {error && (
          <div>
            Error in fetching movie detial <br /> please refresh the page
          </div>
        )}
      </div>
      <Grid container gap={2}>
        {data?.map((movie) => (
          <RatedTemplate movie={movie} genre="tv" />
        ))}
      </Grid>
    </Box>
  );
}
