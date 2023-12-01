import React from "react";
function Movies() {
    return (
        <div className="movies">
            <option value="All">Movies</option>
            <option value="Top Rate">Top Rate</option>
            <option value="Popular">Popular</option>
            <option value="Latest">Latest</option>
            <option value="Now Playing">Now Playing</option>
            <option value="Upcoming">Upcoming</option>
        </div>
      );
    }
    
export default Movies;