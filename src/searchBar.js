import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        // Pass the search term to the parent component
        onSearch(searchTerm);
    };

    return (
        <div className={`input-group d-flex justify-content-center mb-4 mt-5`}>
            <input
                className={`col-6 col-lg-4 border-1 rounded-start-2 ps-2`}
                placeholder={`Type to filter titles`}
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button className={`btn btn-outline-dark`} onClick={handleSearch}>
                Filter
            </button>
        </div>
    );
};

export default SearchBar;