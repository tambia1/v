import { useEffect, useRef, useState } from "react";

export const useMicrophone = () => {
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const audioStreamRef = useRef<MediaStream | null>(null);
	const [isListening, setIsListening] = useState(false);
	const [volume, setVolume] = useState(0);
	const [volumeArray, setVolumeArray] = useState<Uint8Array>();

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

				// Use webkit prefix for iOS compatibility
				const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
				const audioContext = new AudioContextClass();
				audioContextRef.current = audioContext;

				// Resume AudioContext if suspended (iOS requirement)
				if (audioContext.state === "suspended") {
					await audioContext.resume();
				}

				const analyser = audioContext.createAnalyser();
				analyserRef.current = analyser;
				analyser.fftSize = 256;

				const gainNode = audioContext.createGain();
				gainNode.gain.value = 10.0;

				const source = audioContext.createMediaStreamSource(stream);
				source.connect(gainNode);
				gainNode.connect(analyser);

				const checkVolume = () => {
					// Only check volume if AudioContext is running
					if (audioContext.state === "running") {
						const dataArray = new Uint8Array(analyser.frequencyBinCount);
						analyser.getByteFrequencyData(dataArray);

						let sum = 0;
						for (let i = 0; i < dataArray.length; i++) {
							sum += dataArray[i];
						}

						const averageVolume = sum / dataArray.length;
						const normalizedVolume = averageVolume / 255;
						setVolume(normalizedVolume);

						setVolumeArray(dataArray);
					}

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

	return { isListening, volume, volumeArray };
};
