import React from "react";
import api from "../../axiosinstance";
import { useEffect, useState,  } from "react";
import "./UserOrderPanel.css";
const UserOrderPanel = ({ user }) => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const orderFetcher = async () => {
			try {
				const response = await api.get(
					`http://localhost:3000/api/order/${user.id}`
				);
				if (!response) {
					console.log("No response from server");
				}
				setOrders(response.data);
			} catch (error) {
				console.log("Error Occured: ", error);
			}
		};
		orderFetcher();
	}, [user.id]);
	const orderDeleter = async (orderIdInput) => {
		const response = await api.delete(
			`http://localhost:3000/api/order/delete/${orderIdInput}`
		);
		setOrders([]);
	};
	return (
		<>
		<h2 id="cart-heading">Welcome To Orders Panel</h2>
			<div className="order-wrapper-user">
				{orders.length > 0 ?(
					orders.map((order) => (
					<div key={order._id} className="order-card-user">
						<h2>Order ID: {order._id}</h2>
						<p id="order-status">
							<strong>Status:</strong> {order.status}
						</p>
						<p id="order-total">
							<strong>Total:</strong> ${order.totalAmount}
						</p>
						<p id="order-date">
							<strong>Date:</strong>{" "}
							{new Date(order.createdAt).toLocaleString()}
						</p>
						<h3>Items:</h3>
						<ul>
							{order.items.map((item) => (
								<li key={item._id} className="order-details">
									<strong>{item?.productId?.title}</strong> - Price: $
									{item?.productId?.price}
								</li>
							))}
						</ul>
						<div className="order-action-wrapper">
							<button
								onClick={() => {
									orderDeleter(order._id);
								}}
							>
								Delete Order
							</button>
						</div>
					</div>
				))
				):(
					<p>
						No Orders Yet!
					</p>
				)
			}
			</div>
		</>
	);
};

export default UserOrderPanel;

// router.delete("/delete/:id",protect, async (req, res) => {
