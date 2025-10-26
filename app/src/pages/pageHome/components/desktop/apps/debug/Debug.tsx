import { Button } from "@src/components/button/Button";
import * as S from "./Debug.styles";

const log: string[] = ["Console"];

export const logger = (text: string) => {
	log.push(text);
};

export const Debug = () => {
	const onClickClear = () => {
		log.length = 1;
	};

	return (
		<S.Debug>
			<Button onClick={onClickClear}>Clear</Button>

			<S.Console>{log.map((value, index) => `${index}: ${value}\n`)}</S.Console>
		</S.Debug>
	);
};
