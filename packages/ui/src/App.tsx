import { Button } from "./components/button/Button";

export const App = () => {
	return (
		<>
			<h3>Button</h3>

			<h4>varian=full, enabled</h4>
			<Button varian="full">Test</Button>
			<h4>varian=full, disabled</h4>
			<Button varian="full" disabled>
				Test
			</Button>
			<br />
			<br />
			<h4>varian=stroke, enabled</h4>
			<Button varian="stroke">Test</Button>
			<h4>varian=stroke, disabled</h4>
			<Button varian="stroke" disabled>
				Test
			</Button>
			<br />
			<br />
			<h4>varian=link, enabled</h4>
			<Button varian="link">Test</Button>
			<h4>varian=link, disabled</h4>
			<Button varian="link" disabled>
				Test
			</Button>
		</>
	);
};
