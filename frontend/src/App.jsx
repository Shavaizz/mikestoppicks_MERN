import React, {useState} from 'react'
import HomePage from './pages/HomePage'
import SearchResultPage from './pages/searchResultPage/SearchResultPage';
import Navbar from './components/Navbar/Navbar'
import Login from "./pages/LoginPage/Login"
import AdminPanel from "./pages/AdminPanel/AdminPanel"
import AdminPanelSignUpPages from './pages/AdminPanelSignUpPages/AdminPanelSignUpPages';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/RegisterPage/RegisterPage';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'; // Admin Route
import UserValidationRoute from './components/UserValidationRoute';
import OrderPanel from './pages/OrderPanel/OrderPanel'
import Splash from './pages/Splash/Splash';
import Cart from './pages/Cart/Cart' // User Route

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
          {/* User Accessible */}
          <Route path="/" element={<HomePage user={user} />}/>
          <Route path="/search-results" element={<SearchResultPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin}/>}/>
          <Route path='/register' element={<Register/>}/>
          {/* Logged In User Accesible */}
          <Route
            path='/cart'
            element={
              <UserValidationRoute user={user}>
                <Cart user={user}/>
              </UserValidationRoute>
            }
          />
          {/* Admin Accesible Routes */}
          <Route  
            path='/cart-panel' 
            element={
            <ProtectedRoute user={user}>
              <ShoppingCart user={user}/>
            </ProtectedRoute>
            }/>
          <Route
            path='order-panel'
            element={
              <ProtectedRoute user={user}>
                <OrderPanel user={user}/>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/product-panel" 
            element={
              <ProtectedRoute user={user}>
                <AdminPanel user={user} />
              </ProtectedRoute>
            } 
          />
          <Route
            path='/user-panel'
            element={
              <ProtectedRoute user={user}>
                <AdminPanelSignUpPages user={user}/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/splash'
            element={
              <ProtectedRoute user={user}>
                <Splash/>
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </>
  )
}

export default App