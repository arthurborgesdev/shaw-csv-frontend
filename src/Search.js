import React, {useState, useContext} from 'react';
import UserContext from './UserContext';

const API_URL = process.env.REACT_APP_API_URL;

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  // const [data, setData] = useState([]);
  const [, setUsers] = useContext(UserContext);

  const searchHandler = async () => {
    if (!searchTerm) {
      setResultMessage("Please provide a search term");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/search?searchTerm=${searchTerm}`);
      const users = await response.json();
      setUsers(users);
      console.log(users);
      setResultMessage("Search completed!");
    } catch (e) {
      console.log(e);
      setUsers([]);
      setResultMessage("Internal error related to search/API occurred");
    }
  }

  return (
    <>
      <p>Search</p>
      <input type="text" name="search-term" onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={searchHandler}>Search</button>
      <p className='result-message'>
        {resultMessage}
      </p>
    </>
  )
}

export default Search;