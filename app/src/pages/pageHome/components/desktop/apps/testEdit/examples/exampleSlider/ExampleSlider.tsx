import { Slider } from "@src/components/slider/Slider";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExampleSlider = () => {
	const [sliderValue, setSliderValue] = useState(0.5);

	const handleOnChange = (value: number) => {
		setSliderValue(value);
	};

	return (
		<S.Col>
			<S.Title>
				<Text variant="title">Slider</Text>
			</S.Title>

			<S.Row>
				<Text>Value: {Math.round(sliderValue * 100)}</Text>
			</S.Row>

			<S.Row>
				<Slider value={sliderValue} onChange={handleOnChange} />
			</S.Row>
		</S.Col>
	);
};

