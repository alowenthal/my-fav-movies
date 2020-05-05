import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import SearchResults from "./SearchResults";
import Button from "./Button";

const SearchContainer = styled.div`
    padding: 1rem;
    background: #e91e63;
`;

const TypeaheadContainer = styled.div`
    position: relative;
    max-width: 400px;
    display: flex;
    align-items: center;

    .search-input {
        list-style: none;
        padding: 1rem;
        font-size: 20px;
        border: none;
        border-radius: 4px;
        width: calc(100% - 2rem);
    }
`;

const CloseButton = styled.button`
    position: absolute;
    right: 0rem;
    background: none;
    border: none;
    padding: 1rem;
    font-size: 1rem;
    color: #c8c8c8;

    &:hover {
        cursor: pointer;
    }
`;

function MovieSearch({ setQuery, searchQuery, addTitle, queryResults, type }) {
    return (
        <SearchContainer>
            <TypeaheadContainer>
                <DebounceInput
                    minLength={2}
                    debounceTimeout={300}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                    placeholder={`Search a ${
                        type === "toWatch" ? "movie or show" : type
                    }...`}
                    value={searchQuery}
                />
                {searchQuery !== "" && (
                    <CloseButton
                        className="close"
                        onClick={() => setQuery("")}
                        type="button"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </CloseButton>
                )}
                <SearchResults
                    searchQuery={searchQuery}
                    queryResults={queryResults}
                    addTitle={addTitle}
                    type={type}
                />
            </TypeaheadContainer>
        </SearchContainer>
    );
}

MovieSearch.propTypes = {
    searchQuery: PropTypes.string,
    setQuery: PropTypes.func,
    addTitle: PropTypes.func,
    type: PropTypes.string,
    queryResults: PropTypes.array
};

export default MovieSearch;
