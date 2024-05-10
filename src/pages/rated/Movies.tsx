import usefetch from "../../hooks/useFetch";

export default function Movies() {
  const { data, isLoading, error } = usefetch({
    url: `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guestId"
    )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
    detail: false,
  });
  return <div>Movies</div>;
}
