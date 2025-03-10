import { Icon } from "@src/components/icon/Icon";
import { useEffect, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";
import { useAudio } from "./hooks/useAudio";

const audioList = [shush0, shush1];

export const Shush = () => {
	const { mic, audio } = useAudio();
	const [maxVolume, setMaxVolume] = useState(0.2);

	useEffect(() => {
		mic.startMic();
	}, [mic.startMic]);

	useEffect(() => {
		if (mic.volume >= maxVolume && !audio.isPlaying) {
			const randomIndex = Math.floor(Math.random() * audioList.length);
			const randomAudio = audioList[randomIndex];

			audio.playAudio(randomAudio);
		}
	}, [mic.volume, audio.isPlaying, audio.playAudio, maxVolume]);

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
