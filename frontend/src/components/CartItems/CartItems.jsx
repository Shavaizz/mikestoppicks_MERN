import React, { useState, useEffect } from "react";
import api from "../../axiosinstance";
import "./CartItems.css";
const CartItems = ({ user, setTotalPrice, setTotalItemCount }) => {
	const [cartObjects, setCartObjects] = useState([]);
	const calculateTotal = (items) => {
		const totalPrice = items.reduce(
			(acc, item) => acc + item.productId.price * item.quantity,
			0
		);
		const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
		setTotalPrice(totalPrice);
		setTotalItemCount(totalQuantity);
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

	return (
		<>
			<div className="cart-body">
				{cartObjects.length > 0 ? (
					cartObjects.map((item) => (
						<div className="cart-item-wrapper">
							<div key={item.productId._id} className="cart-item">
								<img
									src={item.productId.image}
									alt={item.productId.title}
									id="cart-item-image"
								/>
								<div className="cart-item-details">
									<div className="cart-item-header">
										<h3>{item.productId.title}</h3>
										<p className="cart-price">
											${item.productId.price * item.quantity}
										</p>
									</div>
									<p className="cart-qty">Qty: {item.quantity}</p>
								</div>
							</div>
						</div>
					))
				) : (
					<p>Your cart is empty.</p>
				)}
			</div>
		</>
	);
};

export default CartItems;
