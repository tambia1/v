import { Icon } from "@src/components/icon/Icon";
import { useLoggerStore } from "@src/pages/pageHome/components/desktop/apps/debug/Debug";
import { useMicrophone } from "@src/hooks/useMicrophone";
import { useEffect, useRef, useState } from "react";
import * as S from "./Shush.styles";
import shush0 from "./assets/shush_0.mp3";
import shush1 from "./assets/shush_1.mp3";

export const Shush = () => {
	const { isListening, volume, audioContextRef } = useMicrophone();
	const addLog = useLoggerStore((state) => state.addLog);
	const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map());
	const [isPlaying, setIsPlaying] = useState(false);
	const [maxVolume, setMaxVolume] = useState(0.2);
	const lastPlayTimeRef = useRef<number>(0);
	const MIN_PLAY_INTERVAL = 500; // Minimum 500ms between plays

	// Pre-load audio files as AudioBuffers
	useEffect(() => {
		const loadAudioBuffers = async () => {
			addLog("Starting audio buffer loading...");
			if (!audioContextRef.current) {
				addLog("AudioContext not available yet, retrying...");
				// Retry after a short delay
				setTimeout(() => {
					loadAudioBuffers();
				}, 100);
				return;
			}

			const audioUrls = [shush0, shush1];
			addLog(`Audio URLs: ${audioUrls.join(", ")}`);

			for (const audioUrl of audioUrls) {
				if (audioBuffersRef.current.has(audioUrl)) {
					addLog(`Audio buffer already loaded: ${audioUrl}`);
					continue;
				}

				try {
					addLog(`Fetching audio: ${audioUrl}`);
					const response = await fetch(audioUrl);
					addLog(`Fetch response status: ${response.status}`);
					const arrayBuffer = await response.arrayBuffer();
					addLog(`Array buffer size: ${arrayBuffer.byteLength}`);
					const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
					audioBuffersRef.current.set(audioUrl, audioBuffer);
					addLog(`Audio buffer loaded successfully: ${audioUrl}, duration: ${audioBuffer.duration}`);
				} catch (error) {
					addLog(`Error loading audio buffer: ${error}`);
				}
			}
		};

		loadAudioBuffers();
	}, [audioContextRef]);

	const playAudio = () => {
		try {
			if (!audioContextRef.current) {
				addLog("AudioContext not available");
				setIsPlaying(false);
				return;
			}

			if (audioContextRef.current.state === "suspended") {
				audioContextRef.current.resume().catch((e) => addLog(`Resume error: ${e}`));
			}

			const audioUrls = [shush0, shush1];
			const randomIndex = Math.floor(Math.random() * audioUrls.length);
			const audioUrl = audioUrls[randomIndex];
			const audioBuffer = audioBuffersRef.current.get(audioUrl);

			if (!audioBuffer) {
				addLog(`Audio buffer not found for: ${audioUrl}`);
				setIsPlaying(false);
				return;
			}

			addLog(`Playing audio: ${audioUrl}`);

			const source = audioContextRef.current.createBufferSource();
			source.buffer = audioBuffer;
			source.connect(audioContextRef.current.destination);

			let hasEnded = false;

			const cleanup = () => {
				addLog("Cleanup called");
				source.stop();
				source.disconnect();
				hasEnded = true;
				setIsPlaying(false);
			};

			source.onended = () => {
				addLog("Audio ended event fired");
				if (!hasEnded) {
					cleanup();
				}
			};

			try {
				addLog("Calling source.start()");
				source.start(0);
				addLog("Audio play() succeeded");

				// Set a timeout as fallback in case ended event doesn't fire
				setTimeout(() => {
					addLog("Audio timeout fallback triggered");
					if (!hasEnded) {
						cleanup();
					}
				}, (audioBuffer.duration + 0.5) * 1000);
			} catch (error) {
				addLog(`Error calling start(): ${error}`);
				if (!hasEnded) {
					cleanup();
				}
			}
		} catch (error) {
			addLog(`Error playing audio: ${error}`);
			setIsPlaying(false);
		}
	};

	useEffect(() => {
		if (volume >= maxVolume && !isPlaying) {
			const now = Date.now();
			const timeSinceLastPlay = now - lastPlayTimeRef.current;

			if (timeSinceLastPlay >= MIN_PLAY_INTERVAL) {
				addLog(`Volume threshold reached: ${volume} >= ${maxVolume}`);
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
