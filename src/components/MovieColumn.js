/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Movie from "./Movie";

const MovieList = styled.div`
    list-style: none;
    padding: 0px;
`;

function MovieColumn({ list, removeMovie, myList, setList }) {
    function onDragEnd(result) {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            // eslint-disable-next-line no-useless-return
            return;
        }

        const updatedList = myList;

        updatedList.splice(source.index, 1);
        updatedList.splice(destination.index, 0, draggableId);

        console.log("original list", myList);
        console.log("new list", updatedList);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="movie-list">
                {(provided) => (
                    <MovieList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {list.map((movie, index) => (
                            <Movie
                                movie={movie}
                                index={index}
                                removeMovie={removeMovie}
                                key={`movie--${index}`}
                            />
                        ))}
                        {provided.placeholder}
                    </MovieList>
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
