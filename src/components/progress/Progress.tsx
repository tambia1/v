import * as S from "./Progress.styles";

interface Props {
	progress: number;
}

export const Progress = ({ progress = 0 }: Props) => {
	const width = Math.min(100, Math.max(0, progress));

	return (
		<S.Progress>
			<S.ProgressValue $width={width} />
		</S.Progress>
	);
};
