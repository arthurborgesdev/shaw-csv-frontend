import React, {useState, useContext} from 'react';
import UserContext from './UserContext';

import searchParse from './utils/searchParse';

const API_URL = process.env.REACT_APP_API_URL;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [, setUsers] = useContext(UserContext);

  const searchHandler = async () => {
    if (!searchTerm) {
      setResultMessage("Please provide a search term");
      return;
    }

    try {
      const searchQuery = searchParse(searchTerm);
      const response = await fetch(`${API_URL}/api/users?q=${searchQuery}`);
      const users = await response.json();
      setUsers(users);
      setResultMessage("Search completed!");
    } catch (e) {
      setUsers([]);
      setResultMessage("Internal error related to search/API occurred");
    }
  }

  return (
    <>
      <h2>Search</h2>
      <label htmlFor="search-term" className="search-label">
        Search term
        <input type="text" id="search-term" onChange={(e) => setSearchTerm(e.target.value)} />
      </label>

      <button onClick={searchHandler}>Search</button>
      <p className='result-message'>
        {resultMessage}
      </p>
    </>
  )
}

export default Search;