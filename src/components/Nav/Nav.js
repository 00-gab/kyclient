import { Link } from "react-router-dom";
import "./NavStyle.css";

const Nav = ({ dark }) => {
	return (
		<header className={dark ? "dark-bg" : "light-bg"}>
			<div className="container">
				<nav>
					<div className="shop-name">
						<Link to="/">
							<h2>KAPE</h2>
							<h2>YUQI</h2>
						</Link>
					</div>
					<ul>
						{/* {(isLoggedIn && userObj.admin === true) && (
						<li className="scale-on-hover">
							<Link to="/account">Dashboard</Link>
						</li>
						)} */}
						<li className="scale-on-hover">
							<Link to="/account">Account</Link>
						</li>
						<li className="scale-on-hover">
							<Link to="/shop">Shop</Link>
						</li>
						<li className="scale-on-hover">
							<Link to="/cart">Cart</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
 
export default Nav;