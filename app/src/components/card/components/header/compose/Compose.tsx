import { HTMLAttributes } from "react";
import * as S from "./Compose.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	clickable?: boolean;
};

export const Compose = ({ children, clickable = false, ...rest }: Props) => {
	return (
		<S.Compose clickable={clickable} {...rest}>
			{children}
		</S.Compose>
	);
};
