import React from 'react';
import FileUpload from './FileUpload';
import './App.css';
import { UserProvider } from './UserContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserProvider>
          <FileUpload />
        </UserProvider>
      </header>
    </div>
  );
}

export default App;
