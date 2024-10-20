import * as S from "./Progress.styles";

export interface Props {
	className?: string;
	percent: number;
}

export const Progress = ({ className, percent = 0 }: Props) => {
	const width = Math.min(100, Math.max(0, percent));

	return (
		<S.Progress className={className}>
			<S.ProgressContent>
				<S.ProgressValue $width={width} />
			</S.ProgressContent>
		</S.Progress>
	);
};
