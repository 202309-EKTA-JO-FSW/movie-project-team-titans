// ActorsPage.js

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import OneActorPage from '../One-Actor';

export default function ActorsPage() {
  const [actors, setActors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTVjMmQ4MTIzNTkwODBiZWY4YmY5N2FmM2RlZDFkNSIsInN1YiI6IjY1NjVkZmFiYzJiOWRmMDExZGZkMDRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RJR2ksb0pOMGsh7IYZgFKP4WLZDbM650jhaTRYOi5_4',
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options)

        const data = await response.json();
        setActors(data.results);
      } catch (error) {
        console.error('Error fetching Actors:', error);
      }
    };

    fetchActors();
  }, []);

  const handleButtonClick = (id) => {
    setSelectedId(id);
  };

  return (
    <header>
      <Navbar />

      <div className='mt-10 lg:px-50 md:px-40 sm:px-20 xs:px-5'>
        <h3 className="text-xl text-white font-bold mx-5 p-2 text-center bg-[#276060] rounded-full "> Actors </h3>
        <div className="grid  my-10 justify-items-center items-center lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-1 xs:grid-cols-1 xs:gap-3">
          {actors.map((Actor) => (
            <li key={Actor.id} className="list-none rounded-md group relative ">
              <img
                src={`https://image.tmdb.org/t/p/w500${Actor.profile_path}`}
                alt={Actor.name}
                className="w-full h-80 object-cover rounded-3xl"
              />
              <div className="absolute top-0 left-0 w-full h-0 flex flex-col font-bold text justify-center items-center bg-[#142e2edb] rounded-3xl opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
                <h1 className="text-2xl text-white">{Actor.original_name}</h1>
                <Link href={{ pathname: '/One-Actor', query: { id: Actor.id } }} >
                  <button onClick={() => handleButtonClick(Actor.id)} className="mt-5 px-8 py-3 rounded-full bg-[#276060] hover:bg-[#1f4d4d] font-bold duration-300">About Actor</button>
                </Link>

              </div>
            </li>
          ))}
        </div>
      </div>
      <Footer />
    </header>
  );
}
