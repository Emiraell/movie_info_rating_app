import { useEffect, useState } from "react";
import { Movie } from "../../store/features/movies/Popular";

export interface Data {
  movies: Movie[] | null;
  tvshows: Movie[] | null;
}
interface fetchProps {
  url: string;
  genre: string;
  storageName: string;
}
const usefetch = ({ url, genre, storageName }: fetchProps): Data => {
  const [data, setData] = useState<Data>({ movies: null, tvshows: null });
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
    },
  };

  const fetchData = async () => {
    const res = await fetch(url, options);

    const result = await res.json();

    genre === "movie"
      ? setData({ ...data, movies: result.results })
      : setData({ ...data, tvshows: result.results });
  };

  useEffect(() => {
    console.log(storageName);
    fetchData();
  }, [url]);
  return { ...data };
};

export default usefetch;
