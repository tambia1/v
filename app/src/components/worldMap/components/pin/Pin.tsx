import { ReactNode } from "react";
import * as S from "./Pin.styles";

type Props = {
	className?: string | undefined;
	children?: ReactNode;
	lng: number;
	lat: number;
};

export const Pin = ({ children, className, lng, lat }: Props) => {
	return (
		<S.Pin className={className} $lng={lng} $lat={lat}>
			{children}
		</S.Pin>
	);
};
