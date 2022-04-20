import { auth } from "../../firebase";
import "./FooterStyle.css"
import AuthLogic from "../../pages/Auth/AuthLogic";

const Footer = () => {
	const { logout } = AuthLogic();

	return (
		<footer className="dark-bg">
			<div className="container">
				<div className="social-links spacing">
					<p>Follow us on</p>
					<ul>
						<li className="scale-on-hover"><a href="#"><img className="social-link" src="assets/icons/icon-fb.svg" alt="fb icon" /></a></li>
						<li className="scale-on-hover"><a href="#"><img className="social-link" src="assets/icons/icon-ig.svg" alt="ig icon" /></a></li>
						<li className="scale-on-hover"><a href="#"><img className="social-link" src="assets/icons/icon-twt.svg" alt="twitter icon" /></a></li>
					</ul>
					<ul>
						<li className="scale-on-hover"><a href="#">FAQ</a></li>
						<li className="scale-on-hover"><a href="#">About</a></li>
						<li className="scale-on-hover"><a href="#">Contact</a></li>
						{auth.currentUser && <li className="scale-on-hover"><button onClick={logout} className="logout-btn">Logout</button></li>}
					</ul>
				</div>
			</div>
		</footer>
	);
}
 
export default Footer;