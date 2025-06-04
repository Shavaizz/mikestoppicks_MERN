import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axiosinstance";
import "./OrderPanel.css";
import UserList from "../../components/UserList/UserList";
const OrderPanel = ({ user }) => {
	const navigate = useNavigate(); 
	const [orders, setOrders] = useState([]);
	const [orderCount, setOrderCount] = useState(0);
	const [productId, setProductId] = useState(null);
	const [orderStatus, setOrderStatus] = useState("");

	useEffect(() => {
		const orderFetcher = async () => {
			try {
				const response = await api.get(`http://localhost:3000/api/order/`);
				if (!response) {
					console.log("No response from server");
				}
				setOrders(response.data.orders);
				console.log(orders);
				setOrderCount(response.data.count);
			} catch (error) {
				console.log("Error Occured: ", error);
			}
		};
		orderFetcher();
	}, [user.id]);
	const stateChanger = () => {
		const responsestate = api.put(
			`http://localhost:3000/api/order/update${productId}`,
			{
				status: orderStatus,
			}
		);
	};
	return (
		<>
			<div className="order-wrapper">
				<div className="order-item-wrapper">
					<h2>View All Orders</h2>
					<p>
						<strong>Total Order Count : </strong>
						{orderCount}
					</p>
        	<div id="order-group-wrapper">
					{Array.isArray(orders) &&
						orders.map((order) => (
							<div key={order._id} className="order-card-admin">
								<h2>Order ID: {order._id}</h2>
								<p>
									<strong>Status: </strong> {order.status}
								</p>
								<p>
									<strong>Total Price: </strong> ${order.totalAmount}
								</p>
								<p>
									<strong>UserID: </strong> {order.userId}
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
							</div>
						))}
          </div>
				</div>
				<div className="order-actions">
					<form className="order-update-form">
						<label>
							Enter Order ID To Updates Status:
							<input
								type="text"
								value={productId}
								onChange={(e) => {
									setProductId(e.target.value);
								}}
							/>
						</label>
						<label>
							Enter New Status:
							<input
								type="text"
								value={orderStatus}
								onChange={(e) => {
									setOrderStatus(e.target.value);
								}}
							/>
						</label>
						<button
							id="submit-button-order-panel"
							type="button"
							onClick={stateChanger}
						>
							{" "}
							Submit Change{" "}
						</button>
						<p>
							<strong>Note:</strong> You can Only Input The Following Statuses:
							'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'
						</p>
					</form>
					<UserList />
				</div>
			</div>
		</>
	);
};

export default OrderPanel;
