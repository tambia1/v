import { render } from "@testing-library/react";
import { Memory } from "./Memory";

test("render Memory with memories", () => {
	const component = render(<Memory memories={[100, 200, 300, 400, 500]} selectedMemorySize={100} isEnabled={true} onClick={() => {}} />);

	expect(component).toBeDefined();
});

test("render Memory with no memories", () => {
	const component = render(<Memory memories={[]} selectedMemorySize={0} isEnabled={true} onClick={() => {}} />);

	expect(component).toBeDefined();
});
