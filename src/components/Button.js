import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Button({ text, func, bgColor, textColor, query, isDisabled }) {
    const Btn = styled.button`
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem;
        border-radius: 4px;
        border: none;
        font-size: 20px;
        opacity: ${isDisabled ? "0.8" : "1"};

        &:hover {
            cursor: ${isDisabled ? "auto" : "pointer"};
        }
    `;

    return (
        <Btn onClick={() => func(query)} type="button" disabled={isDisabled}>
            {text}
        </Btn>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    func: PropTypes.func,
    query: PropTypes.string,
    isDisabled: PropTypes.bool
};

export default Button;
