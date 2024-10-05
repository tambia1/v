import { ReactSVG } from "react-svg";
import * as S from "./Icon.styles";
import { type IIconName, Icons } from "./Icon.types";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string | undefined;
	iconName: IIconName;
	size?: string;
	fill?: string;
	stroke?: string;
}

export const Icon = ({ className, iconName, size = "1.5rem", fill, stroke, ...rest }: Props) => {
	return (
		<S.Icon className={className} $size={size} {...rest} data-name={iconName} $fill={fill} $stroke={stroke}>
			<ReactSVG src={Icons[iconName]} title={iconName} />
		</S.Icon>
	);
};
