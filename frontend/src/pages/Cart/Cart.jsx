import React from "react";
import './Cart.css'
import CartItems from "../../components/CartItems/CartItems";
import api from "../../axiosinstance";
const Cart = (user) => {
	const clearCart = () => {
		console.log("increase product count");
	};
	return (
    
		<>
			<div className="cart-wrapper">
				<h2>Welcome To Your Cart, {user.user?.usernick}</h2>
			</div>
      <div className="cart-item-wrapper">
      <CartItems user={user}/>
      </div>

		</>
	);
};

export default Cart;
