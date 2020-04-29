import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";

import Button from "./Button";
import SearchResults from "./SearchResults";

const SearchContainer = styled.div`
    padding: 1rem;
    background: #e91e63;
`;

const TypeaheadContainer = styled.div`
    position: relative;
    max-width: 400px;

    .search-input {
        list-style: none;
        padding: 1rem;
        font-size: 20px;
        border: none;
        border-radius: 4px;
        width: calc(100% - 2rem);
    }
`;

function MovieSearch({ query, setQuery, addMovie, queryResults }) {
    function keyPress(e) {
        if (e.keyCode === 13) {
            addMovie(e.target.value);
        }
    }
    return (
        <SearchContainer>
            <TypeaheadContainer>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                    placeholder="Search a movie..."
                />
                <SearchResults
                    query={query}
                    queryResults={queryResults}
                    addMovie={addMovie}
                />
            </TypeaheadContainer>
        </SearchContainer>
    );
}

MovieSearch.propTypes = {
    query: PropTypes.string,
    setQuery: PropTypes.func,
    addMovie: PropTypes.func
};

export default MovieSearch;
