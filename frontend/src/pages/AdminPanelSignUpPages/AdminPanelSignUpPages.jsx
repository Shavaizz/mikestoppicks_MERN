import React from 'react'
import NewAdminSignUp from '../../components/NewAdminSignUp/NewAdminSignUp'
import NewUserSignUp from'../../components/NewUserSignUp/NewUserSignUp'
import UserList from '../../components/UserList/UserList'
const AdminPanelSignUpPages = () => {
  return (
    <>
      <NewAdminSignUp/>
      <NewUserSignUp/>
      <UserList/>
    </>
  )
}

export default AdminPanelSignUpPages