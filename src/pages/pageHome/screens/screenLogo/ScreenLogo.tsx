import "./ScreenLogo.css";

export interface Props {
	isActive: boolean;
	onClickButtonLogin: () => void;
	onClickButtonSignIn: () => void;
}

export default (props: Props) => {
	return (
		<>
			<div className="screen-logo" data-is-active={props.isActive}>
				<div className="screen-logo-box box">
					<div className="screen-logo-box-logo">
						<div className="screen-logo-icon icon"></div>
						<h3 className="screen-logo-text title">redis</h3>
						<div className="btn margin-left-1" onClick={props.onClickButtonLogin}>
							Login
						</div>
						<div className="btn margin-left-1" onClick={props.onClickButtonSignIn}>
							Sign in
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
