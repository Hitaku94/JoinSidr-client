import React from 'react'
import '../SearchBar.css'

function SearchBar() {
    return (
        <div className="searchBox">

            <input class="searchInput"type="text" name="" placeholder="Search">
            <button class="searchButton" href="#">
                <i class="material-icons">
                    search
                </i>
            </button>
        </div>
    )
}

export default SearchBar
