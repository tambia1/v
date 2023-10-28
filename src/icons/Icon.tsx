import * as S from "./Icon.styles";
import { ReactSVG } from "react-svg";
import { Icons, IconName } from "./Icon.types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string | undefined;
	iconName: IconName;
	size?: string;
	color?: string;
}

export const Icon = ({ className, iconName, size = "2.0rem", color = "currentcolor", ...rest }: Props) => {
	return (
		<S.Icon className={className} $size={size} $color={color} {...rest}>
			<ReactSVG src={Icons[iconName]} />
		</S.Icon>
	);
};
