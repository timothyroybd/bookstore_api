
import React,{useState} from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Library from "./components/Library";
import Login from "./components/Login"
import Signup from "./components/Signup";
function App() {
  const [token, setToken]= useState('')
  return (
    <Router> 
      <div className="App">
        <h1> Online Bookstore</h1>
      </div>
      <main>
        <Routes>
          <Route path = "/" element = {<Login setToken = {setToken} /> } />
          <Route path = "/library" element = {<Library token = {token} /> } />
          <Route path="/signup" element={<Signup setToken={setToken}/>} />
          
          
        </Routes>
        
      </main>

    </Router>
  );
}

export default App;
