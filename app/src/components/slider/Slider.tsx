import * as S from "./Slider.styles";

export interface Props {
	className?: string;
	value: number;
	onChange: (value: number) => void;
}

export const Slider = ({ className, value, onChange }: Props) => {
	return (
		<S.Slider className={className}>
			<S.SliderInput type="range" min={0} max={100} value={value * 100} onChange={(e) => onChange(Number(e.target.value) / 100)} />
		</S.Slider>
	);
};
