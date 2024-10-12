import { ReactSVG } from "react-svg";
import * as S from "./Flag.styles";
import { Flags, type IFlagName } from "./Flag.types";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	flagName: IFlagName;
	size?: string;
}

export const Flag = ({ className, flagName, size = "1.5rem", ...rest }: Props) => {
	return (
		<S.Flag className={className} $size={size} {...rest} data-name={flagName}>
			<ReactSVG src={Flags[flagName]} title={flagName} />
		</S.Flag>
	);
};
