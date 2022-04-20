import { useState, useEffect } from 'react';
import { collection, getDocs, query, addDoc, updateDoc, where, doc } from "firebase/firestore";
import { db } from '../../firebase';
import useFetchUser from '../../useFetchUser';

const ShopLogic = () => {
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState("Filter By");
	const { userObj } = useFetchUser();

	useEffect(() => {
		getProducts();
	}, [])

	useEffect(() => {
		if (filter !== "Filter By") {
			if (filter === "Blends") {
				getBlends();
			} 

			if (filter === "Whole Beans") {
				getBeans();
			}
		}
	}, [filter])

	const onClickFilter = (event) => {
		const { target: { name } } = event;
		if (name === "blends") setFilter("Blends");
		if (name === "whole-beans") setFilter("Whole Beans");
	}

	const getProducts = async () => {
		setProducts([]);
		const productsRef = collection(db, "products");
		const q = query(productsRef)
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => setProducts(prev => ([...prev, {...doc.data(), id: doc.id}])))
	}

	const getBeans = async () => {
		setProducts([]);
		const productsRef = collection(db, "products");
		const q = query(productsRef, where("class", "!=", "Blends"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => setProducts(prev => ([...prev, {...doc.data(), id: doc.id}])))
	}

	const getBlends = async () => {
		setProducts([]);
		const productsRef = collection(db, "products");
		const q = query(productsRef, where("class", "==", "Blends"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => setProducts(prev => ([...prev, {...doc.data(), id: doc.id}])))
	}

	const addToCart = async (product) => {
		try {
			const cartRef = collection(db, "cart");

			// if item already exists in user's cart
			const q = query(cartRef, where("uid", "==", userObj.id), where("productId", "==", product.id));
			const docSnap = await getDocs(q);
			if (!docSnap.empty) {
				const existingItemRef = doc(db, "cart", docSnap.docs[0].id)
				await updateDoc(existingItemRef, { quantity:  docSnap.docs[0].data().quantity + 1 })
				return;
			}

			const payload = {
				name: product.name,
				class: product.class,
				price: product.price,
				quantity: 1,
				productId: product.id,
				uid: userObj.id,
				image: product.image
			}
	
			await addDoc(cartRef, payload)
		} catch (error) {
			console.log(error.message)
		}
	}

	return {
		filter,
		products,
		addToCart,
		onClickFilter,
	}
}
 
export default ShopLogic;