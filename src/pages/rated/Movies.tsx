import { useEffect } from "react";
import usefetch from "../../hooks/useFetch";

export default function Movies() {
  //   const { data, isLoading, error } = usefetch({
  //     url: `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
  //       "guestId"
  //     )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
  //     detail: false,
  //   });
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
        "guestId"
      )}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=e275c12b8ea2881d84a808d6b980804e`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    // console.log(data);
    console.log(localStorage.getItem("guest"));
  }, []);
  return <div>Movies</div>;
}
