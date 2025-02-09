import React from 'react'
import {Link} from 'react-router-dom'
import './Splash.css'
const Splash = () => {
  return (
    <>
        <div className="splash-wrapper">
            <h1 id='navbar-heading'>Navigate To Desired Panels</h1>
            <div id="button-wrapper">
                <button className="button-for-link" type="button"><Link to='/user-panel'>User Panel</Link></button>
                <button className="button-for-link" type="button"><Link to='/product-panel'>Product Panel</Link></button>
                <button className="button-for-link" type="button"><Link to='/cart-panel'>Cart Panel</Link></button>
                <button className="button-for-link" type="button"><Link to='/order-panel'>Order Panel</Link></button>
            </div>
        </div>
    </>
  )
}

export default Splash