import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const AuthLogic = () => {
	const [error, setError] = useState("");
	const [newAccount, setNewAccount] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const toggleNewAccount = () => setNewAccount(prev => !prev);

	const onChangeInput = (event) => {
		const { target: { name, value } } = event;
		if (name === "email") setEmail(value);
		if (name === "password") setPassword(value);
	}

	const addUserToDB = async (email, uid) => {
		try {
			const userDoc = doc(db, "users", uid);
			await setDoc(userDoc, { email, uid });
		} catch (error) {
			console.log(error.message);
		}
	}

	const signup = async () => {
		try {
			const created = await createUserWithEmailAndPassword(auth, email, password);
			if (created) addUserToDB(created.user.email, created.user.uid);
		} catch (error) {
			setError(error.message);
		}
	}

	const signin = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/shop");
		} catch (error) {
			setError(error.message);
		}
	}

	const logout = async () => {
		try {
			signOut(auth)
			navigate("/");
		} catch (error) {
			setError(error.message);
		}
	}

	const onSubmit = (event) => {
		event.preventDefault();

		if (email === "") {
			setError("email is required");
			return;
		} else if (password === "") {
			setError("password is required");
			return;
		}

		if (newAccount) {
			signup();
		} else {
			signin();
		}
	}

	return {
		email,
		password,
		error,
		newAccount,
		logout,
		onSubmit,
		onChangeInput,
		toggleNewAccount,
		signin,
		signup,
	}
}
 
export default AuthLogic;