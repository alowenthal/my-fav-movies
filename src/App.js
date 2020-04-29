/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "react-use-localstorage";
import { Router } from "@reach/router";
import _, { debounce } from "lodash";

import Navigation from "./components/Navigation";
import MovieColumn from "./components/MovieColumn";
import { testData, testActors } from "./TestData/testList.js";

import Button from "./components/Button";

// Should only be true for DEV purposes
const isTestMode = false;

function App() {
    const [queryResults, setQueryResults] = useState([]);
    const [lsList, setlsList] = useLocalStorage("myList", "");
    const [lsActors, setlsActors] = useLocalStorage("actors", "");

    const [myList, setList] = useState(
        isTestMode ? [...testData] : lsList ? [...JSON.parse(lsList)] : []
    );
    const [actors, setActors] = useState(
        isTestMode
            ? { ...testActors }
            : lsActors
            ? { ...JSON.parse(lsActors) }
            : {}
    );

    useEffect(() => {
        setlsList(JSON.stringify(myList));
        setlsActors(JSON.stringify(actors));
    }, [myList]);

    const actorsArr = Object.keys(actors).map((actor) => {
        return {
            actor,
            movies: actors[actor]
        };
    });

    function setQuery(query) {
        axios({
            method: "GET",
            url: `https://imdb8.p.rapidapi.com/title/find?q=${query}`,
            headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            }
        })
            .then((response) => {
                setQueryResults(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function addMovie(data) {
        const movieInfo = {
            title: data.title,
            id: data.id,
            poster: data.image.url,
            actors: data.principals
        };

        const updatedActors = tallyActors(
            actors,
            movieInfo.actors,
            movieInfo.id
        );

        setList((prevState) => [...prevState, movieInfo]);
        setActors(updatedActors);
        setQuery("");
    }

    function removeMovie(id, removedActors) {
        const removeIndex = isTestMode
            ? testData
            : myList
                  .map((item) => {
                      return item.id;
                  })
                  .indexOf(id);

        // remove object
        myList.splice(removeIndex, 1);

        const updatedActors = unTallyActors(actors, removedActors, id);

        setList([...myList]);
        setActors(updatedActors);
    }

    function tallyActors(currentActors, newActors, id) {
        newActors.forEach((actor) => {
            const movies = currentActors[actor.name] || [];
            movies.push(id);
            currentActors[actor.name] = movies;
        });

        return currentActors;
    }

    function unTallyActors(currentActors, removedActors, id) {
        removedActors.forEach((actor) => {
            const movies = currentActors[actor.name];
            movies.splice(movies.indexOf(id), 1);
            if (movies.length < 1) {
                delete currentActors[actor.name];
                return currentActors;
            }
            currentActors[actor.name] = movies;
        });

        return currentActors;
    }

    return (
        <div className="App">
            <Navigation />
            <Router>
                <MovieColumn
                    addMovie={addMovie}
                    setQuery={setQuery}
                    removeMovie={removeMovie}
                    myList={myList}
                    setList={setList}
                    path="/"
                    queryResults={queryResults}
                />
                <Button path="to-watch" />
            </Router>
        </div>
    );
}

export default App;
