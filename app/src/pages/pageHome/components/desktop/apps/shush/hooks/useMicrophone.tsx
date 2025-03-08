import { useCallback, useEffect, useRef, useState } from "react";

export const useMicrophone = () => {
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const audioStreamRef = useRef<MediaStream | null>(null);
	const requestAnimationFrameIdRef = useRef<number | null>(null);
	const [isListening, setIsListening] = useState(false);
	const [volume, setVolume] = useState(0);
	const [volumeArray, setVolumeArray] = useState<Uint8Array>();

	const startListening = useCallback(async () => {
		try {
			setIsListening(true);

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

			let isMounted = true;

			const checkVolume = () => {
				if (analyserRef.current && isMounted) {
					const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
					analyserRef.current.getByteFrequencyData(dataArray);

					const sum = dataArray.reduce((acc, val) => acc + val, 0);
					const averageVolume = sum / dataArray.length;
					const normalizedVolume = averageVolume / 255;
					setVolume(normalizedVolume);
					setVolumeArray(dataArray);
				}

				if (isMounted) {
					requestAnimationFrameIdRef.current = requestAnimationFrame(checkVolume);
				}
			};

			checkVolume();

			return () => {
				isMounted = false;
			};
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
