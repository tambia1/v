import { ReactNode } from "react";
import { Database } from "../database/Database";
import * as S from "./Device.styles";

interface Props {
	className?: string | undefined;
	children?: ReactNode;
	title: string;
	text: string;
	icon: string;
	onClickAdd: () => void;
	onDrop: (e: React.DragEvent) => void;
}

export const Device = ({ className, title, text, icon, children, onClickAdd, onDrop }: Props) => {
	return (
		<S.Container className={className} onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
			<S.ContainerTitle>
				<S.IconAdd iconName="plusCircle" onClick={onClickAdd} />
				<S.Title>{title}</S.Title>
				<S.IconDevice $iconName={icon} />
				<S.Text>{text}</S.Text>
			</S.ContainerTitle>

			<S.Databases>{children}</S.Databases>
		</S.Container>
	);
};

Device.Database = Database;
