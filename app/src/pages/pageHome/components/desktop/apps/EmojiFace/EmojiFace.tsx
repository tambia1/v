import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import * as S from "./EmojiFace.styles";

const statusIcons: { [K: string]: string } = {
	default: "😶",
	neutral: "🙂",
	happy: "😀",
	sad: "😥",
	angry: "😠",
	fearful: "😨",
	disgusted: "🤢",
	surprised: "😳",
};

type CameraFacingMode = "user" | "environment";

export const EmojiFace = () => {
	const [_cameraState, setCameraState] = useState<"play" | "pause">("pause");
	const [isLoading, setIsLoading] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [emotion, setEmotion] = useState("");
	const [expression, setExpression] = useState(statusIcons.default);

	const [timeoutInterval, setTimeoutInterval] = useState<NodeJS.Timeout>();

	useEffect(() => {
		const loadModels = async () => {
			setIsLoading(true);

			await Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri(
					"https://raw.githubusercontent.com/tambia1/v/refs/heads/main/app/src/pages/pageHome/components/desktop/apps/EmojiFace/models/",
				),
				faceapi.nets.faceExpressionNet.loadFromUri(
					"https://raw.githubusercontent.com/tambia1/v/refs/heads/main/app/src/pages/pageHome/components/desktop/apps/EmojiFace/models/",
				),
			]);

			setIsLoading(false);
			startScan();
		};

		loadModels();
	}, []);

	useEffect(() => {
		return () => {
			clearInterval(timeoutInterval);
		};
	}, [timeoutInterval]);

	const getCameraStream = async (cameraFacingMode: CameraFacingMode) => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: cameraFacingMode,
				},
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;

				setCameraState("play");
			}
		} catch (error) {
			console.error("Error accessing camera:", error);
		}
	};

	const startScan = async () => {
		setIsLoading(true);
		await getCameraStream("user");
		setIsLoading(false);

		if (!videoRef.current) {
			return;
		}

		const detectExpression = async () => {
			if (!videoRef.current || !canvasRef.current) {
				return;
			}

			const canvas = canvasRef.current;
			const video = videoRef.current;
			const displaySize = { width: video.width, height: video.height };
			faceapi.matchDimensions(canvas, displaySize);

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
		};

		const interval = setInterval(detectExpression, 500);
		setTimeoutInterval(interval);
	};

	return (
		<S.EmojiFace>
			<S.Video ref={videoRef} autoPlay playsInline />
			<S.Canvas ref={canvasRef} />

			<S.Container>
				{isLoading && (
					<S.Loader>
						<Loader size="size500" color="primary100" />
					</S.Loader>
				)}

				<Text variant="title">
					{expression} {emotion}
				</Text>
			</S.Container>
		</S.EmojiFace>
	);
};
