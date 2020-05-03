import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Results = styled.div`
    background: #ffffff;
    list-style: none;
    margin: 0px;
    width: 100%;
    border-radius: 0px 4px;
    position: absolute;
    max-height: 300px;
    overflow-y: scroll;
    top: 55px;
`;

const Result = styled.a`
    color: #000000;
    padding: 1rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &:hover {
        background: #f1f1f1;
        cursor: pointer;
    }
`;

const ResultPoster = styled.span`
    max-width: 30px;
    margin-right: 1rem;

    img {
        max-width: 30px;
    }
`;

const ResultInfo = styled.span`
    display: flex;
    flex-flow: column wrap;
`;

const ResultTitle = styled.span`
    font-weight: 700;
    font-size: 1.125rem;
`;

const ResultActors = styled.span`
    font-size: 0.75rem;

    span {
        &:after {
            content: ",";
            margin-right: 3px;
        }

        &:last-child {
            &:after {
                content: "";
                margin-right: 0px;
            }
        }
    }
`;

const Spinner = styled.div`
    background-color: #f3f3f3;
    height: 55px;
    width: 90%;
    margin: 1rem;
    overflow: hidden;
    border-radius: 4px;

    &:after {
        content: "";
        height: 100%;
        width: 100px;
        display: block;
        background: linear-gradient(
            to right,
            rgba(230, 230, 230, 0) 0%,
            rgba(221, 221, 221, 0.4) 42%,
            rgba(221, 221, 221, 0.4) 62%,
            rgba(230, 230, 230, 0) 100%
        );

        animation: load 1.2s ease-out infinite;
    }

    @keyframes load {
        0% {
            transform: translateX(-100%);
        }

        100% {
            transform: translateX(200%);
        }
    }
`;

function SearchResults({ searchQuery, queryResults, addTitle }) {
    return (
        <Results>
            {queryResults ? (
                queryResults.map((result) => {
                    if (result.title) {
                        return (
                            <>
                                {searchQuery && (
                                    <Result
                                        onClick={(e) => addTitle(e, result)}
                                    >
                                        <ResultPoster>
                                            <img
                                                src={
                                                    result.image
                                                        ? result.image.url
                                                        : "https://via.placeholder.com/100x124.png"
                                                }
                                                alt={`${result.title} Poster`}
                                                onError="https://via.placeholder.com/100x124.png"
                                            />
                                        </ResultPoster>
                                        <ResultInfo>
                                            <ResultTitle>
                                                {result.title}
                                            </ResultTitle>
                                            <ResultActors>
                                                {result.principals
                                                    ? result.principals.map(
                                                          (actor) => (
                                                              <span>
                                                                  {actor.name}
                                                              </span>
                                                          )
                                                      )
                                                    : ""}
                                            </ResultActors>
                                        </ResultInfo>
                                    </Result>
                                )}
                            </>
                        );
                    }
                })
            ) : (
                <>{searchQuery !== "" && <Spinner />}</>
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
