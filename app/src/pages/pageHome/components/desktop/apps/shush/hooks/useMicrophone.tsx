import { useCallback, useEffect, useRef, useState } from "react";

export const useMicrophone = () => {
	const audioStreamRef = useRef<MediaStream | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const requestAnimationFrameIdRef = useRef<number | null>(null);
	const [isListening, setIsListening] = useState(false);
	const [volume, setVolume] = useState(0);
	const [volumeArray, setVolumeArray] = useState<Uint8Array>();

	const startListening = useCallback(async () => {
		try {
			setIsListening(true);

			audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
			audioContextRef.current = new AudioContext();

			const analyser = audioContextRef.current.createAnalyser();
			analyserRef.current = analyser;
			analyser.fftSize = 256;

			const gainNode = audioContextRef.current.createGain();
			gainNode.gain.value = 10.0;

			const source = audioContextRef.current.createMediaStreamSource(audioStreamRef.current);
			source.connect(gainNode);
			gainNode.connect(analyser);

			const checkVolume = () => {
				if (analyserRef.current) {
					const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
					analyserRef.current.getByteFrequencyData(dataArray);

					const sum = dataArray.reduce((acc, val) => acc + val, 0);
					const averageVolume = sum / dataArray.length;
					const normalizedVolume = averageVolume / 255;
					setVolume(normalizedVolume);
					setVolumeArray(dataArray);

					requestAnimationFrameIdRef.current = requestAnimationFrame(checkVolume);
				}
			};

			checkVolume();
		} catch (error) {
			console.error("Error accessing audio stream:", error);
			setIsListening(false);
		}
	}, []);

	const stopListening = useCallback(() => {
		setIsListening(false);
		setVolume(0);
		setVolumeArray(new Uint8Array(analyserRef.current?.frequencyBinCount || 0));

		if (requestAnimationFrameIdRef.current !== null) {
			cancelAnimationFrame(requestAnimationFrameIdRef.current);
			requestAnimationFrameIdRef.current = null;
		}

		if (audioStreamRef.current) {
			audioStreamRef.current.getTracks().forEach((track) => track.stop());
			audioStreamRef.current = null;
		}

		if (audioContextRef.current) {
			audioContextRef.current.close();
			audioContextRef.current = null;
		}

		analyserRef.current = null;
	}, []);

	useEffect(() => {
		startListening();

		return () => {
			stopListening();
		};
	}, [startListening, stopListening]);

	return { isListening, volume, volumeArray, startListening, stopListening };
};
