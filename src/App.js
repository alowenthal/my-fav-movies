import React, { useState } from "react";

import MovieSearch from "./components/MovieSearch";
import MovieColumn from "./components/MovieColumn";
import { testData } from "./TestData/testList.js";

// Should only be true for DEV purposes
const isTestMode = false;

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
                    tallyActors(prevState, movieInfo.actors, movieInfo.id)
                );
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
        const newCurrentActors = [...currentActors];

        newActors.forEach((actor) => {
            const actorExists = currentActors.find(
                (cActor) => cActor.actor === actor
            );

            let actorInfo;

            if (actorExists) {
                actorInfo = {
                    actor,
                    movies: actorExists.movies.push(id)
                };
            } else {
                actorInfo = {
                    actor,
                    movies: [id]
                };

                newCurrentActors.push(actorInfo);
            }
        });

        return newCurrentActors;
    }

    const [query, setQuery] = useState("");
    const [myList, setList] = useState(isTestMode ? [...testData] : []);
    const [actors, setActors] = useState([]);

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
