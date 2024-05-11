import * as S from "./Slider.styles";

interface Props {
	value: number;
	onChange: (value: number) => void;
}

export const Slider = ({ value, onChange }: Props) => {
	return (
		<S.Slider>
			<S.SliderInput type="range" min={0} max={100} value={value * 100} onChange={(e) => onChange(Number(e.target.value) / 100)} />
		</S.Slider>
	);
};
