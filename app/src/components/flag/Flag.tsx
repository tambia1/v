import type { ITheme } from "@src/theme/Theme.types";
import { ReactSVG } from "react-svg";
import { useTheme } from "styled-components";
import * as S from "./Flag.styles";
import { Flags, type IFlagName } from "./Flag.types";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	flagName: IFlagName;
	size?: keyof ITheme["size"];
}

export const Flag = ({ className, flagName, size = "xxs", ...rest }: Props) => {
	const theme = useTheme();

	return (
		<S.Flag className={className} $size={theme.size[size]} {...rest} data-name={flagName}>
			<ReactSVG src={Flags[flagName]} title={flagName} />
		</S.Flag>
	);
};
