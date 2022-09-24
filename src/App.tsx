import { Routes, Route } from 'react-router';
import Landing from './Landing';

function App() {

  return (
    <>
      <Routes>
        <Route element={<Landing />} path="/" />
      </Routes>
    </>
  )
}

export default App;
