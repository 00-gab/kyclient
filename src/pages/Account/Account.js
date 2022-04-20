import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import AccountLogic from "./AccountLogic";
import "./AccountStyle.css";

const Account = () => {
	const {
		addressObject,
		onChange,
		onClickSave,
	} = AccountLogic();

	return (
		<>
			<Nav dark={true} />
			<main>
				<div className="account-container padding-top-bottom">
					<div className="account-heading">
						<p className="clr-gray">My Account</p>
						<h1>Personal Details</h1>
					</div>
					<form className="account-form">
						<div className="form-group">
							<div>
								<label>FIRST NAME</label>
								<input 
								type="text" 
								placeholder="JOHN" 
								value={addressObject.firstName || ""} 
								name="firstName" 
								onChange={onChange}
								required 
								/>
							</div>
							<div>
								<label>LAST NAME</label>
								<input 
								type="text" 
								placeholder="DOE" 
								value={addressObject.lastName || ""} 
								name="lastName" 
								onChange={onChange}
								required 
								/>
							</div>
						</div>
						<div className="form-group">
							<div>
								<label>ADDRESS LINE 1</label>
								<input
								type="text" 
								placeholder="B21-L10 MANGGA ST" 
								value={addressObject.line1 || ""} 
								name="line1" 
								onChange={onChange}
								required 
								/>			
							</div>
							<div>
								<label>ADDRESS LINE 2</label>
								<input 
								type="text" 
								placeholder="KALABAW COMMUNITIES" 
								value={addressObject.line2 || ""} 
								name="line2" 
								onChange={onChange}
								required 
								/>
							</div>
						</div>
						<div className="form-group">
							<div>
								<label>CITY/PROVINCE</label>
								<input 
								type="text" 
								placeholder="ANGELES CITY" 
								value={addressObject.city || ""} 
								name="city" 
								onChange={onChange}
								required		
								/>
							</div>
							<div>
								<label>COUNTRY</label>
								<input 
								type="text" 
								placeholder="PHILIPPINES" 
								value={addressObject.country || ""} 
								name="country" 
								onChange={onChange}
								required
								/>
							</div>
						</div>
						<div className="form-group">
							<div>
								<label>POSTAL CODE</label>
								<input 
								type="text" 
								placeholder="1992" 
								value={addressObject.postal || ""} 
								name="postal" 
								onChange={onChange}
								required									
								/>
							</div>
							<div>
								<label>PHONE NUMBER</label>
								<input 
								type="text" 
								placeholder="09121232342" 
								value={addressObject.phoneNumber || ""} 
								name="phoneNumber" 
								onChange={onChange}
								required									
								/>
							</div>
						</div>
					</form>
					<button onClick={onClickSave} className="save-btn scale-on-hover">SAVE CHANGES</button>
				</div>
			</main>
			<Footer />
			{/* TODO: LOADING BUTTON */}
		</>
	);
}

export default Account;