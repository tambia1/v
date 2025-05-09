import { Icon } from "@src/components/icon/Icon";
import { useMicrophone } from "@src/hooks/useMicrophone";
import { useEffect, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";

export const Shush = () => {
	const { isListening, volume } = useMicrophone();
	const audioRefs = useRef([new Audio(shush0), new Audio(shush1)]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [maxVolume, setMaxVolume] = useState(0.2);

	useEffect(() => {
		if (volume >= maxVolume && !isPlaying) {
			setIsPlaying(true);

			const randomIndex = Math.floor(Math.random() * audioRefs.current.length);
			const randomAudio = audioRefs.current[randomIndex];

			randomAudio.play();

			randomAudio.onended = () => {
				setIsPlaying(false);
			};
		}
	}, [volume, isPlaying, maxVolume]);

	return (
		<S.Shush>
			<S.Row>
				{!isListening && <Icon iconName="iconMicOff" stroke="red" />}
				{isListening && <Icon iconName="iconMic" stroke="green" />}
				{!isPlaying && <Icon iconName="iconVolumeX" stroke="gray" />}
				{isPlaying && <Icon iconName="iconVolume2" stroke="yellow" />}
			</S.Row>

			<S.ProgressStyled percent={volume * 100} />
			<S.SliderStyled value={maxVolume} onChange={(value) => setMaxVolume(value)} />
		</S.Shush>
	);
};
