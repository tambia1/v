import { Icon } from "@src/components/icon/Icon";
import { useEffect, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";
import { useAudio } from "./hooks/useAudio";

export const Shush = () => {
	const { mic, audio } = useAudio();
	const audioRefs = useRef([new Audio(shush0), new Audio(shush1)]);
	const [maxVolume, setMaxVolume] = useState(0.2);

	useEffect(() => {
		mic.startMic();
	}, [mic.startMic]);

	useEffect(() => {
		if (mic.volume >= maxVolume && !audio.isPlaying) {
			const randomIndex = Math.floor(Math.random() * audioRefs.current.length);
			const randomAudio = audioRefs.current[randomIndex];

			randomAudio.play();
		}
	}, [mic.volume, audio.isPlaying, maxVolume]);

	return (
		<S.Shush>
			<S.Row>
				{!mic.isListening && <Icon iconName="iconMicOff" stroke="red" />}
				{mic.isListening && <Icon iconName="iconMic" stroke="green" />}

				{!audio.isPlaying && <Icon iconName="iconVolumeX" stroke="gray" />}
				{audio.isPlaying && <Icon iconName="iconVolume2" stroke="yellow" />}
			</S.Row>

			<S.ProgressStyled size="available" percent={mic.volume * 100} />
			<S.SliderStyled size="available" value={maxVolume} onChange={(value) => setMaxVolume(value)} />
		</S.Shush>
	);
};
