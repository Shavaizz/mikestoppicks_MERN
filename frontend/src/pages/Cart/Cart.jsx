import React, { useState,useEffect } from "react";
import "./Cart.css";
import api from "../../axiosinstance";
import CartItems from "../../components/CartItems/CartItems";
import Checkout from "../../components/Checkout/Checkout";
const Cart = (user) => {
	const [cartObjects, setCartObjects] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const calculateTotal = (items) => {
	const totalPrice = items.reduce(
			(acc, item) => acc + item.productId.price * item.quantity,
			0
		);
		const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
		setTotalPrice(totalPrice);
		setTotalQuantity(totalQuantity);
	};
	useEffect(() => {
		const fetchCartObjects = async () => {
			try {
				const response = await api.get(
					`http://localhost:3000/api/cart/${user.user?.id}`
				);
				setCartObjects(response.data.items);
				calculateTotal(response.data.items);
			} catch (error) {
				console.error("Error fetching cart objects:", error);
			}
		};
		fetchCartObjects();
	}, [user.user]);
	const handleClearCart = async () => {
		try {
			await api.delete(`http://localhost:3000/api/cart/clear/${user.user?.id}`);
			setCartObjects([]); 
			calculateTotal([]); 
		} catch (error) {
			console.error("Error clearing cart:", error);
		}
	};
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
						cartObjects={cartObjects}
					/>
				</div>
				<div className="checkout-wrapper">
					<Checkout
						user={user}
						totalPrice={totalPrice}
						totalQuantity={totalQuantity}
						clearCart={handleClearCart}
					/>
				</div>
			</div>
		</>
	);
};

export default Cart;
