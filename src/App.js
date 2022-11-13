import './App.css';
import { Route,Routes , Navigate} from 'react-router-dom';
import React, { useState } from 'react';
import LoginForm from './components/loginForm';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import NotFound from './components/notFound';
import Profile from './forms/Profile';
import Faculty_dashboard from './components/Faculty_dashboard';


function App() {

  const [token,setToken] = useState('');  //for authentication

  return (
    <React.Fragment>
    <main className='container'>
      <Routes>
        <Route path="/signup" element={ <Form />}></Route>
        <Route path="/login" element={ <LoginForm  setToken={setToken}/>}></Route>
        <Route path="/Faculty_dashboard" element={<Faculty_dashboard Token={token}/>}>
          <Route path="/Faculty_dashboard/profile" element={<Profile/>}/>
        </Route>
        <Route path="/dashboard" element={ <Dashboard Token ={token} setToken = {setToken}/>}>
          <Route path="/dashboard/profile" element={<Profile/>}/>
        </Route>
        <Route path="/not-found" element={ <NotFound />}></Route>
        <Route path="/" element={<Navigate to="/signup" />}></Route>
        <Route path="*" element={<Navigate to="/not-found" />}></Route>
      </Routes>
    </main>
    </React.Fragment>

  );
}

export default App;
