import React, { useState } from "react";

import MovieSearch from "./components/MovieSearch";
import MovieColumn from "./components/MovieColumn";
import { testData } from "./TestData/testList.js";

// Should only be true for DEV purposes
const isTestMode = false;

function App() {
    const [query, setQuery] = useState("");
    const [myList, setList] = useState(isTestMode ? [...testData] : []);
    const [actors, setActors] = useState({});

    const actorsArr = Object.keys(actors).map((actor) => {
        return {
            actor,
            movies: actors[actor]
        };
    });

    function addMovie(searchQuery) {
        fetch(`https://www.omdbapi.com/?t=${searchQuery}&apikey=bdf0ef4e`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const movieInfo = {
                    title: data.Title,
                    id: data.imdbID,
                    poster: data.Poster,
                    actors: data.Actors.split(", ")
                };

                const updatedActors = tallyActors(
                    actors,
                    movieInfo.actors,
                    movieInfo.id
                );

                setList((prevState) => [...prevState, movieInfo]);
                setActors(updatedActors);
                setQuery("");
            });
    }

    function removeMovie(id) {
        const removeIndex = isTestMode
            ? testData
            : myList
                  .map((item) => {
                      return item.id;
                  })
                  .indexOf(id);

        // remove object
        myList.splice(removeIndex, 1);

        setList([...myList]);
    }

    function tallyActors(currentActors, newActors, id) {
        newActors.forEach((actor) => {
            const movies = currentActors[actor] || [];
            movies.push(id);
            currentActors[actor] = movies;
        });

        return currentActors;
    }

    return (
        <div className="App">
            <MovieSearch
                addMovie={addMovie}
                query={query}
                setQuery={setQuery}
            />
            <MovieColumn
                removeMovie={removeMovie}
                myList={myList}
                setList={setList}
            />
        </div>
    );
}

export default App;
