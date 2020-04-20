import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MovieListUL = styled.ul`
    list-style: none;
    padding: 0px;
`;

const Movie = styled.li`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #f1f1f1;

    img {
        max-height: 100px;
    }
`;

function MovieList({ list, removeMovie }) {
    return (
        <MovieListUL>
            {list.map((movie, index) => {
                return (
                    <Movie key={`movie--${movie.id}`}>
                        <span>{index + 1}</span>
                        <img src={movie.poster} alt={`${movie.title} Poster`} />
                        {movie.title}
                        <button
                            onClick={() => removeMovie(movie.id)}
                            type="button"
                        >
                            Remove
                        </button>
                    </Movie>
                );
            })}
        </MovieListUL>
    );
}

MovieList.propTypes = {
    list: PropTypes.array,
    removeMovie: PropTypes.func
};

export default MovieList;
