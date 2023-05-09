import logo from './logo.svg';
import './App.css';
import AdminPanel from './Components/Admin';
import Login from './Components/login';
import { useState } from 'react';

function App() {

  const [isAuth, setIsAuth] =  useState(false)

  const handleCallback = (data) => {
    setIsAuth(data);
  } 

  return (
    <div>
     
      {isAuth ? <AdminPanel isAuth={isAuth} callback={handleCallback}/> : <Login callback={handleCallback}/>}
    </div>
  );
}

export default App;
