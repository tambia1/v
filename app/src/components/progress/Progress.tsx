import * as S from "./Progress.styles";

const sizes = {
	xs: "5rem",
	s: "10rem",
	m: "15rem",
	l: "20rem",
	xl: "28rem",
} as const;

export type ISize = keyof typeof sizes;

export type Props = {
	className?: string;
	ariaLabel?: string;
	size?: ISize;
	percent: number;
};

export const Progress = ({ className, ariaLabel, percent = 0, size = "m" }: Props) => {
	const width = Math.round(Math.min(100, Math.max(0, percent)));

	return (
		<S.Progress className={className} aria-label={ariaLabel} data-progress={width} $width={sizes[size]}>
			<S.ProgressContent>
				<S.ProgressValue $width={width} />
			</S.ProgressContent>
		</S.Progress>
	);
};
