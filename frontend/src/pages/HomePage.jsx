import React from 'react'
import ProductPage from '../components/productPage/ProductPage'
import SearchBar from '../components/searchBar/SearchBar'
import UserProfile from '../components/UserProfile/UserProfile'

const HomePage = ({user}) => {
  return (
    <>  
        <UserProfile user={user}/>
        <SearchBar/>
        <ProductPage user={user}/>
    </>
  )
}

export default HomePage