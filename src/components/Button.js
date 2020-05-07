import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Button({ text, func, bgColor, textColor, isDisabled, cName }) {
    const Btn = styled.button`
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem;
        border-radius: 4px;
        border: none;
        font-size: 20px;
        opacity: ${isDisabled ? "0.8" : "1"};
        width: 100%;

        &:hover {
            cursor: ${isDisabled ? "auto" : "pointer"};
        }
    `;

    return (
        <Btn
            onClick={func}
            type="button"
            disabled={isDisabled}
            className={cName}
        >
            {text}
        </Btn>
    );
}

Button.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    func: PropTypes.func,
    isDisabled: PropTypes.bool,
    cName: PropTypes.string
};

export default Button;
