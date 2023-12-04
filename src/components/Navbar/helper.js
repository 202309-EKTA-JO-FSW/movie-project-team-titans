export const getGenreNames = (genreIds, allGenres) => {
    return genreIds.map((genreId) => {
      const genre = allGenres.find((g) => g.id === genreId);
      return genre ? genre.name : 'Unknown Genre';
    });
  };
  