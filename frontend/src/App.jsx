import React, {useState} from 'react'
import HomePage from './pages/HomePage'
import SearchResultPage from './pages/searchResultPage/SearchResultPage';
import Navbar from './components/Navbar/Navbar'
import Login from "./pages/LoginPage/Login"
import AdminPanel from "./pages/AdminPanel/AdminPanel"
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    if (userData?.user && userData?.token) {
      setUser({ ...userData.user, token: userData.token });
      localStorage.setItem('token', userData.token); // Save token in localStorage
    } else {
      console.warn('Invalid login response:', userData);
    }
  };
  return (
    <>
      <Router>
        <div>
        <Navbar user={user} setUser={setUser}/>
        </div>
        <Routes>
          <Route path="/" element={<HomePage user={user} />}/>
          <Route path="/search-results" element={<SearchResultPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user}>
                <AdminPanel user={user} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </>
  )
}

export default App