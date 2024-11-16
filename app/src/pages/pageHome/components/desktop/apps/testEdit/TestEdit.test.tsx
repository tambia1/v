import { Theme } from "@src/theme/Theme";
import { fireEvent, render, screen } from "@testing-library/react";
import { TestEdit } from "./TestEdit";

const renderComponent = () => {
	render(
		<Theme>
			<TestEdit />
		</Theme>,
	);
};

describe("TestEdit", () => {
	it("Should check text variants", () => {
		renderComponent();

		const textTest = screen.getAllByText("Test");

		expect(textTest.length).toBe(4);
	});

	it("Should toggle switch state", () => {
		renderComponent();

		// screen.debug(undefined, Number.POSITIVE_INFINITY);

		const switchElement = screen.getByTestId("switch-test");
		expect(switchElement).toBeDefined();
	});
});
