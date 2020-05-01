import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";

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

function MovieSearch({ query, setQuery, addTitle, queryResults, type }) {
    function keyPress(e) {
        if (e.keyCode === 13) {
            addTitle(e.target.value);
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
                    placeholder={`Search a ${type}...`}
                />
                {queryResults && (
                    <SearchResults
                        query={query}
                        queryResults={queryResults}
                        addTitle={addTitle}
                    />
                )}
            </TypeaheadContainer>
        </SearchContainer>
    );
}

MovieSearch.propTypes = {
    query: PropTypes.string,
    setQuery: PropTypes.func,
    addTitle: PropTypes.func,
    type: PropTypes.string,
    queryResults: PropTypes.array
};

export default MovieSearch;
