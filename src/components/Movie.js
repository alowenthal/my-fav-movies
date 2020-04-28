/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";

const MovieItem = styled.div`
    padding: 1rem;
    border-bottom: 1px solid #222222;
    display: grid;
    grid-template-columns: 100px 100px auto 200px;
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
    font-size: 72px;
    font-weight: 800;
`;

const MovieTitle = styled.span`
    color: #ffffff;
    font-size: 32px;
    font-weight: 600;
`;

function Movie({ movie, index, removeMovie }) {
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
                        func={() => removeMovie(movie.id, movie.actors)}
                        type="button"
                        bgColor="none"
                        borderColor="#ffffff"
                        textColor="#ffffff"
                        text={<FontAwesomeIcon icon={faTimes} />}
                    />
                </MovieItem>
            )}
        </Draggable>
    );
}

Movie.propTypes = {
    movie: PropTypes.array,
    index: PropTypes.number,
    removeMovie: PropTypes.func
};

export default Movie;
