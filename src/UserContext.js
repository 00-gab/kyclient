import React, { useState, useEffect, createContext  } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from './firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userObj, setUserObj] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [init, setInit] = useState(false);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, user => {
			if (user) {
				getUser(user);
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
		setInit(true);
		return unsub;
	}, [])

	const getUser = async (user) => {
		const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);
		if (docSnap) {
			setUserObj({ ...docSnap.data(), id: docSnap.id });
		}
	}

	return (
		<UserContext.Provider value={[userObj, isLoggedIn, init]}>
			{children}
		</UserContext.Provider>
	)
}