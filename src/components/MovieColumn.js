/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import MovieSearch from "./MovieSearch";
import Movie from "./Movie";

const MovieList = styled.div`
    list-style: none;
    padding: 0px;
`;

function MovieColumn({
    addTitle,
    query,
    searchQuery,
    setQuery,
    removeTitle,
    list,
    setList,
    queryResults,
    type,
    setMediaType
}) {
    useEffect(() => setMediaType(type));

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

        const updatedList = list;

        updatedList.splice(source.index, 1);
        updatedList.splice(destination.index, 0, JSON.parse(draggableId));

        setList([...updatedList]);
    }

    return (
        <>
            <MovieSearch
                addTitle={addTitle}
                query={query}
                searchQuery={searchQuery}
                setQuery={setQuery}
                queryResults={queryResults}
                type={type}
            />
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
                                    removeTitle={removeTitle}
                                    key={JSON.stringify(movie)}
                                    type={type}
                                />
                            ))}
                            {provided.placeholder}
                        </MovieList>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

MovieColumn.propTypes = {
    addTitle: PropTypes.func,
    searchQuery: PropTypes.string,
    query: PropTypes.string,
    setQuery: PropTypes.func,
    list: PropTypes.array,
    setList: PropTypes.func,
    removeTitle: PropTypes.func,
    queryResults: PropTypes.array,
    type: PropTypes.string,
    setMediaType: PropTypes.func
};

export default MovieColumn;
