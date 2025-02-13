import React,{useState} from 'react'
const ShoppingCart = ({user}) => {
  const [username, setUsername] = useState("")
  setUsername(user.usernick)
    return (
    <>
      <div className="admin-cart-overview-wrapper">
        
      </div>
    </>
)
}

export default ShoppingCart