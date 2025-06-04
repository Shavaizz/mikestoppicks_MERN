import React, { useState, useEffect } from "react";
import "./CartItems.css";
const CartItems = ({ user, setTotalPrice, setTotalItemCount, cartObjects }) => {
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
