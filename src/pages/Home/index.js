import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React,{useState, useEffect} from 'react'


export default function HomePage() {
  const [moviesTrending, setmoviesTrending] = useState([]);
  

  useEffect(() => {
    const fetchmoviesTrending = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTVjMmQ4MTIzNTkwODBiZWY4YmY5N2FmM2RlZDFkNSIsInN1YiI6IjY1NjVkZmFiYzJiOWRmMDExZGZkMDRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RJR2ksb0pOMGsh7IYZgFKP4WLZDbM650jhaTRYOi5_4'
        }
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          options
        );
        const data = await response.json();
        setmoviesTrending(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchmoviesTrending();
  }, []);

  return (
    <main>
      <div>
        <Navbar />
        <br /> <br />
        <ul>
        {moviesTrending.map((movie) => (
          <li key={movie.id}>
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-14 h-20" >
            </img>{movie.title}</li>
        ))}
      </ul>
        <br /> <br /> <br /> <br /> 
        <Footer />
      </div>
    </main>
  );
}

