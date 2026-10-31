import { useCallback, useEffect, useRef, useState } from "react";

export type SpeakCallbacks = {
	onSentence?: (sentence: string, durationMs: number) => void;
	onEnd?: () => void;
};

type SpeechRecognitionResultEvent = {
	results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
};

type SpeechRecognitionInstance = {
	lang: string;
	interimResults: boolean;
	continuous: boolean;
	onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
	onend: (() => void) | null;
	onerror: (() => void) | null;
	start: () => void;
	stop: () => void;
	abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const getRecognitionConstructor = () => {
	const w = window as unknown as {
		SpeechRecognition?: SpeechRecognitionConstructor;
	};

	return w.SpeechRecognition;
};

const RATE = 1;
const CHAR_DURATION = 70;

const cleanText = (text: string) => {
	return text
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/[*_#`>~|]/g, "")
		.replace(/\s+/g, " ")
		.trim();
};

const splitSentences = (text: string) => {
	return (
		text
			.match(/[^.!?]+[.!?]*/g)
			?.map((s) => s.trim())
			.filter(Boolean) ?? []
	);
};

export const useSpeech = () => {
	const [isListening, setIsListening] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
	const charDurationRef = useRef(CHAR_DURATION);

	const isSupported = !!getRecognitionConstructor() && "speechSynthesis" in window;

	const stopSpeaking = useCallback(() => {
		window.speechSynthesis.cancel();
		setIsSpeaking(false);
	}, []);

	const speak = useCallback(
		(text: string, callbacks: SpeakCallbacks = {}) => {
			stopSpeaking();

			const sentences = splitSentences(cleanText(text));

			if (sentences.length === 0) {
				return;
			}

			const voices = window.speechSynthesis.getVoices();
			const voice = voices.find((v) => v.lang.startsWith("en") && /natural|google|neural/i.test(v.name)) ?? voices.find((v) => v.lang.startsWith("en"));

			sentences.forEach((sentence, index) => {
				const utterance = new SpeechSynthesisUtterance(sentence);
				utterance.rate = RATE;

				if (voice) {
					utterance.voice = voice;
				}

				let startTime = 0;

				utterance.onstart = () => {
					startTime = performance.now();
					setIsSpeaking(true);
					callbacks.onSentence?.(sentence, (sentence.length * charDurationRef.current) / RATE);
				};

				utterance.onend = () => {
					const elapsed = performance.now() - startTime;

					if (startTime && elapsed > 200) {
						charDurationRef.current = charDurationRef.current * 0.5 + ((elapsed * RATE) / sentence.length) * 0.5;
					}

					if (index === sentences.length - 1) {
						setIsSpeaking(false);
						callbacks.onEnd?.();
					}
				};

				utterance.onerror = () => {
					if (index === sentences.length - 1) {
						setIsSpeaking(false);
						callbacks.onEnd?.();
					}
				};

				window.speechSynthesis.speak(utterance);
			});
		},
		[stopSpeaking],
	);

	const stopListening = useCallback(() => {
		recognitionRef.current?.stop();
	}, []);

	const listen = useCallback(
		(onResult: (text: string) => void) => {
			const Recognition = getRecognitionConstructor();

			if (!Recognition) {
				return;
			}

			stopSpeaking();
			recognitionRef.current?.abort();

			const recognition = new Recognition();
			recognition.lang = navigator.language || "en-US";
			recognition.interimResults = false;
			recognition.continuous = false;

			recognition.onresult = (event) => {
				const transcript = Array.from(event.results)
					.map((result) => result[0].transcript)
					.join(" ")
					.trim();

				if (transcript) {
					onResult(transcript);
				}
			};

			recognition.onend = () => {
				setIsListening(false);
				recognitionRef.current = null;
			};

			recognition.onerror = recognition.onend;

			recognitionRef.current = recognition;
			setIsListening(true);
			recognition.start();
		},
		[stopSpeaking],
	);

	useEffect(() => {
		window.speechSynthesis?.getVoices();

		return () => {
			recognitionRef.current?.abort();
			window.speechSynthesis?.cancel();
		};
	}, []);

	return { isSupported, isListening, isSpeaking, listen, stopListening, speak, stopSpeaking };
};
