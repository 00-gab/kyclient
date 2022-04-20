import { useNavigate } from "react-router-dom";

const AddressForm = ({ address, onChange }) => {
	const navigate = useNavigate(); 

	return (
		<>
			{/* make it readOnly, add edit address link on checkout page */}
			<form className="account-form billing-details">
				<h1>Billing Details</h1>
				<div className="form-group">
					<div>
						<label>FIRST NAME</label>
						<input 
						type="text" 
						placeholder="JOHN" 
						readOnly
						value={address.firstName || ""} 
						name="firstName" 
						required 
						/>
					</div>
					<div>
						<label>LAST NAME</label>
						<input 
						type="text" 
						placeholder="DOE" 
						readOnly
						value={address.lastName || ""} 
						name="lastName" 
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
						readOnly
						value={address.line1 || ""} 
						name="line1" 
						required 
						/>			
					</div>
					<div>
						<label>ADDRESS LINE 2</label>
						<input 
						type="text" 
						placeholder="KALABAW COMMUNITIES" 
						readOnly
						value={address.line2 || ""} 
						name="line2" 
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
						readOnly
						value={address.city || ""} 
						name="city" 
						required		
						/>
					</div>
					<div>
						<label>COUNTRY</label>
						<input 
						type="text" 
						placeholder="PHILIPPINES" 
						readOnly
						value={address.country || ""} 
						name="country" 
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
						readOnly
						value={address.postal || ""} 
						name="postal" 
						required									
						/>
					</div>
					<div>
						<label>PHONE NUMBER</label>
						<input 
						type="text" 
						placeholder="09121232342" 
						readOnly
						value={address.phoneNumber || ""} 
						name="phoneNumber" 
						required									
						/>
					</div>
				</div>
				<button onClick={() => navigate("/account", { state: { fromCheckout: true } })}>Edit</button>
			</form>
		</>
	);
}
 
export default AddressForm;