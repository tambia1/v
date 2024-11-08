import * as S from "./Progress.styles";

export type Props = {
	className?: string;
	ariaLabel?: string;
	percent: number;
};

export const Progress = ({ className, ariaLabel, percent = 0 }: Props) => {
	const width = Math.round(Math.min(100, Math.max(0, percent)));

	return (
		<S.Progress className={className} aria-label={ariaLabel} data-progress={width}>
			<S.ProgressContent>
				<S.ProgressValue $width={width} />
			</S.ProgressContent>
		</S.Progress>
	);
};
