import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

const MovieItem = styled.div`
    padding: 1rem;
    border-bottom: 1px solid #f1f1f1;
    display: grid;
    grid-template-columns: 40px 100px auto 200px;
    align-items: center;

    img {
        max-height: 100px;
    }
`;

function Movie({ movie, index, removeMovie }) {
    return (
        <Draggable draggableId={movie.id} index={index}>
            {(provided) => (
                <MovieItem
                    key={`movie--${movie.id}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    <span className="movie__position">{index + 1}</span>
                    <img
                        className="movie__poster"
                        src={movie.poster}
                        alt={`${movie.title} Poster`}
                    />
                    <span className="movie__title">{movie.title}</span>
                    <button onClick={() => removeMovie(movie.id)} type="button">
                        Remove
                    </button>
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
