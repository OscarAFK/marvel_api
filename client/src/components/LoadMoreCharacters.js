/**
 * A React component used to allow the user to load more characters.
 * 
 * @param {function} onLoadMoreCharacters A callback used when the user click on the button
 */
function LoadMoreCharacters({ onLoadMoreCharacters, shouldBeLoading }) {
    if (shouldBeLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-grow marvel-color text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <button className="container-fluid btn btn-secondary px-5 my-5" onClick={onLoadMoreCharacters}>
            Load More Characters
        </button>
    );

}

export default LoadMoreCharacters;