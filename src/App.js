/* eslint-disable no-eval */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "react-use-localstorage";
import { Router } from "@reach/router";
import _, { debounce } from "lodash";

import Navigation from "./components/Navigation";
import MovieColumn from "./components/MovieColumn";
import { testData, testActors } from "./TestData/testList.js";

// Should only be true for DEV purposes
const isTestMode = false;

function App() {
    const [firstRun, setFirstRun] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [mediaType, setMediaType] = useState("movie");
    const [localStorageMovieList, setLocalStorageMovieList] = useLocalStorage(
        "movieList",
        ""
    );
    const [localStorageShowList, setLocalStorageShowList] = useLocalStorage(
        "showList",
        ""
    );
    const [localStorageActors, setLocalStorageActors] = useLocalStorage(
        "actors",
        ""
    );
    const [movieList, setMovieList] = useState(
        isTestMode
            ? [...testData]
            : localStorageMovieList
            ? [...JSON.parse(localStorageMovieList)]
            : []
    );
    const [showList, setShowList] = useState(
        isTestMode
            ? [...testData]
            : localStorageShowList
            ? [...JSON.parse(localStorageShowList)]
            : []
    );
    const [actors, setActors] = useState(
        isTestMode
            ? { ...testActors }
            : localStorageActors
            ? { ...JSON.parse(localStorageActors) }
            : {}
    );

    useEffect(() => {
        setLocalStorageMovieList(JSON.stringify(movieList));
        setLocalStorageShowList(JSON.stringify(showList));
        setLocalStorageActors(JSON.stringify(actors));
    }, [movieList, showList]);

    useEffect(() => {
        if (!firstRun && searchQuery !== "") {
            axios({
                method: "GET",
                url: `https://imdb8.p.rapidapi.com/title/find?q=${searchQuery}`,
                headers: {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "imdb8.p.rapidapi.com",
                    "x-rapidapi-key": process.env.REACT_APP_API_KEY
                }
            })
                .then((response) => {
                    const sanatizedResults =
                        mediaType === "movie"
                            ? response.data.results.filter(
                                  (result) => result.titleType === "movie"
                              )
                            : response.data.results.filter(
                                  (result) => result.titleType !== "movie"
                              );
                    sanatizedResults.forEach((result) => {
                        eval(`${mediaType}List`).find((item, index) => {
                            if (item.id === result.id) {
                                result.inListPosition = index + 1;
                                result.inListTotal = eval(
                                    `${mediaType}List`
                                ).length;
                            }
                        });
                    });
                    setQueryResults(sanatizedResults);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (searchQuery === "") {
            setQueryResults([]);
        }
        setFirstRun(false);
    }, [searchQuery]);

    const actorsArr = Object.keys(actors).map((actor) => {
        return {
            actor,
            titles: actors[actor]
        };
    });

    function addTitle(event, data) {
        event.stopPropagation();

        const titleInfo = {
            title: data.title,
            id: data.id,
            poster: data.image.url,
            actors: data.principals,
            type: data.titleType
        };

        const updatedActors = tallyActors(
            actors,
            titleInfo.actors,
            titleInfo.id
        );

        if (data.titleType === "movie") {
            setMovieList((prevState) => [...prevState, titleInfo]);
        } else {
            setShowList((prevState) => [...prevState, titleInfo]);
        }

        setActors(updatedActors);
        setSearchQuery("");
    }

    function removeTitle(id, removedActors, type) {
        const sanatizedType =
            type === "movie"
                ? { state: "movieList", setter: "setMovieList" }
                : { state: "showList", setter: "setShowList" };
        const removeIndex = isTestMode
            ? testData
            : eval(sanatizedType.state)
                  .map((item) => {
                      return item.id;
                  })
                  .indexOf(id);

        // remove object
        eval(sanatizedType.state).splice(removeIndex, 1);

        const updatedActors = unTallyActors(actors, removedActors, id);

        eval(sanatizedType.setter)([...eval(sanatizedType.state)]);
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
                    addTitle={addTitle}
                    searchQuery={searchQuery}
                    setQuery={setSearchQuery}
                    removeTitle={removeTitle}
                    list={movieList}
                    setList={setMovieList}
                    path="/"
                    queryResults={queryResults}
                    type="movie"
                    setMediaType={setMediaType}
                />
                <MovieColumn
                    addTitle={addTitle}
                    searchQuery={searchQuery}
                    setQuery={setSearchQuery}
                    removeTitle={removeTitle}
                    list={showList}
                    setList={setShowList}
                    path="shows"
                    queryResults={queryResults}
                    type="show"
                    setMediaType={setMediaType}
                />
            </Router>
        </div>
    );
}

export default App;
