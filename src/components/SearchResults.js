import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Results = styled.div`
    background: #ffffff;
    list-style: none;
    margin: 0px;
    width: 100%;
    border-radius: 4px;
    position: absolute;
    max-height: 300px;
    overflow-y: scroll;
`;

const Result = styled.a`
    color: #000000;
    padding: 1rem;
    display: block;

    &:hover {
        background: #f1f1f1;
    }
`;

function SearchResults({ query, queryResults, addTitle }) {
    return (
        <>
            {queryResults && (
                <Results>
                    {queryResults.map((result) => {
                        if (result.title) {
                            return (
                                <Result onClick={() => addTitle(result)}>
                                    {result.title}
                                </Result>
                            );
                        }
                    })}
                </Results>
            )}
        </>
    );
}

SearchResults.propTypes = {
    query: PropTypes.string,
    queryResults: PropTypes.array
};

export default SearchResults;
