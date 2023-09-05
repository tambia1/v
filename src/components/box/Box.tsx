import { ReactNode } from "react";
import * as S from "./Box.styles";

interface Props {
	className?: string | undefined;
	children?: ReactNode;
	title: ReactNode;
}

export const Box = ({ className, title, children }: Props) => {
	return (
		<S.Container className={className}>
			<S.ContainerTitle>
				<S.Title>{title}</S.Title>
			</S.ContainerTitle>

			<S.ContainerChildren>{children}</S.ContainerChildren>
		</S.Container>
	);
};

Box.ContainerTitle = S.ContainerTitle;
Box.ContainerChildren = S.ContainerChildren;
