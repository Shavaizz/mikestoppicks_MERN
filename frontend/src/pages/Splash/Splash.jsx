import React, { useState, useEffect } from "react";
import "./Splash.css";
import api from "../../axiosinstance";
import OrdersList from "../../components/OrdersList/OrdersList";
import UserList from "../../components/UserList/UserList";
import AdminProductList from "../../components/AdminProductList/AdminProductList";
const Splash = ({ user }) => {
	const [usersCount, setUsersCount] = useState(0);
	const [productsCount, setProductsCount] = useState(0);
	const [ordersCount, setOrdersCount] = useState(0);
	const [products, setProducts] = useState([]);
	const [usersFetched, setUsersFetched] = useState([]);

	const getUsers = async () => {
		try {
			const response = await api.get(
				"/api/user/users-list"
			);
			const numberOfUsers = response.data.user_count;
			setUsersCount(numberOfUsers);
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
	const getProduct = async () => {
		try {
			const response = await api.get("/api/products/");
			const numberOfProducts = response.data.count;
			setProductsCount(numberOfProducts);
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
	const getOrders = async () => {
		try {
			const response = await api.get("/api/order/");
			const numberOfOrders = response.data.count;
			setOrdersCount(numberOfOrders);
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
	const fetchProducts = async () => {
		const result = await api.get("/api/products/");
		setProducts(result.data.data);
	};
	const fetchUsers = async () => {
		try {
			const response = await api.get(
				"/api/user/users-list"
			);
			setUsersFetched(response.data.users);
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
	useEffect(() => {
		fetchProducts();
		fetchUsers();
		getProduct();
		getOrders();
		getUsers();
	}, [user]);
	return (
		<>
			<div className="splash-wrapper">
				<div id="splash-user-wrapper">
					<h2>Users</h2>
					<p>{usersCount}</p>
				</div>
				<div id="splash-products-wrapper">
					<h2>Products</h2>
					<p>{productsCount}</p>
				</div>
				<div id="splash-orders-wrapper">
					<h2>Orders</h2>
					<p>{ordersCount}</p>
				</div>
			</div>
			<div className="dashboard-wrapper">
				<div id="user-list-wrapper">
					<div className="User-list-del-panel">
						{usersFetched.map((user) => (
							<div key={user._id} className="User-item-for-del">
								<h3>Username: {user.username}</h3>
								<p>Email: {user.email}</p>
								<p>Nickname: {user.usernick}</p>
								<p>Admin: {user.userisadmin ? "Yes" : "No"}</p>
								<p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
								<p>UserId: {user._id}</p>
							</div>
						))}
					</div>{" "}
				</div>
				<div id="product-list-wrapper-splash">
					<div className="Product-list-del-panel-splash">
						{products.map((product) => (
							<div key={product._id} className="Product-item-for-del-splash">
								<img
									src={product.image}
									alt={product.title}
									className="Product-img-splash"
								/>
								<div className="Product-details-splash">
									<h3>{product.title}</h3>
									<p>Price: ${product.price}</p>
									<p>
										Created At: {new Date(product.createdAt).toLocaleString()}
									</p>
									<p>Id: {product._id}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<div id="order-wrapper">
					<OrdersList user={user} />
				</div>
			</div>
		</>
	);
};

export default Splash;
