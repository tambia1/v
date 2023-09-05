import { IconsName } from "@src/components/icon/Icon.styles";
import { ISlot } from "@src/data/data";
import { ReactNode } from "react";
import { Memory } from "../memory/Memory";
import * as S from "./Database.styles";

interface Props {
	className?: string | undefined;
	children?: ReactNode;
	name: string;
	title: string;
	text: string;
	slot: ISlot;
	memorySize: number;
	onClickDelete: () => void;
	onClickMemory: (size: number) => void;
	onClickDisconnect: () => void;
	onDragStart: (e: React.DragEvent) => void;
	onDrop: (e: React.DragEvent) => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

const typeImages: { [K in ISlot]: IconsName } = {
	primary: "redisPrimary",
	replica: "redisReplica",
	flash: "redisFlash",
	disk: "redisDisk",
} as const;

export const Database = ({ className, name, title, text, memorySize, slot, onClickDelete, onClickMemory, onClickDisconnect, onDragStart, onDrop, onMouseEnter, onMouseLeave }: Props) => {
	return (
		<S.Container
			className={className}
			data-name={name}
			draggable
			onDragStart={onDragStart}
			onDrop={onDrop}
			onDragOver={(e) => e.preventDefault()}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			data-link="none"
		>
			<S.ContainerTitle>
				<S.IconDelete iconName="minusCircle" onClick={onClickDelete} />
				<S.Title>{title}</S.Title>
				<S.IconType iconName={typeImages[slot]} />
				<S.IconRight iconName="imageRight" onClick={onClickDisconnect} />
				<S.Text>{text}</S.Text>
			</S.ContainerTitle>

			<S.ContainerMemory>
				<Memory memories={[10, 20, 40, 80, 100]} selectedMemorySize={memorySize} onClick={onClickMemory} isEnabled={slot !== "replica"} />
				<S.SubText>{memorySize} MB</S.SubText>
			</S.ContainerMemory>
		</S.Container>
	);
};
