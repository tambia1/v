import { Icon } from "@src/components/icon/Icon";
import { Text } from "@src/components/text/Text";
import { useEffect, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";
import { useMicrophone } from "./hooks/useMicrophone";

export const Shush = () => {
	const { isListening, volume } = useMicrophone();
	const audioRefs = useRef([new Audio(shush0), new Audio(shush1)]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [maxVolume, setMaxVolume] = useState(0.2);
	const [log, setLog] = useState("");

	useEffect(() => {
		if (volume >= maxVolume && !isPlaying) {
			setIsPlaying(true);

			const randomIndex = Math.floor(Math.random() * audioRefs.current.length);
			const randomAudio = audioRefs.current[randomIndex];

			setTimeout(() => {
				randomAudio.play().catch((err) => setLog(`Audio play failed: ${err}`));
				randomAudio.onended = () => {
					setTimeout(() => {
						setIsPlaying(false);
					}, 500);
				};
			}, 500);
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

			<S.ProgressStyled size="available" percent={volume * 100} />
			<S.SliderStyled size="available" value={maxVolume} onChange={(value) => setMaxVolume(value)} />

			<Text>{log}</Text>
		</S.Shush>
	);
};
