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
        cursor: pointer;
    }
`;

const Spinner = styled.div`
    padding: 1rem;
    color: #333;
`;

function SearchResults({ searchQuery, queryResults, addTitle, focus }) {
    return (
        <Results>
            {queryResults ? (
                queryResults.map((result) => {
                    if (result.title) {
                        return (
                            <>
                                {queryResults && focus && (
                                    <Result onClick={() => addTitle(result)}>
                                        {result.title}
                                    </Result>
                                )}
                            </>
                        );
                    }
                })
            ) : (
                <>{searchQuery !== "" && <Spinner>...</Spinner>}</>
            )}
        </Results>
    );
}

SearchResults.propTypes = {
    searchQuery: PropTypes.string,
    queryResults: PropTypes.array,
    addTitle: PropTypes.func
};

export default SearchResults;
