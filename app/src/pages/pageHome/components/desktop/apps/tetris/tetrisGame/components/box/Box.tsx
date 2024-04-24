import React from "react";
import "./Box.css";

const colors = ["box-empty", "box-yellow", "box-green", "box-red", "box-purple", "box-brown", "box-blue", "box-cyan", "box-grey"];

interface Props {
	color: number;
	children: React.ReactNode;
}

export const Box = (props: Props) => {
	return (
		<>
			<div className={`box ${colors[props.color]}`}>{props.children}</div>
		</>
	);
};
