import { Icon } from "@src/components/icon/Icon";
import { logger } from "@src/pages/pageHome/components/desktop/apps/debug/Debug";
import { useMicrophone } from "@src/hooks/useMicrophone";
import { useEffect, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";

export const Shush = () => {
	const { isListening, volume, audioContextRef } = useMicrophone();
	const audioUrlsRef = useRef([shush0, shush1]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [maxVolume, setMaxVolume] = useState(0.2);
	const lastPlayTimeRef = useRef<number>(0);
	const MIN_PLAY_INTERVAL = 500; // Minimum 500ms between plays

	const playAudio = () => {
		try {
			if (audioContextRef.current && audioContextRef.current.state === "suspended") {
				audioContextRef.current.resume().catch((e) => logger(`Resume error: ${e}`));
			}

			const randomIndex = Math.floor(Math.random() * audioUrlsRef.current.length);
			const audioUrl = audioUrlsRef.current[randomIndex];

			// Create a fresh audio element for each play to avoid state issues
			const audio = new Audio(audioUrl);
			audio.volume = 1.0;

			logger(`Playing audio: ${audioUrl}`);

			let timeoutId: NodeJS.Timeout | null = null;
			let hasEnded = false;

			const cleanup = () => {
				logger("Cleanup called");
				if (timeoutId) {
					clearTimeout(timeoutId);
					timeoutId = null;
				}
				audio.pause();
				audio.src = "";
				audio.removeEventListener("ended", handleEnded);
				audio.removeEventListener("error", handleError);
			};

			const handleEnded = () => {
				logger("Audio ended event fired");
				if (!hasEnded) {
					hasEnded = true;
					cleanup();
					setIsPlaying(false);
				}
			};

			const handleError = (error: Event) => {
				logger(`Audio playback error: ${error}`);
				if (!hasEnded) {
					hasEnded = true;
					cleanup();
					setIsPlaying(false);
				}
			};

			audio.addEventListener("ended", handleEnded);
			audio.addEventListener("error", handleError);

			try {
				logger("Calling audio.play()");
				const playPromise = audio.play();

				if (playPromise !== undefined) {
					playPromise
						.then(() => {
							logger("Audio play() succeeded");
							// Set a timeout as fallback in case ended event doesn't fire
							timeoutId = setTimeout(() => {
								logger("Audio timeout fallback triggered");
								if (!hasEnded) {
									hasEnded = true;
									cleanup();
									setIsPlaying(false);
								}
							}, 3000); // 3 second timeout
						})
						.catch((error) => {
							logger(`Play promise rejected: ${error}`);
							if (!hasEnded) {
								hasEnded = true;
								cleanup();
								setIsPlaying(false);
							}
						});
				}
			} catch (error) {
				logger(`Error calling play(): ${error}`);
				if (!hasEnded) {
					hasEnded = true;
					cleanup();
					setIsPlaying(false);
				}
			}
		} catch (error) {
			logger(`Error playing audio: ${error}`);
			setIsPlaying(false);
		}
	};

	useEffect(() => {
		if (volume >= maxVolume && !isPlaying) {
			const now = Date.now();
			const timeSinceLastPlay = now - lastPlayTimeRef.current;

			if (timeSinceLastPlay >= MIN_PLAY_INTERVAL) {
				logger(`Volume threshold reached: ${volume} >= ${maxVolume}`);
				lastPlayTimeRef.current = now;
				setIsPlaying(true);
				playAudio();
			}
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
