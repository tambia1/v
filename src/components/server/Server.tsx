import { ReactNode } from "react";
import * as S from "./Server.styles";
import { Device } from "./components/device/Device";

interface Props {
	className?: string | undefined;
	children?: ReactNode;
	name: string;
	title: string;
	text: string;
	icon: string;
	primary: ReactNode;
	replica: ReactNode;
	flash: ReactNode;
	disk: ReactNode;
	onClickDelete: () => void;
}

export const Server = ({ className, name, title, text, icon, primary, replica, flash, disk, onClickDelete }: Props) => {
	return (
		<S.Server className={className} data-name={name}>
			<S.ContainerTitle>
				<S.IconDelete iconName="minusCircle" onClick={onClickDelete} />
				<S.Title>{title}</S.Title>
				<S.IconDevice $iconName={icon} />
				<S.Text>{text}</S.Text>
			</S.ContainerTitle>

			<S.Devices>
				{primary}
				{replica}
				{flash}
				{disk}
			</S.Devices>
		</S.Server>
	);
};

Server.Device = Device;
