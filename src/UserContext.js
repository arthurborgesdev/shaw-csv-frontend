import React, { createContext, useState } from 'react';

const UserContext = createContext([[], () => {}]);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;