import React, {useState} from 'react'
import HomePage from './pages/HomePage'
import SearchResultPage from './pages/searchResultPage/SearchResultPage';
import Navbar from './components/Navbar/Navbar'
import Login from "./pages/LoginPage/Login"
import AdminPanel from "./pages/AdminPanel/AdminPanel"
import AdminPanelSignUpPages from './pages/AdminPanelSignUpPages/AdminPanelSignUpPages';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/RegisterPage/RegisterPage';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import UserValidationRoute from './components/UserValidationRoute';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    if (userData?.user && userData?.token) {
      setUser({ ...userData.user, token: userData.token });
      localStorage.setItem('token', userData.token); // Save token in localStorage
      console.log("UserLoggedIn")
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
          <Route path='/register' element={<Register/>}/>
          <Route 
            path='/cart' 
            element={
            <UserValidationRoute user={user}>
              <ShoppingCart user={user}/>
            </UserValidationRoute>
            }/>
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user}>
                <AdminPanel user={user} />
              </ProtectedRoute>
            } 
          />
          <Route
            path='/admin-sign-up'
            element={
              <ProtectedRoute user={user}>
                <AdminPanelSignUpPages user={user}/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App