import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import Account from "../pages/Account/Account";
import Landing from "../pages/LadingPage/Landing";
import Shop from "../pages/Shop/Shop";
import Cart from '../pages/Cart/Cart';
import Auth from "../pages/Auth/Auth";
import Checkout from '../pages/Checkout/Checkout';

const AppRouter = ({ userObj, isLoggedIn }) => {	
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/shop" element={<Shop isLoggedIn={isLoggedIn} />} />
				<Route path="/check-out" element={<Checkout />} />
				<Route 
				path="/cart" 
				element={isLoggedIn ? <Cart /> : <Auth />} 
				/>
				<Route 
				path="/account"
				element={isLoggedIn ? <Account userObj={userObj} /> : <Auth />}
				/>
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</BrowserRouter>
	);
}
 
export default AppRouter;