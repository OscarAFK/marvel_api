import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faTrash } from '@fortawesome/free-solid-svg-icons'
import CredentialsForm from "../components/CredentialsForm";


/**
 * A react component to display the login page.
 */
const Login = () => {
    const [shouldAskCredentials, setShouldAskCredentials] = useState(true);

    const handleResponse = (data) => {
        setShouldAskCredentials(data.todo === "askCredentials");
    }

    useEffect(() => {
        fetch("http://localhost:8000/login", { mode: 'cors', mathod: "GET" })
            .then((res) => { return res.json(); })
            .then((data) => {
                handleResponse(data);
            });
    }, [shouldAskCredentials]);

    const sendCredentials = (publicKey, privateKey) => {
        fetch("http://localhost:8000/login", {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify({ publicKey: publicKey, privateKey: privateKey }),
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => { return res.json(); })
            .then((data) => {
                setShouldAskCredentials(false);
            });
    }

    const resetCredentials = () => {
        fetch("http://localhost:8000/login", {
            method: "DELETE",
            mode: 'cors'
        }).then(() => {
            setShouldAskCredentials(true);
        });
    }

    if (shouldAskCredentials) {
        return (
            <div className="container text-center py-5">
                <div className="display-5 text-light">
                    Fill-in the credentials of your <a href="https://developer.marvel.com/account" target="_blank" rel="noreferrer">Marvel account</a>.
                </div>
                <div className="text-primary fa-10x">
                    <FontAwesomeIcon icon={faLock} />
                </div>
                <CredentialsForm onSubmit={sendCredentials} />
            </div>
        )
    }

    return (
        <div className="container text-center py-5">
            <div className="display-5 text-light">
                You already have provided your credentials.
            </div>
            <div className="text-primary fa-10x">
                <FontAwesomeIcon icon={faLock} />
            </div>
            <div className="col-12">
                <button className="btn btn-lg btn-primary rounded-pill hover-zoom-shine" style={{ color: "black" }} type="submit" onClick={resetCredentials}>
                    <FontAwesomeIcon icon={faTrash} />
                    <strong> Reset credentials</strong>
                </button >
            </div>
        </div>
    );
};

export default Login