import { Routes, Route } from 'react-router';
import Landing from './Landing';
import Dashboard from './Dashboard';
import UserContext from './UserContext';
import { useState } from 'react';

function App() {

  const [serverRes, setServerRes] = useState('');
  const [credentials, setCredentials] = useState({
      username: '',
      password: ''
  });

  return (
    <>
    <UserContext.Provider value={{serverRes, setServerRes, credentials, setCredentials}}>
      <Routes>
        <Route element={<Landing />} path="/" />
        <Route element={<Dashboard />} path="/dashboard" />
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App;
