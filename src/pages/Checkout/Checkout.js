import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AddressForm from "./AddressForm";
import CheckoutLogic from "./CheckoutLogic";
import CheckoutForm from "./CheckoutForm";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./CheckoutStyles.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
	const [clientSecret, setClientSecret] = useState("");
	const { state: { sum, cartItems } } = useLocation();
	const {
		address,
		onChange,
	} = CheckoutLogic();

	useEffect(() => {
		if (address.id) {
			fetch("/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ amount: sum, items: cartItems, address: address })
			})
			.then(res => res.json())
			.then(data => setClientSecret(data.clientSecret))
		}
	}, [address])

	const appearance = {
		theme: 'stripe',
	};

	const options = {
		clientSecret,
		appearance,
	};

	return (
		<>
			<Nav dark={true} />
			<main>
				<div className="checkout container spacer">
					<AddressForm address={address} onChange={onChange} />
					{clientSecret && (
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm cartItems={cartItems} />
					</Elements>
					)}
				</div>
			</main>
			<Footer />
		</>
	);
}
 
export default Checkout;