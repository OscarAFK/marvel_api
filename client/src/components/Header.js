import React from "react";

/**
 * A React component used to display the header
 */
function Header() {
    const url = "";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href={url}>Marvel Characters</a>
                <span></span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/browse">Browse</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/superteam">Superteam</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header;