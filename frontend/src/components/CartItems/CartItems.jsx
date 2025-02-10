import React, { useState, useEffect } from "react";
import api from "../../axiosinstance";
import "./CartItems.css";
const CartItems = ({ user }) => {
	const [cartObjects, setCartObjects] = useState([]);
	useEffect(() => {
		const fetchCartObjects = async () => {
			try {
				const response = await api.get(
					`http://localhost:3000/api/cart/${user.user?.id}`
				);
				console.log(user?.user);
				setCartObjects(response.data.items);
			} catch (error) {
				console.error("Error fetching cart objects:", error);
			}
		};
		fetchCartObjects();
	}, []);
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
										<p className="cart-price">${item.productId.price * item.quantity}</p>
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
