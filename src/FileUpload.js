import React, {useState, useContext} from 'react';
import UserContext from './UserContext';
import Cards from './Cards';
import Search from './Search';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function FileUpload() {
  const [file, setFile] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  // const [data, setData] = useState([]);
  // const [users, setUsers] = useContext(UserContext);

  const [users, setUsers] = useContext(UserContext);

  const fileSelectedHandler = (event) => {
    setFile(event.target.files[0]);
  }

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append('csv-file', file);

    if (!file) {
      setResultMessage("Please provide a file");
      return;
    }

    const fileType = file.name.split('.').pop();
    const allowedFileTypes = ['csv'];
    if (!allowedFileTypes.includes(fileType)) {
      setUsers([]);
      setResultMessage("Please provide only CSV files");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/files`, {
        method: 'POST',
        body: formData
      });
      const users = await response.json();
      setUsers(users);
      console.log(users);
      setResultMessage("File sucessfully uploaded!");
    } catch (e) {
      console.log(e);
      setUsers([]);
      setResultMessage("Internal error related to upload/API occurred");
    }
  }

  return (
    <>
      <p>CSV Uploader</p>
      <input type="file" name="csv-file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Load CSV</button>
      <p className='result-message'>
        {resultMessage}
      </p>

      {users.length > 0 ?
      <>
        <Cards data={users} />
        <Search />
      </>
      : null}
    </>
  )
}

export default FileUpload;