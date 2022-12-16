import React, {useEffect, useState} from "react";
import {Amplify, Auth} from "aws-amplify";
import {
    AmplifyProvider,
    Authenticator,
    Button,
    Text,
} from "@aws-amplify/ui-react";
import aws_exports from "./aws-exports";

import "@aws-amplify/ui-react/styles.css";
import MovieList from "./components/MovieList";
import SearchBox from "./components/SearchBox";
import AddFavoriteMovie from "./components/AddFavoriteMovie";
import MovieDetail from "./components/MovieDetail";
import FavoriteMovieList from "./components/FavoriteMovieList";

Amplify.configure(aws_exports);


const App = () => {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('game');
    const [favorites, setFavorites] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState();
    const [userid,setuserid] = useState("");


    const getMovies = async (search : String)=>{
        const url = `https://www.omdbapi.com/?s=${search}&apikey=5e70ac2a`;
        const res = await fetch(url);
        const resJson = await res.json();
        if (resJson.Search){
            setMovies(resJson.Search);
            console.log(favorites)
        }
        else{

        }
    }
    const getMovieById = async (movieid : String)=>{
        const url = `https://www.omdbapi.com/?i=${movieid}&apikey=5e70ac2a`;
        const res = await fetch(url);
        const resJson = await res.json();
        if (resJson){
            return resJson;
        }
    }
    const clearSelectedMovie = () => {
        setSelectedMovie(undefined)
    }
    const getFavoriteMovies = async ()=>{
        const user = await Auth.currentUserCredentials();
        const userid = user.identityId.split(':')[1];
        setuserid(userid);
        //const url = `https://1r3bgxl8a6.execute-api.eu-west-1.amazonaws.com/default/userFavMovies/?userid=200`;
        const url = `https://1r3bgxl8a6.execute-api.eu-west-1.amazonaws.com/default/userFavMovies/?userid=${userid}`;

        const res = await fetch(url);
        const resJson = await res.json();
        const movies = [];
        favorites.splice(0);
        for (const element of resJson) {
            const movie = await getMovieById(element.movie_id);
            // @ts-ignore
            movies.push(movie);
        }
        // @ts-ignore
        setFavorites(movies);
    }
    useEffect(()=>{
        getFavoriteMovies();
        getMovies(search);
    },[search])
    return (
        <AmplifyProvider>
            <Authenticator>
                {({ signOut, user }) => (
                    <div>
                        {user && (
                            <div className='header'>
                                <Text className='header-item' color={'white'}>Hello {user.username}</Text>
                                    <SearchBox className='header-item searchField' search={search} setSearch={setSearch}/>
                                <Button className='header-item sign-out' onClick={signOut}>
                                    <Text color={'white'}>Sign Out</Text>
                                </Button>
                            </div>
                        )}
                            {selectedMovie && <>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                                <h2>Selected Movie: </h2>
                                <MovieDetail movie={selectedMovie}/>
                                <Button style={{display:"inline-block"}} className='button' onClick={clearSelectedMovie}>
                                <Text>Clear Selection</Text>
                            </Button></div></>}

                        <div className='container-fluid movie-app'>
                                <h2>Movies: </h2>
                            <div className='movies'>
                                <MovieList movies={movies} favorites={favorites} userid={userid} favoriteComp={AddFavoriteMovie}
                                           onSelect={setSelectedMovie} onAddFavorite={setFavorites}/>
                            </div>
                            <div>
                                {favorites.length !== 0 && <h2> Favorite Movies: </h2>}
                                <div className='movies'>
                                <FavoriteMovieList movies={favorites} favoriteComp={AddFavoriteMovie} onSelect={setSelectedMovie}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Authenticator>
        </AmplifyProvider>
    );
};

export default App;