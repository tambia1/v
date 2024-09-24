import * as S from "./Progress.styles";

export interface Props {
	className?: string | undefined;
	percent: number;
}

export const Progress = ({ className, percent = 0 }: Props) => {
	const width = Math.min(100, Math.max(0, percent));

	return (
		<S.Progress className={className}>
			<S.ProgressValue $width={width} />
		</S.Progress>
	);
};
