import "./AuthStyle.css"
import AuthLogic from "./AuthLogic";

const Auth = () => {
	const {
		email,
		password,
		error,
		newAccount,
		onSubmit,
		onChangeInput,
		toggleNewAccount,
	} = AuthLogic();

	return (
		<>
			<div className="auth-main split">
				<div className="left"></div>
				<div className="right">
					<div className="auth-container auth-flex">
						<div className="auth-heading spacer">
							<h1>KAPE</h1>
							<h1>YUQI</h1>
						</div>
						<p className="clr-gray">Welcome to Kape Yuqi</p>
						{error && <span className="error-message">{error}</span>}
						<form onSubmit={onSubmit}>
							<div className="input-group on-focus">
								<input onChange={onChangeInput} className="auth-input" name="email" type="text" placeholder=" " value={email} required />
								<label className="clr-gray">Email</label>
							</div>
							<div className="input-group on-focus">
								<input onChange={onChangeInput} className="auth-input" name="password" type="password" placeholder=" " value={password} required />
								<label className="clr-gray">Password</label>
							</div>
							<button className="auth-btn accent">
								{newAccount ? "Sign up" : "Sign in"}
							</button>
						</form>
						<button onClick={toggleNewAccount} className="auth-switch">
							{newAccount ? "already have an account?" : "don't have an account yet?"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
 
export default Auth;