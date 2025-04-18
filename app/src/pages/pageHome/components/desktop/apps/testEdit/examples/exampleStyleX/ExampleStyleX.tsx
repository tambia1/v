import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import * as stylex from "@stylexjs/stylex";
import { useState } from "react";
import * as S from "../../TestEdit.styles";
import { Box } from "./ExampleStyleX.stylex";
import { Base } from "./Themes.stylex";

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

const stylesTextShadow = stylex.create({
	base: {
		boxShadow: "1px 1px 5px 0px #ff0000",
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

			<S.Col>
				<Box>Box based on stylex with theme</Box>
			</S.Col>

			<S.Col>
				<Base style={stylesTextShadow.base}>Box based on stylex with theme and custom styles</Base>
			</S.Col>
		</S.Col>
	);
};
