
import React,{useState} from "react";
import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Library from "./components/Library";
import Login from "./components/Login"
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import AddBook from "./components/AddBook";
import './index.css'
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
function App() {
  const [token, setToken]= useState(localStorage.getItem('token'))
  return (
   
    <Router> 
       <AuthProvider>
      <div className="App">
      <header class="bg-white shadow fixed w-full top-0 left-0 z-50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center"> 
        <Link to="/library" >
        <h1 class="text-2xl font-bold text-gray-900">Tim's Bookstore</h1> 
        </Link></div> </header>
      <main className="mt-16">
        <Routes>
          <Route path = "/" element = {<Login setToken = {setToken} /> } />
          <Route path = "/library" element = {<ProtectedRoute token={token}> <Library initialToken={token}/></ProtectedRoute>} /> 
          <Route path="/signup" element={<Signup setToken={setToken}/>} />
          <Route path="/profile" element={<ProtectedRoute token={token}><Profile token={token} /> </ProtectedRoute> } />
          <Route path ="/addbook" element={<ProtectedRoute token ={token}> <AddBook token={token} /> </ProtectedRoute>} />
          
          
          
        </Routes>
        
      </main>
        </div>
 </AuthProvider>
    </Router>
   
  
  );
}

export default App;
