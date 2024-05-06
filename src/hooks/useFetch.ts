import { useEffect, useState } from "react";

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
export interface MovieDetails {
  adult: boolean;
  title: string;
  poster_path: string;
  genres: Genres[];
  overview: string;
  popularity: number;
  production_companies: Companies[];
  production_countries: Countries[];
  revenue: number;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
}

const usefetch = ({ url, detail }: fetchProps) => {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState<MovieDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
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
    try {
      !detail === true ? setData(result.results) : setDetails(result);
      localStorage.setItem("detail", JSON.stringify(details));
      setIsLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);
  return { data, details, isLoading, error };
};

export default usefetch;
