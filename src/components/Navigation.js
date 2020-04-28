import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

const Nav = styled.nav`
    font-size: 14px;
    background: #f8f8f8;
    padding: 1rem;

    .nav-item {
        padding: 1rem;

        &:first-child {
            padding-left: 0px;
        }
    }
`;

function Navigation() {
    return (
        <>
            <Nav>
                <Link className="nav-item" to="/">
                    Favorites
                </Link>
                <Link className="nav-item" to="/to-watch">
                    + To Watch
                </Link>
                <Link className="nav-item" to="/actors">
                    My Actors
                </Link>
            </Nav>
        </>
    );
}

Navigation.propTypes = {};

export default Navigation;
