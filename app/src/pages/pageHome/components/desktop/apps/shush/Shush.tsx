import { Icon } from "@src/components/icon/Icon";
import { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";
import { useMicrophone } from "./hooks/useMicrophone";

export const Shush = () => {
	const { isListening, volume } = useMicrophone();
	const audioRefs = useRef([new Audio(shush0), new Audio(shush1)]);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const playAudio = async () => {
			if (volume >= 0.3 && !isPlaying) {
				const randomIndex = Math.floor(Math.random() * audioRefs.current.length);
				const randomAudio = audioRefs.current[randomIndex];

				setIsPlaying(true);
				randomAudio.currentTime = 0;
				randomAudio.play();
				randomAudio.onended = () => setIsPlaying(false);
			}
		};

		playAudio();
	}, [volume, isPlaying]);

	const bars = useMemo(() => {
		const totalBars = 10;
		const maxVolume = 1;

		return Array.from({ length: totalBars }, (_, i) => {
			const barLevel = ((i + 1) / totalBars) * maxVolume;
			const isActive = volume >= barLevel;

			let color = "#555";
			if (barLevel > 0.2) color = "#00ff00";
			if (barLevel > 0.5) color = "#ff0000";

			return { height: (i + 1) * 5, color: isActive ? color : "#333333" };
		});
	}, [volume]);

	return (
		<S.Shush>
			{!isListening && <Icon iconName="iconMicOff" stroke="red" />}
			{isListening && <Icon iconName="iconMic" stroke="green" />}

			<S.VolumeBars>
				{bars.map((bar, index) => (
					<S.Bar key={index} height={bar.height} color={bar.color} />
				))}
			</S.VolumeBars>
		</S.Shush>
	);
};
