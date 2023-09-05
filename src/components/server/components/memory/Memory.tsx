import * as S from "./Memory.styles";

interface Props {
	className?: string | undefined;
	memories: number[];
	selectedMemorySize: number;
	isEnabled: boolean;
	onClick: (size: number) => void;
}

export const Memory = ({ className, memories = [100, 200, 300], selectedMemorySize, isEnabled, onClick }: Props) => {
	return (
		<S.Container className={className}>
			{memories.map((memory) => (
				<S.Cell key={memory} onClick={() => onClick(memory)} $isSelected={selectedMemorySize === memory} $isEnabled={isEnabled} />
			))}
		</S.Container>
	);
};
