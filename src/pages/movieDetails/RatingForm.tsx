import { Alert } from "@mui/material";
import { useState } from "react";

interface RatingProps {
  id: string | undefined;
  type: string;
  name: string | undefined;
}
export default function RatingForm({ id, type, name }: RatingProps) {
  const [rating, setRating] = useState<string>("0");
  const [addedRating, setAddedRating] = useState<boolean>(false);
  const addRating = () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjc1YzEyYjhlYTI4ODFkODRhODA4ZDZiOTgwODA0ZSIsInN1YiI6IjY2MTk5YWZjOTBjZjUxMDE3Y2EyNmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A4OG4SnjnTSJY4f6Kiy1HMCN5qxlVn2pa6xJImqLXvc",
      },
      body: `{"value":${rating}`,
    };
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/rating?guest_session_id=${localStorage.getItem(
        "guestId"
      )}`,
      options
    )
      .then((res) => {
        res.json();
      })
      .then((data) => {
        setAddedRating(true);
        setTimeout(() => {
          setAddedRating(false);
        }, 3000);
        return data;
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className=" w-80 absolute top-0 right-0 ">
        {Number(rating) < 0 && (
          <Alert severity="error">Rating must be greater than 0</Alert>
        )}
        {Number(rating) > 10 && (
          <Alert severity="error">Rating must be less than 10</Alert>
        )}
        {addedRating && (
          <Alert severity="success">
            succesfully a rating of {rating} to {name}
          </Alert>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Number(rating) > 0 && Number(rating) <= 10 && addRating();
        }}
        action=""
        className="absolute right-10 -top-12 border border-blue-500 py-1 px-6"
      >
        <input
          type="text"
          className="w-10 bg-transparent outline-none pl-2"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button className="border-l pl-5" type="submit">
          Rate
        </button>
      </form>
    </>
  );
}
