import React, {useEffect, useState} from 'react';

const MovieDetail = (props) => {
    const currentMovieId = props.movie;
    const [currentMovie,setCurrentMovie] = useState([]);

    const getMovieById = async (movieid)=>{
        const url = `https://www.omdbapi.com/?i=${movieid}&apikey=5e70ac2a`;
        const res = await fetch(url);
        const resJson = await res.json();
        if (resJson){
            setCurrentMovie(resJson);
        }
    }
    useEffect(()=>{
        getMovieById(currentMovieId)
    },[currentMovieId])
    return (
                <div className='movie-detail'>
                    <img className='movie-detail-image' src={currentMovie.Poster} alt='movie'></img>
                    <div className='movie-detail-details'>
                        <h3>Title: {currentMovie.Title}</h3>
                        Year: {currentMovie.Year}<br/>
                        Stars: {currentMovie.Actors}<br/>
                        Director: {currentMovie.Director}<br/>
                        <b>Ratings: </b>
                        {currentMovie.Ratings !== undefined && currentMovie.Ratings.map((rating, index) => (
                            <div>Source: {rating.Source}<br/>
                                Value: {rating.Value}
                            </div>
                        ))}
                    </div>
                </div>
    );
};

export default MovieDetail;