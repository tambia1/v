import type { Theme } from "@src/theme/Theme.types";
import { ReactSVG } from "react-svg";
import { useTheme } from "styled-components";
import * as S from "./Flag.styles";
import { type FlagName, Flags } from "./Flag.types";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	flagName: FlagName;
	size?: keyof Theme["size"];
}

export const Flag = ({ className, flagName, size = "xxs", ...rest }: Props) => {
	const theme = useTheme();

	return (
		<S.Flag className={className} $size={theme.size[size]} {...rest} data-name={flagName}>
			<ReactSVG src={Flags[flagName]} title={flagName} />
		</S.Flag>
	);
};
