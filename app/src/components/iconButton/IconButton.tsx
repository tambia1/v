import { type HTMLAttributes, forwardRef, useImperativeHandle, useRef } from "react";
import { Icon } from "../icon/Icon";
import type { IconName } from "../icon/Icon.types";
import * as S from "./IconButton.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	iconName: IconName;
};

export const IconButton = forwardRef<HTMLDivElement, Props>(({ className, iconName, ...rest }, ref) => {
	const refButton = useRef<HTMLDivElement>(null);

	useImperativeHandle(ref, () => refButton.current as HTMLDivElement, []);

	return (
		<S.IconButton ref={refButton} className={className} {...rest}>
			<Icon iconName={iconName} />
		</S.IconButton>
	);
});
