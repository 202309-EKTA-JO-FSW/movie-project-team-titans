import React, { useState, useEffect, useRef } from "react"
import { FaSearch } from "react-icons/fa"
import Link from "next/link"

function Search() {
  const [searchText, setSearchText] = useState("")
  const [combinedResults, setCombinedResults] = useState([])

  const listRef = useRef(null)
  const inputRef = useRef(null)

  const handleClickOutside = (event) => {
    if (
      listRef.current &&
      !listRef.current.contains(event.target) &&
      inputRef.current !== event.target
    ) {
      setCombinedResults([])
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchResults = async () => {
    const movieOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI",
      },
    }
    const actorOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTBiNjEzZDU2ZjM3YzM5ODBmMDE3MjkxMTE2Y2Q4NyIsInN1YiI6IjY1NjUyYmE2YTM1YzhlMDBmZTRhMmU3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_GBCLDOufr5pWrAD4IBAu1o6XUAi_3oCo6VYxxe4HI",
      },
    }
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`,
        movieOptions,
      )

      const actorResponse = await fetch(
        `https://api.themoviedb.org/3/person/popular?query=${searchText}&language=en-US&page=1`,
        actorOptions,
      )
      const movieData = await movieResponse.json()
      const actorData = await actorResponse.json()
      const filteredActors = actorData.results.filter(
        (actor) => actor.name.toLowerCase() === searchText.toLowerCase(),
      )

      const combinedResults = [
        ...movieData.results.map((movie) => ({ type: "movie", ...movie })),
        ...filteredActors.map((actor) => ({ type: "actor", ...actor })),
      ]
      setCombinedResults(combinedResults)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleInputClick = async () => {
    if (searchText.trim().length >= 3) {
      await fetchResults()
    }
  }

  useEffect(() => {
    if (searchText.trim().length >= 3) {
      fetchResults()
    } else {
      setCombinedResults([])
    }
  }, [searchText])

  return (
    <div className="relative z-50">
      <form>
        <div className="relative flex items-center bg-[#142E2E]">
          <FaSearch className="sm:text-xs absolute left-3 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            name="search"
            placeholder="Find Movies or Actors..."
            className={`xs:w-28 sm:w-32 sm:text-xs md:w-64 md:text-base lg:w-96 lg:text-lg pl-8 pr-0.8 py-1 rounded-2xl focus:outline-none border border-gray-300 bg-[#142E2E] text-white`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onClick={handleInputClick}
          />
        </div>
      </form>

      {combinedResults.length > 0 && (
        <div
          ref={listRef}
          className="xs:w-28 sm:w-32 sm:text-xs md:w-64 md:text-base lg:w-96 lg:text-lg absolute border-solid border-2 border-white rounded-3xl mt-1 bg-[#142E2E] shadow-md overflow-y-auto max-h-96"

        >
          {combinedResults.map((result) => (
            <div
              key={result.id}
              className=" m-3 rounded-2xl p-3.5 active:bg-gray-600 hover:bg-gray-600 text-white flex items-center space-x-4 "
            >
              {result.type === "movie" ? (
                <Link href={{ pathname: '/One-Movie', query: { id: result.id } }} ><div className="flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    alt={result.title}
                    className="w-14 h-20 rounded-xl"
                  />
                </div></Link>
              ) : result.type === "actor" ? (
                <Link href={{ pathname: '/One-Actor', query: { id: result.id } }} >
                    <div className="flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.profile_path}`}
                    alt={result.name}
                    className="w-14 h-20 rounded-xl"
                  />
                </div></Link>
              ) : null}
              <div>
              <p className="font-bold">
  {result.type === "movie" ? (
    <Link href={{ pathname: '/One-Movie', query: { id: result.id } }}>
      <p>{result.title}</p>
    </Link>
  ) : (
    <Link href={{ pathname: '/One-Actor', query: { id: result.id } }}>
      <p>{result.name}</p>
    </Link>
  )}
</p>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
