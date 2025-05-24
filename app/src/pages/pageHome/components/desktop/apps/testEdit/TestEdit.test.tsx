import { ThemeProvider } from "@src/theme/ThemeProvider";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestEdit } from "./TestEdit";

// Get screen from userEvent setup
const setup = () => {
	const utils = render(
		<ThemeProvider>
			<TestEdit />
		</ThemeProvider>,
	);
	return {
		user: userEvent.setup(),
		...utils,
	};
};

describe("TestEdit", () => {
	it("Should test text variants", () => {
		const { getAllByText } = setup();

		const textTest = getAllByText("Test");
		expect(textTest.length).toBe(4);
	});

	it("Should test switch", async () => {
		const { getByTestId, user } = setup();

		const switchElement = getByTestId("switch-test");
		expect(switchElement).toBeDefined();

		expect(switchElement.getAttribute("aria-checked")).toBe("false");
		await user.click(switchElement);
		expect(switchElement.getAttribute("aria-checked")).toBe("true");
		await user.click(switchElement);
		expect(switchElement.getAttribute("aria-checked")).toBe("false");
	});

	it("Should test check", async () => {
		const { getByTestId, user } = setup();

		const checkElement = getByTestId("check-test");
		expect(checkElement).toBeDefined();

		expect(checkElement.getAttribute("aria-checked")).toBe("true");
		await user.click(checkElement);
		expect(checkElement.getAttribute("aria-checked")).toBe("false");
		await user.click(checkElement);
		expect(checkElement.getAttribute("aria-checked")).toBe("true");
	});

	it("Should test stepper", () => {
		// Test is currently commented out
		setup();

		// const inputElement = screen.getByDisplayValue("0");
		// const minusButton = screen.getBySelector('[data-name="iconMinus"]');
		// const plusButton = screen.getBySelector('[data-name="iconMinus"]');

		// plusButton.click();
		// expect(inputElement).toHaveValue("1");

		// minusButton.click();
		// expect(inputElement).toHaveValue("0");
	});
});
