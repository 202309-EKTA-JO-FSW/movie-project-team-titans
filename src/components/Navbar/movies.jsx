import React from "react"

function Movies() {
  return (
    <div className="movies relative justify-center text-center mx-center">
      <a href="#">
        <option
          className="my-1 mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="All"
        >
          Movies
        </option>
      </a>
      <a href="#">
        <option
          className="  my-2  mx-1 rounded-2xl px-5 active:bg-gray-600  hover:bg-gray-600"
          value="Top Rate"
        >
          Top Rated
        </option>
      </a>

      <a href="#">
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Popular"
        >
          Popular
        </option>
      </a>
      <a href="#">
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Latest"
        >
          Latest
        </option>
      </a>
      <a href="#">
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Now Playing"
        >
          Now Playing
        </option>
      </a>
      <a href="#">
        <option
          className="my-2  mx-1 rounded-2xl px-5 active:bg-gray-600 hover:bg-gray-600"
          value="Upcoming"
        >
          Upcoming
        </option>
      </a>
    </div>
  )
}

export default Movies
