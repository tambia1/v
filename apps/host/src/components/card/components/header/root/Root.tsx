import { HTMLAttributes } from "react";

import * as S from "./Root.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	$clickable?: boolean;
};

export const Root = ({ children, $clickable = false, ...rest }: Props) => {
	return (
		<S.Root $clickable={$clickable} {...rest}>
			{children}
		</S.Root>
	);
};
