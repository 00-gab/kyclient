import { useNavigate } from "react-router-dom";
import CartLogic from "./CartLogic";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./CartStyle.css"

const Cart = () => {
	const {
		cartItems,
		error,
		sum,
		removeCartItem,
		onChange,
		onBlur,
	} = CartLogic();

	const navigate = useNavigate();
	
	return (
		<>
			<Nav dark={true} />
				<main className="spacer">
					<div className="container">
						<h1 className="text-center gutter-bottom">Shopping Cart</h1>
					</div>
					{error && <p className="text-center clr-warning">{error}</p>}
					<div className="container cart-container ">
						<div className="cart-item-container bg-gray">
							<div className="cart-items">
								{cartItems.map((item, index) => (
									<div className="cart-item" key={item.name}>
										<div className="cart-item-description">
											<img src={item.image} alt="cart item img" height="100px" width="auto" />
											<div>
												<p className="cart-item-name">{item.name}</p>
												<p className="cart-item-type">{item.class}</p>
											</div>
										</div>
										<div className="cart-item-total">
											<p>${item.price / 100}</p>
											<input 
											className="input-quantity" 
											type="number" 
											onChange={onChange}
											onBlur={onBlur}
											value={item.quantity}
											data-cart-index={index}
											/>
										</div>
										<button 
										className="remove-cart-item-btn"
										onClick={removeCartItem}
										data-cart-id={item.id}
										>
										x
										</button>
									</div>
								))}
							</div>
						</div>
						<div className="check-out-container bg-gray">
							<h4 className="text-center summary">Cart Summary</h4>
							<div className="cart-total-container">
								<div className="sub-total flex-space">
									<h4>Subtotal</h4>
									{sum ? <p>${sum / 100}</p> : <p>$0.00</p>}
								</div>
								<div className="total flex-space">
									<h4>Total</h4>
									{sum ? <p>${sum / 100}</p> : <p>$0.00</p>}
								</div>
							<button 
							className="checkout-btn accent"
							onClick={() => navigate("/check-out", { state: { sum, cartItems } })}
							disabled={error || cartItems.length === 0}
							>
							proceed to checkout
							</button>
							</div>
						</div>
					</div>
				</main>
			<Footer />
		</>
	);
}
 
export default Cart;