import React,{useState, useEffect} from 'react'
import api from '../../axiosinstance';
const Cart = ({user}) => {
  const [userId, setUserId] = useState(null);
  const [cartObjects, setCartObjects] = useState(null);
  const fetchCartObjects = ()=>{
    setUserId(user?.id);
    const request = api.get(`http://localhost:3000/api/cart/${userId}`)
    const reponse = request;
  }
  return (
    <>
      <div className="cart-wrapper">
        Welcome To Your Cart, {user?.username}
      </div>
      
    </>
  )
}

export default Cart