import usefetch from "../../hooks/useFetch";
import { Box, Grid, Typography } from "@mui/material";
import RatedTemplate from "./RatedTemplate";

export default function RatedTvShows() {
  // import usefetch hook and pass the url to fetch rated tv shows by user
  // by using the user guest session id stored in the local Storage
  const { data, isLoading, error, refetch } = usefetch({
    url: `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guestId"
    )}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=e275c12b8ea2881d84a808d6b980804e`,
    detail: false,
  });
  return (
    <Box mx={2}>
      {isLoading && (
        <div className="mt-10 mb-40 text-center tracking-wider text-gray-100 italic text-lg">
          Loading......
        </div>
      )}
      {error && (
        <div className="mt-10 mb-40 status_message">
          Error in fetching rated tv shows please succesfully rate a tv show or
          <br />
          refresh the page if you already rated a show
        </div>
      )}

      {/* display  if no error from the fetch hook */}
      {!isLoading && !error && (
        <Box mb={20}>
          <Typography variant="h5" component="div" color={"white"} py={2}>
            Tv Shows
          </Typography>
          <Grid container gap={2}>
            {data?.map((tvshow) => (
              <RatedTemplate
                movie={tvshow}
                type="tv"
                key={tvshow.id}
                refetch={refetch}
              />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
