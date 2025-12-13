import { useTheme } from "@emotion/react";
import { Theme } from "@src/theme/Theme.types";
import * as S from "./Slider.styles";

export type Props = {
	className?: string;
	value: number;
	onChange: (value: number) => void;
	size?: keyof Theme["size"];
};

export const Slider = ({ className, value, onChange, size = "size800" }: Props) => {
	const theme = useTheme();

	return (
		<S.Slider className={className} $width={theme.size[size]}>
			<S.SliderInput type="range" min={0} max={100} value={value * 100} onChange={(e) => onChange(Number(e.target.value) / 100)} />
		</S.Slider>
	);
};
