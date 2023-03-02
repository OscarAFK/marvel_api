import React, { FormEvent } from "react";

/**
 * A React component used to allow the user to load more characters.
 * 
 * @param onLoadMoreCharacters A callback used when the user click on the button
 */
function LoadMoreCharacters(props: { onLoadMoreCharacters: (event: FormEvent) => void, shouldBeLoading: boolean }) {
    if (props.shouldBeLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-grow marvel-color text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <button className="container-fluid btn btn-secondary px-5 my-5" onClick={props.onLoadMoreCharacters}>
            Load More Characters
        </button>
    );

}

export default LoadMoreCharacters;