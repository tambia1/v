import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import * as S from "../TestEdit.styles";

const styles = stylex.create({
	base: {
		display: "flex",
		width: "fit-content",
		color: "#ff0000",
		background: {
			default: "#000000",
		},
	},
	description: {
		color: {
			default: "#000000",
		},
		backgroundColor: {
			default: "#ff00ff66",
		},
	},
	toggle: {
		color: "#000000",
		backgroundColor: "#ffff00",
	},
	toggled: {
		color: "#ffff00",
		backgroundColor: "#000000",
	},
	transition: {
		transition: "all 0.3s ease 0.0s",
	},
});

export const ExampleStyleX = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<S.Col>
			<Text>StyleX</Text>

			<S.Row>
				<div {...stylex.props(styles.base)}>Test</div>
				<div {...stylex.props(styles.base, styles.description)}>Test</div>
			</S.Row>

			<S.Col>
				<div {...stylex.props(toggle ? styles.toggle : styles.toggled, styles.transition)}>Toggle style</div>
				<Button onClick={() => setToggle(!toggle)}>Toggle stytle</Button>
			</S.Col>
		</S.Col>
	);
};
