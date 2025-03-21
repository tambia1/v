import { ThemeProvider } from "@src/theme/Theme";
import { fireEvent, render, screen } from "@testing-library/react";
import { TestEdit } from "./TestEdit";

const renderComponent = () => {
	render(
		<ThemeProvider>
			<TestEdit />
		</ThemeProvider>,
	);
};

describe("TestEdit", () => {
	it("Should test text variants", () => {
		renderComponent();

		const textTest = screen.getAllByText("Test");
		expect(textTest.length).toBe(4);
	});

	it("Should test switch", () => {
		renderComponent();

		const switchElement = screen.getByTestId("switch-test");
		expect(switchElement).toBeDefined();

		expect(switchElement).toHaveAttribute("aria-checked", "false");
		fireEvent.click(switchElement);
		expect(switchElement).toHaveAttribute("aria-checked", "true");
		fireEvent.click(switchElement);
		expect(switchElement).toHaveAttribute("aria-checked", "false");
	});

	it("Should test check", () => {
		renderComponent();

		const checkElement = screen.getByTestId("check-test");
		expect(checkElement).toBeDefined();

		expect(checkElement).toHaveAttribute("aria-checked", "true");
		fireEvent.click(checkElement);
		expect(checkElement).toHaveAttribute("aria-checked", "false");
		fireEvent.click(checkElement);
		expect(checkElement).toHaveAttribute("aria-checked", "true");
	});

	it("Should test stepper", () => {
		renderComponent();

		// const inputElement = screen.getByDisplayValue("0");
		// const minusButton = screen.getBySelector('[data-name="iconMinus"]');
		// const plusButton = screen.getBySelector('[data-name="iconMinus"]');

		// plusButton.click();
		// expect(inputElement).toHaveValue("1");

		// minusButton.click();
		// expect(inputElement).toHaveValue("0");
	});
});
