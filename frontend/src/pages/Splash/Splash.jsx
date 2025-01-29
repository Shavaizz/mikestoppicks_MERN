import React from 'react'
import {Link} from 'react-router-dom'
const Splash = () => {
  return (
    <>
        <div className="splash-wrapper">
            <h2 id='navbar-heading'>Navigate To Desired Panels</h2>
            <div id="button-wrapper">
                <button type="button"><Link to='/user-panel'>User Panel</Link></button>
                <button type="button"><Link to='/product-panel'>Product Panel</Link></button>
                <button type="button"><Link to='/cart-panel'>Cart Panel</Link></button>
                <button type="button"><Link to='/order-panel'>Order Panel</Link></button>
            </div>
        </div>
    </>
  )
}

export default Splash