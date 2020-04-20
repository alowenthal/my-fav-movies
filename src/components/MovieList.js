import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MovieListUL = styled.ul`
    list-style: none;
    padding: 0px;
`;

const Movie = styled.li`
    padding: 1rem;
    border-bottom: 1px solid #f1f1f1;
    display: grid;
    grid-template-columns: 40px 100px auto 200px;
    align-items: center;

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
                        <span className="movie__position">{index + 1}</span>
                        <img
                            className="movie__poster"
                            src={movie.poster}
                            alt={`${movie.title} Poster`}
                        />
                        <span className="movie__title">{movie.title}</span>
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
