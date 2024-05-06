import { useEffect, useState } from "react";

interface fetchProps {
  url: string;
  detail: boolean;
}
const usefetch = ({ url, detail }: fetchProps) => {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
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
    } finally {
      setError(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);
  return { data, details, isLoading, error };
};

export default usefetch;
