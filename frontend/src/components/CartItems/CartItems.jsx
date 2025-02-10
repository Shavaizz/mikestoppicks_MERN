import React, { useState, useEffect } from "react";
import api from "../../axiosinstance";
const CartItems = ({user}) => {
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
						<div key={item.productId._id} className="cart-item">
							<img
								src={item.productId.image}
								alt={item.productId.title}
								className="cart-item-image"
							/>
							<div className="cart-item-details">
								<h3>{item.productId.title}</h3>
								<p>Price: ${item.productId.price}</p>
								<p>Quantity: {item.quantity}</p>
								<p>Total Price: ${item.productId.price * item.quantity}</p>
							</div>
							<div className="cart-page-actions">
								<button type="button">+</button>
								<button type="button">-</button>
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
