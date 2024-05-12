import { Text } from "@src/components/text/Text";
import * as S from "./TestCude.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Cube } from "@src/components/cube/Cube";
import { Slider } from "@src/components/slider/Slider";
import { useState } from "react";

export const TestCube = () => {
	const [sliderValue, setSliderValue] = useState({
		width: 0.5,
		height: 0.5,
		depth: 0.5,
		x: 0.5,
		y: 0.5,
		z: 0.5,
		rotateX: 0.3,
		rotateY: 0.75,
		rotateZ: 0.5,
	});

	const handleSliderOnChange = (key: keyof typeof sliderValue, value: number) => {
		setSliderValue({ ...sliderValue, [key]: value });
	};

	return (
		<S.TestCube>
			<Text size="l">
				<T>{lang.testCube.title}</T>
			</Text>

			<Cube
				width={sliderValue.width * 200}
				height={sliderValue.height * 200}
				depth={sliderValue.depth * 100}
				x={sliderValue.x * 100}
				y={sliderValue.y * 100}
				z={sliderValue.z * 100}
				rotateX={sliderValue.rotateX * 100 - 50}
				rotateY={sliderValue.rotateY * 100 - 50}
				rotateZ={sliderValue.rotateZ * 100 - 50}
			/>

			<Slider value={sliderValue["width"]} onChange={(value) => handleSliderOnChange("width", value)} />
			<Slider value={sliderValue["height"]} onChange={(value) => handleSliderOnChange("height", value)} />
			<Slider value={sliderValue["depth"]} onChange={(value) => handleSliderOnChange("depth", value)} />
			<Slider value={sliderValue["x"]} onChange={(value) => handleSliderOnChange("x", value)} />
			<Slider value={sliderValue["y"]} onChange={(value) => handleSliderOnChange("y", value)} />
			<Slider value={sliderValue["z"]} onChange={(value) => handleSliderOnChange("z", value)} />
			<Slider value={sliderValue["rotateX"]} onChange={(value) => handleSliderOnChange("rotateX", value)} />
			<Slider value={sliderValue["rotateY"]} onChange={(value) => handleSliderOnChange("rotateY", value)} />
			<Slider value={sliderValue["rotateZ"]} onChange={(value) => handleSliderOnChange("rotateZ", value)} />
		</S.TestCube>
	);
};
