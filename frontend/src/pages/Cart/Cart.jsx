import React from "react";
import CartItems from "../../components/CartItems/CartItems";
import api from "../../axiosinstance";
const Cart = (user) => {
	const clearCart = () => {
		console.log("increase product count");
	};
  const decreaseProdCount = () => {
		try {
      console.log("decrease prod count")
		} catch (error) {
			console.log("Error Decreasing Product Count");
		}
	};
	const increaseProdCount = () => {
		console.log("increase product count");
	};
	return (
    
		<>
			<div className="cart-wrapper">
				Welcome To Your Cart, {user.user?.user}
			</div>
      <div className="cart-item-wrapper">
      <CartItems user={user}/>
      </div>
			<div className="cart-page-actions">
				<button type="button">Clear Cart</button>
        <button type="button">Place Order</button>
			</div>
		</>
	);
};

export default Cart;
