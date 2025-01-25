import React, {useState} from 'react'
import axios from 'axios'
const NewUserSignUp = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userisadmin, setUserIsAdmin] = useState(false)
  const [usernick, setUserNick] = useState("")
  const[completionMessage, setCompletionMessage] = useState("")
  const makeNewUser = async (e) =>{
    e.preventDefault();
    const request = await axios.post('http://localhost:3000/api/user/register',{
      username:username,
      email:email,
      password: password,
      userisadmin:userisadmin,
      usernick:usernick
    });
    const response = request.status
    console.log(response)
    setCompletionMessage(`User Created Successfully, UserName:${username}, Password:${password}`)
    setUsername("")
    setEmail("")
    setPassword("")
    setUserNick("")
    setCompletionMessage("User Created Successfully")
  }
  return (
    <div className="user-creation-form-wrapper">
      <h2 id="user-creation-form-h2">Create User</h2>
        <form className='user-creation-form'>
            <label htmlFor="user-signup-username">Username: </label>
            <input name ="username-feild" type="text" id="user-signup-username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
            <label htmlFor="user-signup-username">Email: </label>
            <input name ="email-feild" type="text" id="user-signup-email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
            <label htmlFor="user-signup-username">User Nickname: </label>
            <input name ="usernick-feild" type="text" id="user-signup-nickname" value={usernick} onChange={(e)=>{setUserNick(e.target.value)}}/>
            <label htmlFor="user-signup-password">Password: </label>
            <input name ="usernick-feild" type='password' id="user-signup-password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
            <button type='submit' id='user-signup-submit-button' onClick={(e)=>{makeNewUser(e)}}>Submit</button>
        </form>
        <p>{completionMessage}</p>
    </div>
  )
}

export default NewUserSignUp