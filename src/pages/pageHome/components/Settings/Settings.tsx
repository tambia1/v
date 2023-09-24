import * as S from "./Settings.styles";
import { usePager } from "@src/components/pager/component/hooks/UsePager";
import { Button } from "@src/components/button/Button";
import { List } from "@src/components/list/List";

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
			<List>
				<List.Cell>A</List.Cell>
				<List.Cell>B</List.Cell>
				<List.Cell>C</List.Cell>
			</List>
		</S.Container>
	);
};
