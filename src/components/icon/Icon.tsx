import { Size } from "@src/types/Sizes";
import * as S from "./Icon.styles";
import { ReactSVG } from "react-svg";
import { Icons, IconsName } from "./Icon.types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string | undefined;
	iconName: IconsName;
	size?: Size;
}

export const Icon = ({ className, iconName, size = "m", ...restProps }: Props) => {
	return (
		<S.Container className={className} size={size} {...restProps}>
			<ReactSVG src={Icons[iconName]} />
		</S.Container>
	);
};
