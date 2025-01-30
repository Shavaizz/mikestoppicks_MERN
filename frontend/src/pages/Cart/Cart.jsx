import React,{useState, useEffect} from 'react'
import axios from "axios"
const Cart = ({user}) => {
  const [userId, setUserId] = useState(int);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setUserId(user._id)
    console.log(user.id)
    console.log("UserId:", userId)
  }, [])
  
  const fetchCart =async ()=>{
    const response = await axios.get(`http://localhost:3000/api/cart/${userId}`)
  }
  return (
    <div>Cart,{userId}</div>
  )
}

export default Cart