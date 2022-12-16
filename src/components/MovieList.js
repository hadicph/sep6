import React from 'react';

const MovieList = (props) => {
    const FavoriteComp = props.favoriteComp;

    const handleFavoriteClick = function (movie) {
        let trimmedFavoriteList = [];
        let present = 0;
        for (const element of props.favorites) {
            const addedMovie = {"Poster":element.Poster,"Title":element.Title,"Type":element.Type,"Year":element.Year,"imdbID":element.imdbID};
            trimmedFavoriteList.push(addedMovie);
            if (movie.imdbID === element.imdbID)
            {
                present = 1;
            }
        }
        if (present === 0)
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"userid": props.userid,"movie_id":movie.imdbID})
            };
            fetch('https://1r3bgxl8a6.execute-api.eu-west-1.amazonaws.com/default/userFavMovies', requestOptions)
                .then(response => console.log(response.json()))
            trimmedFavoriteList.push(movie)
            props.onAddFavorite(trimmedFavoriteList);
        }
    }
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='movie-item'>
                    <img className='movie-item-image' src={movie.Poster} alt='movie' onClick={()=>props.onSelect(movie.imdbID)}></img>
                    <div>
                        Title: {movie.Title}<br/>
                        Year: {movie.Year}
                    </div>
                    <div onClick={() =>{ handleFavoriteClick(movie);
                    }} className={'overlay'}>
                        <FavoriteComp/>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;