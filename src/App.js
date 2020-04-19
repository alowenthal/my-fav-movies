import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    useEffect(() => {});

    function addMovie(query) {
        fetch(`http://www.omdbapi.com/?t=${query}&apikey=bdf0ef4e`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const movieInfo = {
                    title: data.Title,
                    id: data.imdbID
                };

                setList((prevState) => [...prevState, movieInfo]);
            });
    }

    function removeMovie(id) {
        const removeIndex = myList
            .map((item) => {
                return item.id;
            })
            .indexOf(id);

        // remove object
        myList.splice(removeIndex, 1);

        setList([...myList]);
    }

    const [query, setQuery] = useState("");
    const [myList, setList] = useState([]);

    return (
        <div className="App">
            <input
                onChange={(event) => setQuery(event.target.value)}
                name="username"
                type="text"
                placeholder="Enter a movie..."
            />
            <button onClick={() => addMovie(query)} type="button">
                Add To List
            </button>

            <ul className="movies">
                {myList.map((movie) => {
                    return (
                        <li className="movie" key={`movie--${movie.id}`}>
                            {movie.title}
                            <button
                                onClick={() => removeMovie(movie.id)}
                                type="button"
                            >
                                Remove
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;
