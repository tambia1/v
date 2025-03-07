import { useEffect, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";

export const Shush = () => {
	const audioRefs = useRef([new Audio(shush0), new Audio(shush1)]);
	const [maxVolume, setMaxVolume] = useState(1.2);

	useEffect(() => {
		setTimeout(() => {
			audioRefs.current[0].play();
		}, 3000 * 1);

		setTimeout(() => {
			audioRefs.current[0].play();
		}, 3000 * 2);

		setTimeout(() => {
			audioRefs.current[0].play();
		}, 3000 * 3);

		setTimeout(() => {
			audioRefs.current[0].play();
		}, 3000 * 4);

		return () => {
			audioRefs.current.forEach((audio) => {
				audio.pause();
				audio.currentTime = 0;
			});
		};
	}, []);

	// useEffect(() => {
	// 	const playAudio = async () => {
	// 		if (volume >= maxVolume && !isPlaying) {
	// 			const randomIndex = Math.floor(Math.random() * audioRefs.current.length);
	// 			const randomAudio = audioRefs.current[randomIndex];

	// 			setIsPlaying(true);
	// 			randomAudio.currentTime = 0;
	// 			randomAudio.play();
	// 			randomAudio.onended = () => setIsPlaying(false);

	// 			setTimeout(() => {
	// 				setIsPlaying(false);
	// 			}, 3000);
	// 		}
	// 	};

	// 	playAudio();
	// }, [volume, isPlaying, maxVolume]);

	return (
		<S.Shush>
			<S.Row>
				{/* {!isListening && <Icon iconName="iconMicOff" stroke="red" />}
				{isListening && <Icon iconName="iconMic" stroke="green" />} */}
			</S.Row>

			{/* <S.ProgressStyled size="available" percent={volume * 100} /> */}
			<S.SliderStyled size="available" value={maxVolume} onChange={(value) => setMaxVolume(value)} />
		</S.Shush>
	);
};
