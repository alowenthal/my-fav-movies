import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
    z-index: 100;
`;

const Result = styled.a`
    color: #000000;
    padding: 1rem;
    display: grid;
    grid-template-columns: 12% auto 20%;
    align-items: center;
    background: ${(props) => (props.inList ? "#78e08f" : "white")};

    &:hover {
        background: ${(props) => (props.inList ? "#78e08f" : "#f1f1f1")};
        cursor: ${(props) => (props.inList ? "inherit" : "pointer")};
    }
`;

const ResultPoster = styled.img`
    max-width: 30px;
`;

const ResultInfo = styled.span`
    display: flex;
    flex-flow: column wrap;
`;

const ResultTitle = styled.span`
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1;
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

const ResultYear = styled.span`
    font-size: 1rem;
    text-align: right;
    color: #c8c8c8;
`;

const ResultListPosition = styled.span`
    display: flex;
    flex-flow: column wrap;
    text-align: center;
    justify-self: end;

    .result-inlist-position {
        font-size: 1rem;
        font-weight: 700;
        line-height: 0.5;
    }

    .result-inlist-title {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
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
                                        onClick={
                                            result.inListPosition
                                                ? ""
                                                : (e) => addTitle(e, result)
                                        }
                                        inList={result.inListPosition}
                                    >
                                        <ResultPoster
                                            src={
                                                result.image
                                                    ? result.image.url
                                                    : "https://via.placeholder.com/100x124.png"
                                            }
                                            alt={`${result.title} Poster`}
                                            onError="https://via.placeholder.com/100x124.png"
                                        />
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
                                        {result.inListPosition ? (
                                            <ResultListPosition>
                                                <span className="result-inlist-position">{`${result.inListPosition}/${result.inListTotal}`}</span>
                                                <span className="result-inlist-title">
                                                    In my list
                                                </span>
                                            </ResultListPosition>
                                        ) : (
                                            <ResultYear>
                                                {result.year}
                                            </ResultYear>
                                        )}
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
