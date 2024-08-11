import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './searchBar';

const FetchComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Set loading to true while fetching data
                setLoading(true);

                // Make API call using fetch
                const response = await fetch('https://api.github.com/repos/facebook/react/issues');

                // Check if the response is successful (status code in the range 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse JSON data
                const result = await response.json();

                // Update state with the fetched data
                setData(result);
            } catch (error) {
                // Handle errors
                setError(error);
            } finally {
                // Set loading to false after data fetching (whether successful or not)
                setLoading(false);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []);

    // Render UI based on data, loading, and error states
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    const handleSearch = (searchTerm) => {
        // Filter the data based on the search term
        const filteredIssues = data.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredIssues);
    };

    return (
        <div className={`d-flex flex-column align-items-center`}>
            <div className={`col-12 col-lg-10 my-4`}>
                <h1 className={`text-center mb-5`}>React Issues</h1>
                <h5 className={`px-4 text-center fs-4`}>This is a list of issues brought from the react issues API on Github.</h5>
                <p className={`px-4 text-center fs-4`}>Click on a Title to visit it's page.</p>
                {/* Render UI based on the fetched data */}
                {data && (
                    <div>
                        <SearchBar onSearch={handleSearch}/>

                        <div className={`overflow-x-auto`}>
                            <table className={`mb-0 table table-dark table-striped table-bordered border-light`}>
                                <thead>
                                    <tr className={`text-center`}>
                                        <th>Title</th>
                                        <th>Id</th>
                                        <th>User</th>
                                        <th>Labels</th>
                                    </tr>
                                </thead>
                                <tbody className={`table-group-divider`}>
                                    {(filteredData || data).map(item => (
                                        <tr key={item.id} className={`align-middle`}>
                                            <td className={`px-4`}><a href={item.html_url} target="_blank" rel="noopener noreferrer" className={`text-decoration-none text-light`}>{item.title}</a></td>
                                            <td className={`px-4`}>{item.id}</td>
                                            <td className={`px-4`}>{item.user.login}</td>
                                            <td className={`px-4`}>
                                                <div className={`d-flex flex-column gap-2`}>
                                                    {item.labels.map(label => <p key={label.id} className={`mb-0 px-4 rounded-3 text-dark`} style={{ backgroundColor: `#` + label.color }}>{label.name}</p>)
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FetchComponent;