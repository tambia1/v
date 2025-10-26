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
	const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map());
	const [isPlaying, setIsPlaying] = useState(false);
	const [maxVolume, setMaxVolume] = useState(0.2);
	const lastPlayTimeRef = useRef<number>(0);
	const MIN_PLAY_INTERVAL = 500; // Minimum 500ms between plays

	// Pre-load audio files as AudioBuffers
	useEffect(() => {
		const loadAudioBuffers = async () => {
			if (!audioContextRef.current) return;

			for (const audioUrl of audioUrlsRef.current) {
				if (audioBuffersRef.current.has(audioUrl)) continue;

				try {
					logger(`Loading audio buffer: ${audioUrl}`);
					const response = await fetch(audioUrl);
					const arrayBuffer = await response.arrayBuffer();
					const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
					audioBuffersRef.current.set(audioUrl, audioBuffer);
					logger(`Audio buffer loaded: ${audioUrl}`);
				} catch (error) {
					logger(`Error loading audio buffer: ${error}`);
				}
			}
		};

		loadAudioBuffers();
	}, [audioContextRef]);

	const playAudio = () => {
		try {
			if (!audioContextRef.current) {
				logger("AudioContext not available");
				setIsPlaying(false);
				return;
			}

			if (audioContextRef.current.state === "suspended") {
				audioContextRef.current.resume().catch((e) => logger(`Resume error: ${e}`));
			}

			const randomIndex = Math.floor(Math.random() * audioUrlsRef.current.length);
			const audioUrl = audioUrlsRef.current[randomIndex];
			const audioBuffer = audioBuffersRef.current.get(audioUrl);

			if (!audioBuffer) {
				logger(`Audio buffer not found for: ${audioUrl}`);
				setIsPlaying(false);
				return;
			}

			logger(`Playing audio: ${audioUrl}`);

			const source = audioContextRef.current.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(audioContextRef.current.destination);

			let hasEnded = false;

			const cleanup = () => {
				logger("Cleanup called");
				source.stop();
				source.disconnect();
				hasEnded = true;
				setIsPlaying(false);
			};

			source.onended = () => {
				logger("Audio ended event fired");
				if (!hasEnded) {
					cleanup();
				}
			};

			try {
				logger("Calling source.start()");
				source.start(0);
				logger("Audio play() succeeded");

				// Set a timeout as fallback in case ended event doesn't fire
				setTimeout(() => {
					logger("Audio timeout fallback triggered");
					if (!hasEnded) {
						cleanup();
					}
				}, (audioBuffer.duration + 0.5) * 1000);
			} catch (error) {
				logger(`Error calling start(): ${error}`);
				if (!hasEnded) {
					cleanup();
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
