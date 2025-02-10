import React,{useState, useEffect} from 'react'
import api from '../../axiosinstance';
const Cart = (user) => {
  const [userId, setUserId] = useState(null);
  const [cartObjects, setCartObjects] = useState([]);
  useEffect(() => {
    const fetchCartObjects = async ()=>{
      try {
        const response = await api.get(`http://localhost:3000/api/cart/${user.user?.id}`);
        setCartObjects(response.data.items);
      } catch (error) {
        console.error('Error fetching cart objects:', error);
      }
    }
    fetchCartObjects();
  }, []);
  

  return (
    <>
      <div className="cart-wrapper">
        Welcome To Your Cart, {user?.username}
      </div>
      <div className="cart-body">
        {cartObjects.length > 0 ? (
          cartObjects.map((item) => (
            <div key={item.productId._id} className="cart-item">
              <img src={item.productId.image} alt={item.productId.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.productId.title}</h3>
                <p>Price: ${item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </>
  )
}

export default Cart