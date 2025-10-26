import { Icon } from "@src/components/icon/Icon";
import { useMicrophone } from "@src/hooks/useMicrophone";
import { useEffect, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";

export const Shush = () => {
	const { isListening, volume } = useMicrophone();
	const audioUrlsRef = useRef([shush0, shush1]);
	const audioContextRef = useRef<AudioContext | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [maxVolume, setMaxVolume] = useState(0.2);

	// Initialize AudioContext on first user interaction
	useEffect(() => {
		const initAudioContext = () => {
			if (!audioContextRef.current) {
				try {
					audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
				} catch (error) {
					console.error("Failed to create AudioContext:", error);
				}
			}
		};

		// Initialize on first interaction
		window.addEventListener("click", initAudioContext, { once: true });
		window.addEventListener("touchstart", initAudioContext, { once: true });

		return () => {
			window.removeEventListener("click", initAudioContext);
			window.removeEventListener("touchstart", initAudioContext);
		};
	}, []);

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

			let timeoutId: NodeJS.Timeout | null = null;

			// Handle audio end
			const handleEnded = () => {
				console.log("Audio ended");

				if (timeoutId) {
					clearTimeout(timeoutId);
				}

				audio.removeEventListener("ended", handleEnded);
				audio.removeEventListener("error", handleError);
				audio.removeEventListener("canplay", handleCanPlay);
				setIsPlaying(false);
			};

			const handleError = (error: Event) => {
				console.error("Audio playback error:", error);

				if (timeoutId) {
					clearTimeout(timeoutId);
				}

				audio.removeEventListener("ended", handleEnded);
				audio.removeEventListener("error", handleError);
				audio.removeEventListener("canplay", handleCanPlay);
				setIsPlaying(false);
			};

			const handleCanPlay = () => {
				console.log("Audio can play, attempting to play");
				audio.removeEventListener("canplay", handleCanPlay);
			};

			audio.addEventListener("ended", handleEnded);
			audio.addEventListener("error", handleError);
			audio.addEventListener("canplay", handleCanPlay);

			try {
				console.log("Calling audio.play()");
				await audio.play();
				console.log("Audio play() succeeded, duration:", audio.duration);

				// Fallback timeout in case ended event doesn't fire (iOS issue)
				timeoutId = setTimeout(() => {
					console.log("Audio timeout fallback triggered");

					if (timeoutId) {
						clearTimeout(timeoutId);
					}

					audio.removeEventListener("ended", handleEnded);
					audio.removeEventListener("error", handleError);
					audio.removeEventListener("canplay", handleCanPlay);
					setIsPlaying(false);
				}, (audio.duration + 0.5) * 1000);
			} catch (error) {
				console.error("Play promise rejected:", error);

				if (timeoutId) {
					clearTimeout(timeoutId);
				}

				setIsPlaying(false);
			}
		} catch (error) {
			console.error("Error playing audio:", error);
			
			setIsPlaying(false);
		}
	};

	useEffect(() => {
		if (volume >= maxVolume && !isPlaying) {
			console.log("Volume threshold reached:", volume, ">=", maxVolume);
			setIsPlaying(true);
			playAudio().catch((error) => {
				console.error("playAudio failed:", error);
				setIsPlaying(false);
			});
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
