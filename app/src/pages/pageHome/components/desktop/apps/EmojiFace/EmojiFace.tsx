import { Text } from "@src/components/text/Text";
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import * as S from "./EmojiFace.styles";

const statusIcons: { [K: string]: string } = {
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
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [emotion, setEmotion] = useState<string>("");
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
			if (!videoRef.current || !canvasRef.current) return;

			const canvas = canvasRef.current;
			const video = videoRef.current;
			const displaySize = { width: video.width, height: video.height };
			faceapi.matchDimensions(canvas, displaySize);

			setInterval(async () => {
				const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

				if (detections.length > 0) {
					const expressions = detections[0].expressions;
					const maxEmotion = (Object.keys(expressions) as Array<keyof faceapi.FaceExpressions>).reduce((a, b) => (expressions[a] > expressions[b] ? a : b));

					setEmotion(maxEmotion);
					setExpression(statusIcons[maxEmotion] || statusIcons.default);
				} else {
					setExpression(statusIcons.default);
				}

				const resizedDetections = faceapi.resizeResults(detections, displaySize);
				canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
				faceapi.draw.drawDetections(canvas, resizedDetections);
				faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
			}, 500);
		};

		const interval = setInterval(detectExpression, 500);
		return () => clearInterval(interval);
	}, []);

	return (
		<S.EmojiFace>
			<Text variant="header">
				Expression: {emotion} {expression}
			</Text>

			<video ref={videoRef} autoPlay muted playsInline width="640" height="480" style={{ width: "640px", height: "480px" }} />
			<canvas ref={canvasRef} width="640" height="480" />
			<S.Spacer />
		</S.EmojiFace>
	);
};
