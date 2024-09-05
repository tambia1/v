import * as S from "./Debug.styles";

const log: string[] = [];

export const logger = (text: string) => {
	log.push(text);
	log.push("");
};

export const Debug = () => {
	return (
		<S.Debug>
			<S.Console>{log.map((value, index) => `${index}: ${value}\n`)}</S.Console>
		</S.Debug>
	);
};
