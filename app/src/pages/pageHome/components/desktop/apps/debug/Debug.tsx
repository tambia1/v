import * as S from "./Debug.styles";

export const log: string[] = [];

export const Console = () => {
	return (
		<S.Debug>
			<S.Console>{log.map((value, index) => `${index}: ${value}\n`)}</S.Console>
		</S.Debug>
	);
};
