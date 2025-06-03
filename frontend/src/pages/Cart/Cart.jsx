import React, { useState } from "react";
import "./Cart.css";
import CartItems from "../../components/CartItems/CartItems";
import Checkout from "../../components/Checkout/Checkout";
const Cart = (user) => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);

	return (
		<>
			<div className="cart-wrapper">
				<h2>Welcome To Your Cart, {user.user?.usernick}!</h2>
			</div>
			<div className="cart-checkout-wrapper">
				<div className="cart-item-wrapper">
					<CartItems
						user={user}
						setTotalItemCount={setTotalQuantity}
						setTotalPrice={setTotalPrice}
					/>
				</div>
				<div className="checkout-wrapper">
					<Checkout
						user={user}
						totalPrice={totalPrice}
						totalQuantity={totalQuantity}
					/>
				</div>
			</div>
		</>
	);
};

export default Cart;
