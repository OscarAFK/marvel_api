import React from "react";
import { Outlet } from "react-router-dom";

/**
 * A React component used to display the header
 */
function Header() {
    const url = "";

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Header;