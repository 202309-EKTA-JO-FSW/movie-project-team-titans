import React, { useState, useEffect } from "react";
import Link from "next/link";

function GenresLink() {
  const [moviesGenres, setMoviesGenres] = useState([]);

  useEffect(() => {
    const fetchMoviesGenres = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI",
        },
      };
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list",
          options
        );
        const data = await response.json();

        //console.log("API Response:", data);

        setMoviesGenres(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchMoviesGenres();
  }, []);

  return (
    <div className="genres-container max-h-48 overflow-y-auto">
      {moviesGenres.map((genre) => (
        <Link href={`/Movies?genre=${genre.id}`} key={genre.id}>
          <div className="my-2 mx-1 rounded-2xl px-5 active:bg-gray-600  hover:bg-gray-600">
            {genre.name}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default GenresLink;
