import type { Theme } from "@src/theme/Theme.types";
import { useTheme } from "styled-components";
import * as S from "./Progress.styles";

export type Props = {
	className?: string;
	ariaLabel?: string;
	size?: keyof Theme["size"];
	percent: number;
};

export const Progress = ({ className, ariaLabel, percent = 0, size = "l" }: Props) => {
	const theme = useTheme();
	const width = Math.round(Math.min(100, Math.max(0, percent)));

	return (
		<S.Progress className={className} aria-label={ariaLabel} data-progress={width} $width={theme.size[size]}>
			<S.ProgressContent>
				<S.ProgressValue $width={width} />
			</S.ProgressContent>
		</S.Progress>
	);
};
