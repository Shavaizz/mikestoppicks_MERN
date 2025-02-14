import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'
const Navbar = ({user, setUser}) => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    setUser(null); // Reset user state
    navigate('/login'); // Redirect to login page
  };
  return (
<div className='navbar-wrapper'> 
  <h2 id='mike-heading'>MikesTopPicks</h2>
  <nav className='navbar-nav'>
    <ul id='navbar-ul-wrapper'>
      {/* Not Logged In Navigation  */}
      <ul><Link to="/">Home</Link></ul>
      {!user &&<ul><Link to="/login">Login</Link></ul>}
      {!user && <ul><Link to="/register">Register</Link></ul>}
      {/* Admin Navigation */}
      {user?.isAdmin && <ul><Link to="/splash">Admin Panel</Link></ul>}
      {/* User Navigation */}
      {user && !user.isAdmin && <ul><Link to="/cart">Cart</Link></ul> }
      {user && !user.isAdmin && <ul><Link to="/orders">Orders</Link></ul> }
      {user && <ul><button id="logout-button" onClick={handleLogout}>Logout</button></ul>}
    </ul>
  </nav>
</div>
  )
}

export default Navbar