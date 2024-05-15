//  custom hook to fetch data based on the url passed to it
import { useEffect, useState } from "react";

// interface of props to receive whenever the hook is called
export interface fetchProps {
  url: string;
  detail: boolean;
}

export interface Genres {
  id: number;
  name: string;
}

export interface Companies {
  id: number;
  logo_path: string;
  name: string;
  original_countries: string;
}
export interface Countries {
  iso_3166_1: string;
  name: string;
}
export interface Seasons {
  air_date: string;
  episode_count: string;
  id: number;
  name: string;
  season_number: string;
}
export interface CreatedBy {
  id: number;
  name: string;
}

export interface Languages {
  iso_639_1: string;
  name: string;
}
// interface for data gotten from the hook call for both tv shows and movies
export interface MovieDetails {
  adult: boolean;
  title: string;
  poster_path: string;
  genres: Genres[];
  spoken_languages: Languages[];
  overview: string;
  popularity: number;
  production_companies: Companies[];
  production_countries: Countries[];
  revenue: number;
  release_date: string;
  rating: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  episode_run_time: number[];
  first_air_date: string;
  last_air_date: string;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Seasons[];
  status: string;
  tagline: string;
  type: string;
  id: string;
  media_type: string;
}

const usefetch = ({ url, detail }: fetchProps) => {
  // state declaration
  const [data, setData] = useState<MovieDetails[]>([]);
  const [details, setDetails] = useState<MovieDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
    },
  };

  // fetch movie or tvshow basted on the url passed

  const fetchData = async () => {
    const res = await fetch(url, options);
    const result = await res.json();
    try {
      // assign result/data gotten from the call call to details
      // if the details props passed is true
      detail ? setDetails(result) : setData(result.results);
      setIsLoading(false);
      setError(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  };

  // run the fetch function only when the url changes
  useEffect(() => {
    fetchData();
    return () => console.log("cleanup");
  }, [url]);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
    console.log("refectched", url);
  };
  return { data, details, isLoading, error, refetch };
};

export default usefetch;
