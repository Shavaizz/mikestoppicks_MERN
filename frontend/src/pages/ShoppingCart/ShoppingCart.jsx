import React,{useState} from 'react'
const ShoppingCart = ({user}) => {
  const [username, setUsername] = useState("")
  setUsername(user.usernick)
    return (
    <>
        <h2 id='welcome-user-message'>Hello, {username}</h2>
          
    </>
)
}

export default ShoppingCart