import { useNavigate } from "react-router-dom";
import ShopLogic from "./ShopLogic";
import useFetchUser from "../../useFetchUser";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./ShopStyle.css";

const Shop = () => {
	const {
		filter,
		products,
		addToCart,
		onClickFilter
	} = ShopLogic();

	const { isLoggedIn } = useFetchUser();
	const navigate = useNavigate();

	return (
		<>
			<Nav dark={true} />
			<main>
				<section className="shop-heading">
					<div className="container">
						<div className="split">
							<h2>Coffee</h2>
							<div className="filter-container">
								<button className="filter-btn">{filter}</button>
								<ul className="options">
									<button onClick={onClickFilter} className="option" name="blends">Blends</button>
									<button onClick={onClickFilter} className="option" name="whole-beans">Whole Beans</button>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="container">
						<div className="grid-items">
							{products && products.map(product => (
							<div className="grid-item add-container" key={product.name}>
								<div 
								onClick={() => isLoggedIn ? addToCart(product) : navigate("/auth")} 
								className="add-btn scale-on-hover"
								>
								ADD TO CART
								</div>
								<div className="item-img">
									<img src={product.image} alt="product" />
								</div>
								<div className="item-description">
									<div>
										<h4>{product.name}</h4>
										<p className="clr-gray">{product.class}</p>
									</div>
									<p>${product.price / 100}</p>
								</div>
							</div>
							))}
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
		// TODO: IF NOT LOGGED IN REDIRECT TO LOGIN PAGE BEFORE ADDING TO CART
	);
}
 
export default Shop;