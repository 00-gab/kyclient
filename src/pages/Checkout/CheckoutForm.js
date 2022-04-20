import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";


const CheckoutForm = ({ cartItems }) => {
	const [message, setMessage] = useState(null);
  	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const stripe = useStripe();
  	const elements = useElements();

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
		switch (paymentIntent.status) {
			case "succeeded":
				setMessage("Payment succeeded!");
				break;
			case "processing":
				setMessage("Your payment is processing.");
				break;
			case "requires_payment_method":
				setMessage("Your payment was not successful, please try again.");
				break;
			default:
				setMessage("Something went wrong.");
				break;
		}
		});

	}, [stripe])

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			redirect: "if_required",
		});

		if (!error) {
			try {
				for (let i = 0; i < cartItems.length; i++) {
					const item = cartItems[i];
					const docRef = doc(db, "cart", item.id);
					await deleteDoc(docRef);
				}
			} catch (error) {
				console.log(error.message);
			}
			navigate("/shop");
			return;
		}

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occured.");
		}

		setIsLoading(false);
	}

	return (
		<>
			<form id="payment-form" className="payment-form" onSubmit={handleSubmit}>
				<h1>Card Details</h1>
				<PaymentElement id="payment-element" />
				<button disabled={isLoading || !stripe || !elements} id="submit" className="pay-btn">
					<span id="button-text">
					{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
					</span>
				</button>
				{message && <div id="payment-message">{message}</div>}
				{/* TODO: CONFIRM/CAPTURE PAYMENT INTENT */}
			</form>
		</>
	);
}

export default CheckoutForm;