import React, {useState,useEffect} from 'react';
import './Splash.css';
import api from '../../axiosinstance';
import OrdersList from '../../components/OrdersList/OrdersList';
import UserList from '../../components/UserList/UserList';
import AdminProductList from '../../components/AdminProductList/AdminProductList';
const Splash = ({user}) => {
  const [usersCount,setUsersCount]= useState(0);
  const [productsCount,setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const getUsers = async ()=>{
    try {
    const response = await api.get("http://localhost:3000/api/user/users-list");
    const numberOfUsers =response.data.user_count;
    console.log(numberOfUsers);
    setUsersCount(numberOfUsers);
    } catch (error) {
			console.log("Error Occured:", error);
    }
  }
    const getProduct = async ()=>{
    try {
    const response = await api.get("http://localhost:3000/api/products/");
    const numberOfProducts =response.data.count;
    console.log(numberOfProducts);
    setProductsCount(numberOfProducts);
    } catch (error) {
			console.log("Error Occured:", error);
    }
  }
      const getOrders = async ()=>{
    try {
    const response = await api.get("http://localhost:3000/api/order/");
    const numberOfOrders =response.data.count;
    console.log(numberOfOrders);
    setOrdersCount(numberOfOrders);
    } catch (error) {
			console.log("Error Occured:", error);
    }
  }
  useEffect(() => {
    getUsers();
    getProduct();
    getOrders();
  }, [user])
  
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
      </div>
    </>
  )
}

export default Splash