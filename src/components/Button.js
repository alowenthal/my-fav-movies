import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Button({ text, func, bgColor, textColor, query }) {
    const Btn = styled.button`
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem;
        border-radius: 4px;
        border: none;
        font-size: 20px;
    `;

    return (
        <Btn onClick={() => func(query)} type="button">
            {text}
        </Btn>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    func: PropTypes.func,
    query: PropTypes.string
};

export default Button;
