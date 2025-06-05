import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import SearchResultPage from "./pages/searchResultPage/SearchResultPage";
import Navbar from "./components/Navbar/Navbar";
import AdminSiderbar from "./components/AdminSidebar/AdminSiderbar";
import UserValidationRoute from "./components/UserValidationRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/LoginPage/Login";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import AdminPanelSignUpPages from "./pages/AdminPanelSignUpPages/AdminPanelSignUpPages";
import Register from "./pages/RegisterPage/RegisterPage";
import OrderPanel from "./pages/OrderPanel/OrderPanel";
import Splash from "./pages/Splash/Splash";
import Cart from "./pages/Cart/Cart";
import UserOrderPanel from "./pages/UserOrderPanel/UserOrderPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
    const [user, setUser] = useState(null);
    
    const handleLogin = (userData) => {
        if (userData?.user && userData?.token) {
            setUser({ ...userData.user, token: userData.token });
            localStorage.setItem("token", userData.token);
            console.log("UserLoggedIn");
        } else {
            console.warn("Invalid login response:", userData);
        }
    };

    return (
        <Router>
            <div className="app-container">
                {user && user.isAdmin && (
                    <AdminSiderbar user={user} setUser={setUser} />
                )}
                
                {(!user || !user.isAdmin) && (
                    <Navbar user={user} setUser={setUser} />
                )}
                <div className={`main-content ${user && user.isAdmin ? 'with-sidebar' : ''}`}>
                    <Routes>
                        {/* User Accessible */}
                        <Route path="/" element={<HomePage user={user} />} />
                        <Route path="/search-results" element={<SearchResultPage />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Logged In User Accessible */}
                        <Route
                            path="/cart"
                            element={
                                <UserValidationRoute user={user}>
                                    <Cart user={user} />
                                </UserValidationRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <UserValidationRoute user={user}>
                                    <UserOrderPanel user={user} />
                                </UserValidationRoute>
                            }
                        />
                        
                        {/* Admin Accessible Routes */}
                        <Route
                            path="/order-panel"
                            element={
                                <ProtectedRoute user={user}>
                                    <OrderPanel user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/product-panel"
                            element={
                                <ProtectedRoute user={user}>
                                    <AdminPanel user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/user-panel"
                            element={
                                <ProtectedRoute user={user}>
                                    <AdminPanelSignUpPages user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/splash"
                            element={
                                <ProtectedRoute user={user}>
                                    <Splash />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;