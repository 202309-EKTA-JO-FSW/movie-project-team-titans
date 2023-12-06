import React, {useEffect,useState} from 'react';
import { useRouter } from 'next/router';

import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const OneActorPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [actorData, setActorData] = useState(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      if (!id) {
        return; // Exit early if no ID is available
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTVjMmQ4MTIzNTkwODBiZWY4YmY5N2FmM2RlZDFkNSIsInN1YiI6IjY1NjVkZmFiYzJiOWRmMDExZGZkMDRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RJR2ksb0pOMGsh7IYZgFKP4WLZDbM650jhaTRYOi5_4',
        },
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options);
        const data = await response.json();
        setActorData(data);
      } catch (error) {
        console.error('Error fetching Actor details:', error);
      }
    };

    fetchActorDetails();
  }, [id]);

  // Render loading or error state while data is being fetched
  if (!actorData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='m-20'>
      <div className='bg-[#276060] rounded-3xl py-8 pl-1'>
        <div className='flex ml-5 py-5 max-w-5xl '>
          <img
            src={`https://image.tmdb.org/t/p/w500${actorData.profile_path}`}
            alt={actorData.name}
            className="w-64 h-96 my-7 rounded-3xl object-cover"
          />
          <div className='flex flex-col ml-10'>
            <p className='mb-7 mt-10 font-bold text-5xl text-white'>{actorData.name}</p>
              <p className='mb-4 text-white'>{actorData.biography}</p>
              <p className='mb-4 text-white'><b>Gender: </b>{actorData.gender== 1 ? "Female" : "Male"}</p>
            <p className='mb-4 text-white'><b>Birthday: </b>{actorData.birthday}</p>
            <p className='mb-4 text-white'><b>Place of Birth: </b>{actorData.place_of_birth}</p>
            <p className='mb-4 text-white'><b>Popularity: </b>{actorData.popularity.toFixed(0)}</p>

           
          </div>
        </div>
      </div>
    </div>

      <Footer />
    </div>
  );
};

export default OneActorPage;
