import { Text } from "@src/components/text/Text";
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import * as S from "./EmojiFace.styles";

const statusIcons: Record<string, string> = {
	default: "😎",
	neutral: "🙂",
	happy: "😀",
	sad: "😥",
	angry: "😠",
	fearful: "😨",
	disgusted: "🤢",
	surprised: "😳",
};

export const EmojiFace = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [expression, setExpression] = useState<string>(statusIcons.default);

	useEffect(() => {
		const loadModels = async () => {
			await Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri("v/src/pages/pageHome/components/desktop/apps/EmojiFace/models/"),
				faceapi.nets.faceExpressionNet.loadFromUri("v/src/pages/pageHome/components/desktop/apps/EmojiFace/models/"),
			]);

			startVideo();
		};

		const startVideo = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: true });
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			} catch (error) {
				console.error("Error accessing webcam:", error);
			}
		};

		loadModels();
	}, []);

	useEffect(() => {
		if (!videoRef.current) return;

		const detectExpression = async () => {
			if (!videoRef.current) return;

			const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

			if (detections.length > 0) {
				const expressions = detections[0].expressions;
				const bestMatch = Object.entries(expressions).reduce((a, b) => (b[1] > a[1] ? b : a));
				setExpression(statusIcons[bestMatch[0]] || statusIcons.default);
			} else {
				setExpression(statusIcons.default);
			}
		};

		const interval = setInterval(detectExpression, 500);
		return () => clearInterval(interval);
	}, []);

	return (
		<S.EmojiFace>
			<Text variant="header">Expression: {expression}</Text>

			<video ref={videoRef} autoPlay muted playsInline style={{ width: "400px" }} />
			<S.Spacer />
		</S.EmojiFace>
	);
};
