/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import ToggleButton from "react-toggle-button";

function MarkWatched({ addTitle, data, removeTitle, type }) {
    const [watched, setWatched] = useState(false);

    function onToggle() {
        setWatched(!watched);

        setTimeout(() => {
            addTitle(null, data);
            removeTitle(data.id, null, type);
        }, 1000);
    }

    return (
        <ToggleButton
            value={watched}
            onToggle={onToggle}
            inactiveLabel="Mark Watched"
            activeLabel="Watched"
            width="150"
            height="50px"
            containerStyle={{
                display: "inline-block",
                width: "150px",
                height: "50px",
                margin: isMobile ? "1rem 0px" : "0px"
            }}
            thumbStyle={{
                height: "48px",
                width: "48px"
            }}
            trackStyle={{ width: "150px", height: "50px" }}
            thumbAnimateRange={[1, 100]}
            activeLabelStyle={{
                width: "50px",
                height: "50px",
                fontSize: "18px",
                lineHeight: "1",
                textAlign: "center"
            }}
            inactiveLabelStyle={{
                width: "50px",
                height: "50px",
                fontSize: "18px",
                lineHeight: "1",
                textAlign: "center"
            }}
        />
    );
}

MarkWatched.propTypes = {
    addTitle: PropTypes.func,
    removeTitle: PropTypes.func,
    data: PropTypes.object,
    type: PropTypes.string
};

export default MarkWatched;
