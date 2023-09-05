import { Size } from "@src/types/Sizes";
import * as S from "./Icon.styles";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	className?: string | undefined;
	iconName: S.IconsName;
	size?: Size;
}

export const Icon = ({ className, iconName, size = "m", ...restProps }: Props) => {
	return (
		<S.Container className={className} size={size} {...restProps}>
			<S.Icon $iconName={iconName} src="" />
		</S.Container>
	);
};
