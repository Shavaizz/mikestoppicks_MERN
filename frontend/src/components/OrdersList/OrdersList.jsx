import React, { useEffect, useState } from "react";
import api from "../../axiosinstance";
import './OrdersList.css'
const OrdersList = ({ user }) => {
	const [orders, setOrders] = useState([]);
	const [orderCount, setOrderCount] = useState(0);

    const orderFetcher = async () => {
        try {
            const response = await api.get(`/api/order/`);
            if (!response) {
                console.log("No response from server");
            }
            setOrders(response.data.orders);
            setOrderCount(response.data.count);
        } catch (error) {
            console.log("Error Occured: ", error);
        }
    };
	useEffect(() => {
		orderFetcher();
	}, [user.id]);
	return (
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
							<strong>UserID: </strong> {order.user},
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
	);
};

export default OrdersList;
