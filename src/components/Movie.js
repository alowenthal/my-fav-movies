/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";

import MarkWatched from "./MarkWatched";

import Button from "./Button";

const MovieItem = styled.div`
    padding: 1rem;
    border-bottom: 1px solid #222222;
    display: grid;
    grid-template-columns: ${isMobile
        ? `30px 86px auto 40px`
        : `100px 100px auto 100px 225px`};
    align-items: center;

    img {
        max-height: 100px;
    }

    &:active {
        background: #222222;
    }
`;

const MovieNum = styled.span`
    color: #222222;
    font-size: ${isMobile ? `32px` : `72px`};
    font-weight: 800;
`;

const MovieTitle = styled.span`
    color: #ffffff;
    font-size: ${isMobile ? `16px` : `32px`};
    font-weight: 600;
`;

function Movie({ movie, index, removeTitle, type, addTitle }) {
    return (
        <Draggable draggableId={JSON.stringify(movie)} index={index}>
            {(provided) => (
                <MovieItem
                    key={`movie--${movie.id}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <MovieNum>{index + 1}</MovieNum>
                    <img
                        className="movie__poster"
                        src={movie.poster}
                        alt={`${movie.title} Poster`}
                    />
                    <MovieTitle>{movie.title}</MovieTitle>
                    <Button
                        func={() => removeTitle(movie.id, movie.actors, type)}
                        type="button"
                        bgColor="none"
                        borderColor="#ffffff"
                        textColor="#ffffff"
                        cName="remove__title"
                        text={<FontAwesomeIcon icon={faTimes} />}
                    />
                    {type === "toWatch" && (
                        <MarkWatched
                            addTitle={addTitle}
                            data={movie}
                            removeTitle={removeTitle}
                            type={type}
                        />
                    )}
                </MovieItem>
            )}
        </Draggable>
    );
}

Movie.propTypes = {
    movie: PropTypes.array,
    index: PropTypes.number,
    removeTitle: PropTypes.func,
    type: PropTypes.string,
    addTitle: PropTypes.func
};

export default Movie;
