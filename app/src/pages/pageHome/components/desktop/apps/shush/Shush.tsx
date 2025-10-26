import { Icon } from "@src/components/icon/Icon";
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

	// Resume AudioContext if suspended (iOS requirement)
	const resumeAudioContext = async () => {
		if (audioContextRef.current && audioContextRef.current.state === "suspended") {
			try {
				await audioContextRef.current.resume();
			} catch (error) {
				console.error("Failed to resume AudioContext:", error);
			}
		}
	};

	const playAudio = async () => {
		try {
			await resumeAudioContext();

			const randomIndex = Math.floor(Math.random() * audioUrlsRef.current.length);
			const audioUrl = audioUrlsRef.current[randomIndex];

			// Create a fresh audio element for each play to avoid state issues
			const audio = new Audio(audioUrl);
			audio.volume = 1.0;

			console.log("Playing audio:", audioUrl);

			return new Promise<void>((resolve) => {
				let timeoutId: NodeJS.Timeout | null = null;
				let isResolved = false;

				const cleanup = () => {
					console.log("Cleanup called");
					if (timeoutId) {
						clearTimeout(timeoutId);
						timeoutId = null;
					}
					audio.removeEventListener("ended", handleEnded);
					audio.removeEventListener("error", handleError);
					audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
					audio.pause();
					audio.src = "";
				};

				const handleEnded = () => {
					console.log("Audio ended event fired");
					if (!isResolved) {
						isResolved = true;
						cleanup();
						setIsPlaying(false);
						resolve();
					}
				};

				const handleError = (error: Event) => {
					console.error("Audio playback error:", error);
					if (!isResolved) {
						isResolved = true;
						cleanup();
						setIsPlaying(false);
						resolve();
					}
				};

				const handleLoadedMetadata = () => {
					console.log("Audio metadata loaded, duration:", audio.duration);
				};

				audio.addEventListener("ended", handleEnded);
				audio.addEventListener("error", handleError);
				audio.addEventListener("loadedmetadata", handleLoadedMetadata);

				try {
					console.log("Calling audio.play()");
					const playPromise = audio.play();

					if (playPromise !== undefined) {
						playPromise
							.then(() => {
								console.log("Audio play() succeeded, duration:", audio.duration);
								// Set a timeout as fallback in case ended event doesn't fire
								const duration = audio.duration || 2; // Default 2 seconds if duration is unknown
								timeoutId = setTimeout(() => {
									console.log("Audio timeout fallback triggered after", duration, "seconds");
									if (!isResolved) {
										isResolved = true;
										cleanup();
										setIsPlaying(false);
										resolve();
									}
								}, (duration + 0.5) * 1000);
							})
							.catch((error) => {
								console.error("Play promise rejected:", error);
								if (!isResolved) {
									isResolved = true;
									cleanup();
									setIsPlaying(false);
									resolve();
								}
							});
					}
				} catch (error) {
					console.error("Error calling play():", error);
					if (!isResolved) {
						isResolved = true;
						cleanup();
						setIsPlaying(false);
						resolve();
					}
				}
			});
		} catch (error) {
			console.error("Error playing audio:", error);
			setIsPlaying(false);
		}
	};

	useEffect(() => {
		if (volume >= maxVolume && !isPlaying) {
			const now = Date.now();
			const timeSinceLastPlay = now - lastPlayTimeRef.current;

			if (timeSinceLastPlay >= MIN_PLAY_INTERVAL) {
				console.log("Volume threshold reached:", volume, ">=", maxVolume);
				lastPlayTimeRef.current = now;
				setIsPlaying(true);
				playAudio().catch((error) => {
					console.error("playAudio failed:", error);
					setIsPlaying(false);
				});
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
