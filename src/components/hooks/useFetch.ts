import { useEffect, useState } from "react";
// import { NowPlayingData } from "../movies/NowPlaying";

export interface Movies {
  first_air_date: string;
  id: number;
  original_title: string;
  overview: string;
  name: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface Data {
  movies: Movies[] | null;
  tvshows: Movies[] | null;
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
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url, options);

      const result = await res.json();

      if (genre === "movie") {
        setData({ ...data, movies: result.results });

        await localStorage.setItem(
          `${storageName}`,
          JSON.stringify({ ...data })
        );
      } else {
        setData({ ...data, tvshows: result.results });

        await localStorage.setItem(
          `${storageName}`,
          JSON.stringify({ ...data })
        );
      }
      console.log(result, "fetched", storageName);
    };

    console.log(storageName);
    fetchData();
  }, [url]);
  return { ...data };
};

export default usefetch;
