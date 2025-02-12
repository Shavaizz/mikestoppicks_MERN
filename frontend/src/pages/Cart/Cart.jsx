import React from "react";
import "./Cart.css";
import CartItems from "../../components/CartItems/CartItems";
import Checkout from "../../components/Checkout/Checkout";
const Cart = (user) => {
	return (
		<>
			<div className="cart-wrapper">
				<h2>Welcome To Your Cart, {user.user?.usernick}</h2>
			</div>
			<div className="cart-checkout-wrapper">
				<div className="cart-item-wrapper">
					<CartItems user={user} />
				</div>
				<div className="checkout-wrapper">
					<Checkout user={user} />
				</div>
			</div>
		</>
	);
};

export default Cart;
