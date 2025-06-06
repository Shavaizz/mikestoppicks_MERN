import React, { useEffect, useState } from "react";
import api from "../../axiosinstance";
import "./OrderPanel.css";
import OrdersList from "../../components/OrdersList/OrdersList";
import UserList from "../../components/UserList/UserList";
const OrderPanel = ({ user }) => {
	const [orders, setOrders] = useState([]);
	const [orderCount, setOrderCount] = useState(0);
	const [productId, setProductId] = useState(null);
	const [orderStatus, setOrderStatus] = useState("");
	const [userMap, setUserMap] = useState({});
	const userFetcher = async (userId) => {
		try {
			const response = await api.get(
				`http://localhost:3000/api/user/user/${userId}`
			);
			setUserMap((prev) => ({
				...prev,
				[userId]: response.data.user,
			}));
		} catch (error) {
			console.error("Error fetching user:", error);
		}
	};
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
	useEffect(() => {
		orderFetcher();
	}, [user.id]);
	useEffect(() => {
	if (Array.isArray(orders)) {
		orders.forEach((order) => {
			if (!userMap[order.userId]) {
				userFetcher(order.userId);
			}
		});
	}
	}, [orders]);
	const stateChanger = async () => {
		try {
		const responsestate = api.put(
				`http://localhost:3000/api/order/update/${productId}`,
				{
					status: orderStatus,
				}
			);
		await orderFetcher();
		} catch (error) {
			console.log("Error Occured: ", error);
		}

	};
	return (
		<>
			<div className="order-wrapper">
				<OrdersList user={user}/>
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
