import React from "react";
import "./Button.css";

type Props = {
	onClick?: () => void;
	children: React.ReactNode;
};

export const Button = (props: Props) => {
	return (
		<>
			<div className="btn" onClick={props.onClick}>
				{props.children}
			</div>
		</>
	);
};
