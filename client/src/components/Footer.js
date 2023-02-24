import React from "react";
import { Outlet } from "react-router-dom";

/**
 * A React component used to display the footer
 */
function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top text-light">
                <div>
                    Data provided by Marvel. © 2014 Marvel
                </div>
                <ul>
                    <a href="http://marvel.com">Marvel Website</a>

                </ul>
            </footer>
        </div>
    )
}

export default Footer;