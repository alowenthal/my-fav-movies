import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button";

const SearchContainer = styled.div`
    padding: 1rem;
    background: #e91e63;
`;

const SearchInput = styled.input`
    list-style: none;
    padding: 1rem;
    font-size: 20px;
    border: none;
    border-radius: 4px;
    margin-right: 1rem;
    width: calc(100% - 2rem);
    margin-bottom: 1rem;
    max-width: 400px;
`;

function MovieSearch({ query, setQuery, addMovie }) {
    function keyPress(e) {
        if (e.keyCode === 13) {
            addMovie(e.target.value);
        }
    }
    return (
        <SearchContainer>
            <SearchInput
                onChange={(event) => setQuery(event.target.value)}
                name="username"
                type="text"
                placeholder="Enter a movie..."
                data-lpignore="true"
                value={query}
                onKeyDown={keyPress}
            />
            <Button
                text="Add to List"
                func={() => addMovie(query)}
                query={query}
                bgColor="#333333"
                textColor="#FFFFFF"
                isDisabled={query === ""}
            />
        </SearchContainer>
    );
}

MovieSearch.propTypes = {
    query: PropTypes.string,
    setQuery: PropTypes.func,
    addMovie: PropTypes.func
};

export default MovieSearch;
