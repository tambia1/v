import * as S from "./Icon.styles";
import { ReactSVG } from "react-svg";
import { Icons, IIconName } from "./Icon.types";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string | undefined;
	iconName: IIconName;
	size?: string;
}

export const Icon = ({ className, iconName, size = "1.5rem", ...rest }: Props) => {
	return (
		<S.Icon className={className} $size={size} {...rest} data-name={iconName}>
			<ReactSVG src={Icons[iconName]} title={iconName} />
		</S.Icon>
	);
};
