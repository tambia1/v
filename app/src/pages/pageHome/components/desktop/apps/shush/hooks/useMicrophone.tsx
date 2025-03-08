import { useCallback, useEffect, useRef, useState } from "react";

export const useMicrophone = () => {
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const audioStreamRef = useRef<MediaStream | null>(null);
	const listeningRef = useRef(false);
	const [volume, setVolume] = useState(0);
	const [volumeArray, setVolumeArray] = useState<Uint8Array>();

	const startListening = useCallback(async () => {
		try {
			listeningRef.current = true;

			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			audioStreamRef.current = stream;

			const audioContext = new AudioContext();
			audioContextRef.current = audioContext;

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
				if (analyserRef.current) {
					const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
					analyserRef.current.getByteFrequencyData(dataArray);

					let sum = 0;
					for (let i = 0; i < dataArray.length; i++) {
						sum += dataArray[i];
					}

					const averageVolume = sum / dataArray.length;
					const normalizedVolume = averageVolume / 255;
					setVolume(() => normalizedVolume);

					setVolumeArray(dataArray);
				}

				requestAnimationFrame(checkVolume);
			};

			checkVolume();
		} catch (error) {
			console.error("Error accessing audio stream:", error);
			listeningRef.current = false;
		}
	}, []);

	const stopListening = useCallback(() => {
		setVolume(0);
		setVolumeArray(new Uint8Array(analyserRef.current?.frequencyBinCount || 0));

		listeningRef.current = false;

		if (audioStreamRef.current) {
			audioStreamRef.current.getTracks().forEach((track) => track.stop());
			audioStreamRef.current = null;
		}

		if (audioContextRef.current) {
			audioContextRef.current.close();
			audioContextRef.current = null;
		}
	}, []);

	useEffect(() => {
		startListening();

		return () => {
			stopListening();
		};
	}, [startListening, stopListening]);

	return { isListening: listeningRef.current, volume, volumeArray, startListening, stopListening };
};
