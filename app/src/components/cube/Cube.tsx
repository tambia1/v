import * as S from "./Cube.styles";

interface Props {
	className?: string;
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
					<S.Front $width={width} $height={height} $depth={depth} />
					<S.Back $width={width} $height={height} $depth={depth} />
					<S.Left $width={width} $height={height} $depth={depth} />
					<S.Right $width={width} $height={height} $depth={depth} />
					<S.Top $width={width} $height={height} $depth={depth} />
					<S.Bottom $width={width} $height={height} $depth={depth} />
				</S.Container>
			</S.Scene>
		</S.Cube>
	);
};
