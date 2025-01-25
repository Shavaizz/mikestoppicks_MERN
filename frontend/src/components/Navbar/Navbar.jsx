import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
const Navbar = ({user, setUser}) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    setUser(null); // Reset user state
    navigate('/login'); // Redirect to login page
  };
  return (
<div className='navbar-wrapper'> 
  <h2>MikesTopPicks</h2>
  <nav className='navbar-nav'>
    <ul id='navbar-ul-wrapper'>
      <ul><Link to="/">Home</Link></ul>
      <ul><Link to="/login">Login</Link></ul>
      <ul><Link to="/register">Register</Link></ul>
      {user?.isAdmin && <ul><Link to="/admin">Admin Panel</Link></ul>}
      {user?.isAdmin && <ul><Link to="/admin-sign-up">New User Sign Up</Link></ul>}
      {user && <ul><Link to="/cart">Cart</Link></ul> }
      {user && <ul><button onClick={handleLogout}>Logout</button></ul>}
    </ul>
  </nav>
</div>
  )
}

export default Navbar