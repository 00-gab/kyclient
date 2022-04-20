import { useEffect, useState } from "react";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import useFetchUser from "../../useFetchUser";

const AccountLogic = () => {
	const [addressObject, setAddressObject] = useState({});
	const [isNew, setIsNew] = useState(false);
	const { userObj } = useFetchUser();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (userObj) {
			getAddress();
		}
	},[userObj])

	
	const getAddress = async () => {
		const addressRef = doc(db, "address", userObj.id);
		const docSnap = await getDoc(addressRef);
		
		if (docSnap.exists()) {
			setAddressObject(docSnap.data());
		} else {
			setIsNew(true)
		}
	}
	
	const onChange = (event) => {
		const { target:{ name, value } } = event;
		setAddressObject(prev => ({...prev, [name]: value}))
	}

	const onClickSave = async () => {
		const addressRef = doc(db, "address", userObj.id);
		const fromCheckout = location.state.fromCheckout || false;

		if (fromCheckout)  {
			console.log(fromCheckout)
			updateDoc(addressRef, addressObject)
			navigate(-1);
			return;
		}

		if (isNew) {
			await setDoc(addressRef, addressObject)
		} else {	
			updateDoc(addressRef, addressObject)
			getAddress();	
		}
	}	

	return {
		addressObject,
		onChange,
		onClickSave,
	}
}
 
export default AccountLogic;