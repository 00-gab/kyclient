import { useState, useEffect } from 'react';
import { collection, getDocs, query, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';

const CartLogic = () => {
	const [cartItems, setCartItems] = useState([]);
	const [error, setError] = useState("");
	const [sum, setSum] = useState(null);
	const [init, setInit] = useState(false);

	useEffect(() => {
		getCartItems();
	}, [])

	useEffect(() => {
		if (init) {
			cartTotal(cartItems);
		}
	}, [init])

	const getCartItems = async () => {
		setCartItems([]);
		const cartItemRef = collection(db, "cart");
		const q = query(cartItemRef);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			setCartItems(prev => ([...prev, {...doc.data(), id: doc.id}]));
		});
		setInit(true);
	}

	const cartTotal = (items) => {
		setSum(null);
		let result = 0;
		items.forEach(item => result += (item.price * item.quantity));
		setSum(result)
	}

	const onBlur = async (event) => {
		let { 
			target: { value }, 
			target: { 
				dataset: { cartIndex } 
			} 
		} = event;
		
		if (parseInt(value) <= 0 || isNaN(parseInt(value))) {
			setError("quantity should be a number and must be greater than zero")
			return;
		} else {
			setError("");
			const updatedValue = [...cartItems];
			const itemRef = doc(db, "cart", updatedValue[cartIndex].id);
			await updateDoc(itemRef, { quantity: updatedValue[cartIndex].quantity })
			cartTotal(updatedValue)
		}
	}

	const onChange = (event) => {
		let { 
			target: { value }, 
			target: { 
				dataset: { cartIndex } 
			} 
		} = event;
		const updatedValue = [...cartItems];
		updatedValue[cartIndex].quantity = parseInt(value);
		setCartItems(updatedValue);
	}

	const removeCartItem = async (event) => {
		let { target: { dataset: { cartId } } } = event;
		const itemRef = doc(db, "cart", cartId)
		await deleteDoc(itemRef);

		getCartItems();
	}

	return {
		cartItems,
		error,
		sum,
		removeCartItem,
		onChange,
		onBlur,
	}
	// TODO: IMPROVE UPDATE LOGIC, useLocation for passing sum
}
 
export default CartLogic;