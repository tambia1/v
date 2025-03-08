import { Icon } from "@src/components/icon/Icon";
import { useEffect, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import { useMicrophone } from "./hooks/useMicrophone";

export const Shush = () => {
	const { isListening, volume, startListening, stopListening } = useMicrophone();
	const audioRefs = useRef(new Audio(shush0));
	const [isPlaying, setIsPlaying] = useState(false);
	const [maxVolume, setMaxVolume] = useState(0.2);

	useEffect(() => {
		if (volume >= maxVolume && !isPlaying) {
			setIsPlaying(true);

			stopListening();
			audioRefs.current.play();
			audioRefs.current.onended = () => {
				setTimeout(() => {
					startListening();
					setIsPlaying(false);
				}, 500);
			};
		}
	}, [volume, isPlaying, maxVolume, startListening, stopListening]);

	return (
		<S.Shush>
			<S.Row>
				{!isListening && <Icon iconName="iconMicOff" stroke="red" />}
				{isListening && <Icon iconName="iconMic" stroke="green" />}

				{!isPlaying && <Icon iconName="iconVolumeX" stroke="gray" />}
				{isPlaying && <Icon iconName="iconVolume2" stroke="yellow" />}
			</S.Row>

			<S.ProgressStyled size="available" percent={volume * 100} />
			<S.SliderStyled size="available" value={maxVolume} onChange={(value) => setMaxVolume(value)} />
		</S.Shush>
	);
};
