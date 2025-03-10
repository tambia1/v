import { useCallback, useEffect, useRef, useState } from "react";

export const useAudio = () => {
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const gainNodeRef = useRef<GainNode | null>(null);
	const requestAnimationFrameIdRef = useRef<number | null>(null);

	const audioStreamRef = useRef<MediaStream | null>(null);
	const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

	const audioElementRef = useRef<HTMLAudioElement | null>(null);
	const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

	const [isListening, setIsListening] = useState(false);
	const [volume, setVolume] = useState(0);
	const [volumeArray, setVolumeArray] = useState<Uint8Array>();
	const [isPlaying, setIsPlaying] = useState(false);

	const ensureAudioContext = useCallback(() => {
		if (!audioContextRef.current) {
			audioContextRef.current = new AudioContext();
		}
		return audioContextRef.current;
	}, []);

	const startMic = useCallback(async () => {
		try {
			setIsListening(true);
			const audioContext = ensureAudioContext();
			if (audioContext.state === "suspended") {
				await audioContext.resume();
			}

			audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

			const analyser = audioContext.createAnalyser();
			analyserRef.current = analyser;
			analyser.fftSize = 256;

			const gainNode = audioContext.createGain();
			gainNode.gain.value = 10.0;
			gainNodeRef.current = gainNode;

			const micSource = audioContext.createMediaStreamSource(audioStreamRef.current);
			micSourceRef.current = micSource;

			micSource.connect(gainNode);
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
			console.error("Error accessing microphone:", error);
			setIsListening(false);
		}
	}, [ensureAudioContext]);

	const stopMic = useCallback(() => {
		setIsListening(false);
		setVolume(0);

		if (requestAnimationFrameIdRef.current !== null) {
			cancelAnimationFrame(requestAnimationFrameIdRef.current);
			requestAnimationFrameIdRef.current = null;
		}

		if (audioStreamRef.current) {
			audioStreamRef.current.getTracks().forEach((track) => track.stop());
			audioStreamRef.current = null;
		}

		if (micSourceRef.current) {
			micSourceRef.current.disconnect();
			micSourceRef.current = null;
		}

		if (gainNodeRef.current) {
			gainNodeRef.current.disconnect();
			gainNodeRef.current = null;
		}
	}, []);

	const playAudio = useCallback(
		(url: string) => {
			const audioContext = ensureAudioContext();

			if (!audioElementRef.current) {
				audioElementRef.current = new Audio();
			}

			stopMic();

			const audio = audioElementRef.current;
			audio.src = url;
			audio.play();
			setIsPlaying(true);

			audio.onended = () => {
				setIsPlaying(false);
				startMic();
			};

			if (!audioSourceRef.current) {
				audioSourceRef.current = audioContext.createMediaElementSource(audio);
				audioSourceRef.current.connect(audioContext.destination);
			}

			if (analyserRef.current && audioSourceRef.current) {
				audioSourceRef.current.connect(analyserRef.current);
			}
		},
		[startMic, stopMic, ensureAudioContext],
	);

	const stopAudio = useCallback(() => {
		if (audioElementRef.current) {
			audioElementRef.current.pause();
			audioElementRef.current.currentTime = 0;
			setIsPlaying(false);
		}

		if (audioSourceRef.current) {
			audioSourceRef.current.disconnect();
			audioSourceRef.current = null;
		}
	}, []);

	useEffect(() => {
		ensureAudioContext();
		return () => {
			stopMic();
			stopAudio();
		};
	}, [stopMic, stopAudio, ensureAudioContext]);

	return {
		mic: {
			isListening,
			volume,
			volumeArray,
			startMic,
			stopMic,
		},
		audio: {
			isPlaying,
			playAudio,
			stopAudio,
		},
	};
};
