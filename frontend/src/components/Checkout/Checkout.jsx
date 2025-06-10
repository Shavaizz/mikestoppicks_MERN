import React from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import api from "../../axiosinstance";
const Checkout = ({ user, totalPrice, totalQuantity, clearCart }) => {
	const navigate = useNavigate();
	const orderPlacer = () => {
		api.post("/api/order/create", {
			user: user.user?.id,
		});
		navigate("/");
	};

	return (
		<>
			<div className="checkout-wrapper">
				<h2 id="checkout-heading">Checkout</h2>
				<div className="checkout-details-wrapper">
					<div className="checkout-details">
						<h3 id="total-item-counter-checkout">
							Total Item Count: {totalQuantity}
						</h3>
						<h3>Total Order Price: ${totalPrice}</h3>
					</div>
					<div className="checkout-actions">
						<button type="button" onClick={orderPlacer}>
							Place Order
						</button>
						<button type="button" onClick={clearCart}>
							Clear Cart
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Checkout;
