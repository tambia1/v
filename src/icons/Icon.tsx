import * as S from "./Icon.styles";
import { ReactSVG } from "react-svg";
import { Icons, IIconName } from "./Icon.types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string | undefined;
	iconName: IIconName;
	size?: string;
	color?: string;
}

export const Icon = ({ className, iconName, size = "1.5rem", color = "currentcolor", ...rest }: Props) => {
	return (
		<S.Icon className={className} $size={size} $color={color} {...rest}>
			<ReactSVG src={Icons[iconName]} />
		</S.Icon>
	);
};
