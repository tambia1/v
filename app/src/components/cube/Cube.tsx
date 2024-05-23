import * as S from "./Cube.styles";

interface Props {
	className?: string | undefined;
	width: number;
	height: number;
	depth: number;
	x: number;
	y: number;
	z: number;
	rotateX: number;
	rotateY: number;
	rotateZ: number;
}

export const Cube = ({ className, width, height, depth, x, y, z, rotateX, rotateY, rotateZ }: Props) => {
	return (
		<S.Cube className={className}>
			<S.Scene $width={width} $height={height}>
				<S.Container $width={width} $height={height} $depth={depth} $x={x} $y={y} $z={z} $rotateX={rotateX} $rotateY={rotateY} $rotateZ={rotateZ}>
					<S.Front $width={width} $height={height} $depth={depth}></S.Front>
					<S.Back $width={width} $height={height} $depth={depth}></S.Back>
					<S.Left $width={width} $height={height} $depth={depth}></S.Left>
					<S.Right $width={width} $height={height} $depth={depth}></S.Right>
					<S.Top $width={width} $height={height} $depth={depth}></S.Top>
					<S.Bottom $width={width} $height={height} $depth={depth}></S.Bottom>
				</S.Container>
			</S.Scene>
		</S.Cube>
	);
};
