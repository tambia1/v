import { Icon } from "@src/components/icon/Icon";
import { Progress } from "@src/components/progress/Progress";
import { Text } from "@src/components/text/Text";
import { useEffect, useRef, useState } from "react";
import * as S from "./ChickenScream.styles";
import { Chicken } from "./components/chicken/Chicken";
import type { State } from "./components/chicken/Chicken.types";
import { Sun } from "./components/sun/Sun";

export const ChickenScream = () => {
	const [chickenState, setChickenState] = useState<State>("walk-2");
	const timer = useRef(0);
	const groundX = useRef(0);

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
		const INTERVAL = 100;
		const intervalId = setInterval(() => {
			timer.current += INTERVAL;
		}, INTERVAL);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (volume > 0.25) {
			setChickenState("jump");
			timer.current = 0;
			groundX.current += 2;
		} else if (volume > 0.15) {
			groundX.current++;

			if (timer.current < 300) {
				return;
			}

			setChickenState(chickenState === "walk-1" ? "walk-2" : "walk-1");
			timer.current = 0;
		} else {
			if (timer.current < 600) {
				return;
			}

			setChickenState("idle");
		}
	}, [volume, chickenState]);

	return (
		<S.ChickenScream>
			<S.Row>
				<S.Col>
					{!isListening && <Icon iconName="iconMicOff" stroke="red" />}
					{isListening && <Icon iconName="iconMic" stroke="green" />}
					<Progress percent={volume * 100} />
				</S.Col>
			</S.Row>

			<S.Spacer />

			<S.Row>
				<Text>Volume: {volume.toFixed(3)}</Text>
			</S.Row>

			<S.Sun>
				<Sun />
			</S.Sun>

			<S.Chicken $isJumping={chickenState === "jump"}>
				<Chicken state={chickenState} />
			</S.Chicken>

			<S.Ground $x={groundX.current} />
		</S.ChickenScream>
	);
};
