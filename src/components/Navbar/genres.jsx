import React, { useState, useEffect } from "react"

export default function Genres() {
  const [moviesGenres, setMoviesGenres] = useState([])

  useEffect(() => {
    const fetchMoviesGenres = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI",
        },
      }
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list",
          options,
        )
        const data = await response.json()

        //console.log("API Response:", data);

        setMoviesGenres(data.genres || [])
      } catch (error) {
        console.error("Error fetching genres:", error)
      }
    }

    fetchMoviesGenres()
  }, [])
  const columnCount = 2 // Set the number of columns
  const optionsPerColumn = Math.ceil(moviesGenres.length / columnCount)

  return (
    <div className="flex">
      {Array.from({ length: columnCount }).map((_, columnIndex) => (
        <div key={columnIndex} className="flex-1 ">
          {moviesGenres
            .slice(
              columnIndex * optionsPerColumn,
              (columnIndex + 1) * optionsPerColumn,
            )
            .map((genre) => (
              <option
                key={genre.id}
                className="my-2  mx-1 rounded-2xl px-5  hover:bg-gray-600"
                value={genre.name}
              >
                {genre.name}
              </option>
            ))}
        </div>
      ))}
    </div>
  )
}
