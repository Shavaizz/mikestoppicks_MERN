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
  
	const getUsers = async () => {
		try {
			const response = await api.get(
				"http://localhost:3000/api/user/users-list"
			);
			const numberOfUsers = response.data.user_count;
			console.log(numberOfUsers);
			setUsersCount(numberOfUsers);
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
	const getProduct = async () => {
		try {
			const response = await api.get("http://localhost:3000/api/products/");
			const numberOfProducts = response.data.count;
			console.log(numberOfProducts);
			setProductsCount(numberOfProducts);
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
	const getOrders = async () => {
		try {
			const response = await api.get("http://localhost:3000/api/order/");
			const numberOfOrders = response.data.count;
			console.log(numberOfOrders);
			setOrdersCount(numberOfOrders);
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
  const fetchProducts = async () => {
      const result = await api.get("http://localhost:3000/api/products/");
      console.log(`Result: ${result}`);
      setProducts(result.data.data);
      console.log(`Result Data: ${result.data.data}`)
    };
    useEffect(() => {
      fetchProducts();
    }, []);
	useEffect(() => {
		getUsers();
		getProduct();
		getOrders();
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
					<UserList />
				</div>
				<div id="product-list-wrapper">
					<div className="Product-list-del-panel">
						{products.map((product) => (
							<div key={product._id} className="Product-item-for-del">
								<img
									src={product.image}
									alt={product.title}
									className="Product-img"
								/>
								<div className="Product-details">
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
					<div className="fetch-button-admin-panel">
						<button type="button" onClick={fetchProducts}>
							Fetch Products
						</button>
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
