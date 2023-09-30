import * as S from "./Icon.styles";
import { ReactSVG } from "react-svg";
import { Icons, IconName } from "./Icon.types";
import { Size } from "@src/themes/Theme.types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string | undefined;
	iconName: IconName;
	size?: Size;
}

export const Icon = ({ className, iconName, size = "m", ...restProps }: Props) => {
	return (
		<S.Icon className={className} size={size} {...restProps}>
			<ReactSVG src={Icons[iconName]} />
		</S.Icon>
	);
};
