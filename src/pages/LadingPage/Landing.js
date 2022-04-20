import { Link } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./LandingStyle.css";

const Landing = () => {
	return (
		<>
			<Nav dark={false} />
			<main>
				<section className="hero">
					<div className="container">
						<div className="hero-content spacing">
							<h1 className="heading">brewing made easy</h1>
							<Link to="/shop" className="btn-link scale-on-hover">shop now</Link>
						</div>
					</div>
				</section>
				<section>
					<div className="container">
						<div className="featured spacing">
							<h2 className="heading">coffee for you</h2>
							<p>discover our fresh and unique taste of coffee</p>
							<div className="featured-flex">
								<div className="featured-item item-flex scale-on-hover">
									<div>
										<img src="../../assets/images/product-mockup.png" alt="product" className="product" />
									</div>
									<div className="item-desc">
										<h4>Espresso</h4>
										<p>Blends</p>
										<p>$18.50</p>
									</div>
								</div>
								<div className="featured-item item-flex scale-on-hover">
									<div>
										<img src="../../assets/images/product-mockup.png" alt="product" className="product" />
									</div>
									<div className="item-desc">
										<h4>Arabica</h4>
										<p>Medium Roast</p>
										<p>$50.50</p>
									</div>
								</div>
								<div className="featured-item item-flex scale-on-hover">
									<div>
										<img src="../../assets/images/product-mockup.png" alt="product" className="product" />
									</div>
									<div className="item-desc">
										<h4>Cappucino</h4>
										<p>Blends</p>
										<p>$21.50</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="container">
						<div className="testimonial-container spacing">
							<div className="testimonial">
								<div className="paragraph">
									<img src="assets/images/icon-quotes.svg" alt="" height="40px" width="auto" />
									<p>Best tasting coffee I've ever had to start up my day!</p>
									<h4>- Seon Joyeon</h4>
								</div>
							</div>
							<div className="sample">
								<img src="assets/images/testimonial.jpg" alt="coffee beans" className="testimonial-img"/>
							</div>
						</div>
					</div>
				</section>
				<section className="accent">
					<div className="container">
						<div className="discount spacing">
							<h2>GET YOUR 10% DISCOUNT ON YOUR FIRST ORDER</h2>
							<div className="form-styled">
								<form className="landing-form">
									<input className="discount-input" type="email" placeholder="Email Address" />
									<button className="submit-btn" type="submit">Submit</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
 
export default Landing;