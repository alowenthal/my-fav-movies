import React from "react";
import PropTypes from "prop-types";

function Login({ authenticate }) {
    return (
        <nav className="login">
            <h2>Inventory Login</h2>
            <p>Sign in</p>
            <button
                className="github"
                onClick={() => authenticate("Facebook")}
                type="button"
            >
                Facebok
            </button>
        </nav>
    );
}

Login.propTypes = {
    authenticate: PropTypes.func
};

export default Login;
