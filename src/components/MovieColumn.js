import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Movie from "./Movie";

const MovieListUL = styled.div`
    list-style: none;
    padding: 0px;
`;

function onDragEnd() {}

function MovieColumn({ list, removeMovie }) {
    return (
        <DragDropContext onDragEnd="">
            <Droppable droppableId="movie-list">
                {(provided) => (
                    <MovieListUL
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {list.map((movie, index) => (
                            <Movie
                                movie={movie}
                                index={index}
                                removeMovie={removeMovie}
                            />
                        ))}
                        {provided.placeholder}
                    </MovieListUL>
                )}
            </Droppable>
        </DragDropContext>
    );
}

MovieColumn.propTypes = {
    list: PropTypes.array,
    removeMovie: PropTypes.func
};

export default MovieColumn;
