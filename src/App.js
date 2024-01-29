import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';

const apiUrl = 'http://www.omdbapi.com?apikey=6fc8f809';

const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response  = await fetch(`${apiUrl}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman')
    }, [])

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={(e) => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0 
                ? (
                <div className="container">
                    {
                        movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))
                    }
                </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>    
                )
            }
        </div>
    )
};

export default App;