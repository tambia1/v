import * as S from "./Progress.styles";

interface Props {
	className?: string | undefined;
	progress: number;
}

export const Progress = ({ className, progress = 0 }: Props) => {
	const width = Math.min(100, Math.max(0, progress));

	return (
		<S.Progress className={className}>
			<S.ProgressValue $width={width} />
		</S.Progress>
	);
};
