import * as S from "./Settings.styles";
import { Pager } from "@src/components/pager/Pager";
import { usePager } from "@src/components/pager/component/hooks/UsePager";
import { Button } from "@src/components/button/Button";

export const Settings = () => {
	const pager = usePager();

	const handleOnClickNextA = () => {
		pager.push(
			"B",
			<S.Container>
				<div>B</div>
				<Button onClick={handleOnClickNextB}>Next</Button>
				<Button onClick={handleOnClickBackB}>Back</Button>
			</S.Container>
		);
	};

	const handleOnClickNextB = () => {
		pager.push(
			"C",
			<S.Container>
				<div>C</div>
				<Button onClick={handleOnClickBackC}>Back</Button>
			</S.Container>
		);
	};

	const handleOnClickBackB = () => {
		pager.pop();
	};

	const handleOnClickBackC = () => {
		pager.pop();
	};
	return (
		<S.Container>
			<div>Settings</div>
			<Button onClick={handleOnClickNextA}>Next</Button>
		</S.Container>
	);
};
