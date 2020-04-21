import React, { useState } from "react";

import MovieSearch from "./components/MovieSearch";
import MovieColumn from "./components/MovieColumn";

function App() {
    function addMovie(query) {
        fetch(`https://www.omdbapi.com/?t=${query}&apikey=bdf0ef4e`)
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

                setList((prevState) => [...prevState, movieInfo]);
                setActors((prevState) =>
                    tallyActors(prevState, movieInfo.actors)
                );
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

    function tallyActors(currentActors, newActors) {
        const newCurrentActors = [...currentActors];

        newActors.forEach((actor) => {
            const actorInfo = {
                actor,
                tally: 1
            };

            newCurrentActors.push(actorInfo);
        });

        return newCurrentActors;
    }

    const [query, setQuery] = useState("");
    const [myList, setList] = useState([]);
    const [actors, setActors] = useState([]);

    return (
        <div className="App">
            <MovieSearch
                addMovie={addMovie}
                query={query}
                setQuery={setQuery}
            />
            <MovieColumn
                list={myList}
                removeMovie={removeMovie}
                myList={myList}
                setList={setList}
            />
        </div>
    );
}

export default App;
