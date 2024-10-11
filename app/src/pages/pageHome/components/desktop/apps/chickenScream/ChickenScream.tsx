import { Button } from "@src/components/button/Button";
import { useEffect, useRef, useState } from "react";
import * as S from "./ChickenScream.styles";
import { Chicken } from "./components/chicken/Chicken";
import type { State } from "./components/chicken/Chicken.types";

export const ChickenScream = () => {
	const [chickenState, setChickenState] = useState<State>("idle");

	const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
	const [isListening, setIsListening] = useState(false);
	const [volume, setVolume] = useState(0); // To store the detected volume level
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);

	useEffect(() => {
		const startListening = async () => {
			try {
				// Request access to the user's microphone
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				setAudioStream(stream);
				setIsListening(true);

				// Create an AudioContext and an AnalyserNode
				const audioContext = new AudioContext();
				audioContextRef.current = audioContext;

				const analyser = audioContext.createAnalyser();
				analyserRef.current = analyser;
				analyser.fftSize = 256; // Smaller size for quicker analysis (128 time-domain samples)

				// Create a GainNode to amplify the audio (optional for sensitivity)
				// const gainNode = audioContext.createGain();
				// gainNode.gain.value = 1.5; // Increase this to amplify the input

				// Connect the audio stream to the AudioContext and AnalyserNode
				const source = audioContext.createMediaStreamSource(stream);
				source.connect(analyser);

				// Function to analyze the audio levels
				const dataArray = new Uint8Array(analyser.fftSize);
				const checkVolume = () => {
					analyser.getByteTimeDomainData(dataArray);

					// Calculate the average volume from the waveform data
					// let sum = 0;
					// for (let i = 0; i < dataArray.length; i++) {
					// 	sum += Math.abs(dataArray[i] - 128); // Calculate deviation from center (128)
					// }
					// const averageVolume = sum / dataArray.length;
					// setVolume(averageVolume); // Update the volume state

					// Calculate the exact volume (peak amplitude)
					let maxVolume = 0;
					for (let i = 0; i < dataArray.length; i++) {
						const amplitude = Math.abs(dataArray[i] - analyser.fftSize / 2); // Deviation from the center (128)
						if (amplitude > maxVolume) {
							maxVolume = amplitude; // Get the peak amplitude (max value)
						}
					}
					setVolume(maxVolume); // Update the volume state with the exact peak volume

					console.count(String(maxVolume));

					// Continue analyzing the volume
					requestAnimationFrame(checkVolume);
				};

				// Start analyzing the volume
				checkVolume();
			} catch (error) {
				console.error("Error accessing the microphone:", error);
			}
		};

		// Call the function to start listening when the component mounts
		startListening();

		// Clean up: stop the audio stream and close the AudioContext when the component unmounts
		return () => {
			if (audioStream) {
				audioStream.getTracks().forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, [audioStream]);

	useEffect(() => {
		if (volume < 1) {
			return;
		}

		if (volume > 5) {
			handleOnClickJump();
		} else if (volume > 1) {
			handleOnClickWalk();
		}
	}, [volume]);

	const handleOnClickWalk = () => {
		setChickenState("walk");

		setTimeout(() => {
			setChickenState("idle");
		}, 100);
	};

	const handleOnClickJump = () => {
		setChickenState("jump");

		setTimeout(() => {
			setChickenState("idle");
		}, 100);
	};

	return (
		<S.ChickenScream>
			<p>Is Listening: {String(isListening)}</p>
			<p>Volume: {volume.toFixed(3)}</p>

			<S.Row>
				<Button onClick={handleOnClickWalk}>Walk</Button>
				<Button onClick={handleOnClickJump}>Jump</Button>
			</S.Row>

			<S.Spacer />

			<Chicken state={chickenState} />
		</S.ChickenScream>
	);
};
