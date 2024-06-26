import usefetch from "../../hooks/useFetch";
import { Box, Grid, Typography } from "@mui/material";
import RatedTemplate from "./RatedTemplate";

export default function RatedTvShows() {
  // import usefetch hook and pass the url to fetch rated tv shows by user
  // by using the user guest session id stored in the local Storage
  const { data, isLoading, error, refetch } = usefetch({
    url: `https://api.themoviedb.org/3/guest_session/${sessionStorage.getItem(
      "guestId"
    )}/rated/tv?language=en-US&page=1&sort_by=created_at.asc&api_key=${
      import.meta.env.VITE_MY_API_KEY
    }`,
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
          Error in fetching rated tv shows please refresh <br />
          the page if you already rated a show
        </div>
      )}

      {/* display  if no error from the fetch hook */}
      {!isLoading && !error && (
        <Box mb={20}>
          <Typography variant="h5" component="div" color={"white"} py={2}>
            Tv Shows
          </Typography>
          {!data && (
            <div className="mt-5 mb-20 status_message text-white">
              you haven't rated a tv show yet
            </div>
          )}
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
