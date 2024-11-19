import * as S from "./Progress.styles";

const sizes = {
	s: "5rem",
	m: "12rem",
	l: "25rem",
} as const;

export type ISize = keyof typeof sizes;

export type Props = {
	className?: string;
	ariaLabel?: string;
	size?: ISize;
	percent: number;
};

export const Progress = ({ className, ariaLabel, percent = 0, size = "l" }: Props) => {
	const width = Math.round(Math.min(100, Math.max(0, percent)));

	return (
		<S.Progress className={className} aria-label={ariaLabel} data-progress={width} $width={sizes[size]}>
			<S.ProgressContent>
				<S.ProgressValue $width={width} />
			</S.ProgressContent>
		</S.Progress>
	);
};
