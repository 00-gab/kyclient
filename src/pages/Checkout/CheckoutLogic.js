import { useState, useEffect } from 'react';
import { getDoc, doc, } from "firebase/firestore";
import { db } from '../../firebase';
import useFetchUser from '../../useFetchUser';

const CheckoutLogic = () => {
	const { userObj } = useFetchUser();
	const [address, setAddress] = useState({});

	useEffect(() => {
		if (userObj) {
			getAddress(userObj.id);
		}

	}, [userObj])

	const getAddress = async (userId) => {
		const addressRef = doc(db, "address", userId);
		const docSnap = await getDoc(addressRef);
		
		if (docSnap.exists()) {
			setAddress({...docSnap.data(), id: docSnap.id});
		}
	}

	const onChange = (event) => {
		const { target: { name, value } } = event;
		const updatedValue = {...address};
		updatedValue[name] = value;
		setAddress(updatedValue);
	}

	return {
		address,
		onChange,
	}
}
 
export default CheckoutLogic;