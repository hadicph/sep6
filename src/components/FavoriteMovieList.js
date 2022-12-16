import React from 'react';

const FavoriteMovieList = (props) => {
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='movie-item'>
                    <img className='movie-item-image' src={movie.Poster} alt='movie' onClick={()=>props.onSelect(movie.imdbID)}></img>
                    <div>
                        Title: {movie.Title}<br/>
                        Year: {movie.Year}
                    </div>
                </div>
            ))}
        </>
    );
};

export default FavoriteMovieList;