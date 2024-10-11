import { Icon } from "@src/components/icon/Icon";
import { Progress } from "@src/components/progress/Progress";
import { useEffect, useRef, useState } from "react";
import * as S from "./ChickenScream.styles";
import { Chicken } from "./components/chicken/Chicken";
import type { State } from "./components/chicken/Chicken.types";

export const ChickenScream = () => {
	const [chickenState, setChickenState] = useState<State>("idle");
	const canSwitchStateRef = useRef(true);

	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const audioStreamRef = useRef<MediaStream | null>(null);
	const [isListening, setIsListening] = useState(false);
	const [volume, setVolume] = useState(0);

	useEffect(() => {
		const startListening = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

				if (!stream) {
					setIsListening(false);
					return;
				}

				audioStreamRef.current = stream;
				setIsListening(true);

				// Create an AudioContext and an AnalyserNode
				const audioContext = new AudioContext();
				audioContextRef.current = audioContext;

				const analyser = audioContext.createAnalyser();
				analyserRef.current = analyser;
				analyser.fftSize = 256;

				// Create a GainNode to amplify the audio (optional for sensitivity)
				const gainNode = audioContext.createGain();
				gainNode.gain.value = 10.0;

				// Connect the audio stream to the AudioContext and AnalyserNode
				const source = audioContext.createMediaStreamSource(stream);
				source.connect(gainNode);
				gainNode.connect(analyser);

				// Function to analyze the audio levels
				const checkVolume = () => {
					const dataArray = new Uint8Array(analyser.frequencyBinCount);
					analyser.getByteFrequencyData(dataArray);

					let sum = 0;
					for (let i = 0; i < dataArray.length; i++) {
						sum += dataArray[i];
					}

					const averageVolume = sum / dataArray.length;
					const normalizedVolume = averageVolume / 255;
					setVolume(normalizedVolume);

					requestAnimationFrame(checkVolume);
				};

				checkVolume();
			} catch (error) {
				setIsListening(false);
			}
		};

		startListening();

		return () => {
			if (audioStreamRef.current) {
				audioStreamRef.current.getTracks().forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		if (volume > 0.25) {
			setChickenState("jump");
		} else if (volume > 0.15) {
			if (!canSwitchStateRef.current) {
				return;
			}

			if (chickenState === "idle") {
				setChickenState("walk");
			}

			if (chickenState === "walk") {
				setChickenState("idle");
			}

			canSwitchStateRef.current = false;

			setTimeout(() => {
				canSwitchStateRef.current = true;
			}, 300);
		} else {
			if (chickenState === "jump") {
				setChickenState("idle");
			}

			canSwitchStateRef.current = true;
		}
	}, [volume, chickenState]);

	return (
		<S.ChickenScream>
			<p>Volume: {volume.toFixed(3)}</p>

			<S.Row>
				<S.Col>
					{!isListening && <Icon iconName="iconMicOff" stroke="red" />}
					{isListening && <Icon iconName="iconMic" stroke="green" />}
					<Progress percent={volume * 100} />
				</S.Col>
			</S.Row>

			<S.Spacer />

			<Chicken state={chickenState} />
		</S.ChickenScream>
	);
};
