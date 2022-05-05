import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import Login from './components/Login';

function App() {
  const [{ user }, dispatch] = useStateValue();
  // No persistance
  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
        <>
          <div className='app-body'>
            <BrowserRouter>
              <Sidebar />
              <Routes>
                {/* :roomId is called a wild card. Look that up later.  */}
                <Route
                  path='/rooms/:roomId'
                  element={
                    <>
                      <Chat />
                    </>
                  }
                />
                <Route path='/'></Route>
              </Routes>
            </BrowserRouter>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
