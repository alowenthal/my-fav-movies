/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import { motion, useMotionValue, useTransform } from "framer-motion";

const ToggleContainer = styled.button`
    background: none;
    border: none;

    .container {
        width: 100%;
        height: 40px;
        display: flex;
        place-content: center;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 30px;

        .item {
            width: 60%;
            height: 40px;
            background: #ffffff;
            border-radius: inherit;
            display: flex;
            align-items: center;
            justify-content: center;

            &.watched {
                background-color: #2ecc71;
                color: #ffffff;
                transition: all 0.5s ease;
            }

            svg {
                margin-right: 0.25rem;
            }
        }
    }
`;

function MarkWatched({ addTitle, data, removeTitle, type }) {
    const constraintsRef = useRef(null);
    const x = useMotionValue(200);
    const rotateY = useTransform(x, [0, 0, 0], [0, 0, 0], {
        clamp: false
    });

    const toggleUnwatched = (
        <>
            <FontAwesomeIcon icon={faArrowLeft} />
            Mark Watched
        </>
    );

    const toggleWatched = (
        <>
            <FontAwesomeIcon icon={faCheck} />
            Watched!
        </>
    );

    const [watched, setWatched] = useState(false);

    function onPan(event, info) {
        if (info.point.x < 1000) {
            setWatched(toggleWatched);

            setTimeout(() => {
                addTitle(null, data);
                removeTitle(data.id, null, type);
            }, 1000);
        }
    }

    const itemClasses = classNames({
        item: true,
        watched
    });

    return (
        <ToggleContainer>
            <motion.div
                className="container"
                ref={constraintsRef}
                style={{
                    rotateY
                }}
            >
                <motion.div
                    className={itemClasses}
                    drag="x"
                    dragConstraints={constraintsRef}
                    style={{
                        x
                    }}
                    onPanEnd={onPan}
                >
                    {watched ? toggleWatched : toggleUnwatched}
                </motion.div>
            </motion.div>
        </ToggleContainer>
    );
}

MarkWatched.propTypes = {
    addTitle: PropTypes.func,
    removeTitle: PropTypes.func,
    data: PropTypes.object,
    type: PropTypes.string
};

export default MarkWatched;
