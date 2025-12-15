import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./NightVision.styles";

type CameraFacingMode = "user" | "environment";

export const NightVision = () => {
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const [cameraState, setCameraState] = useState<"play" | "pause">("pause");
	const [isLoading, setIsLoading] = useState(false);
	const refVideo = useRef<HTMLVideoElement>(null);
	const refCanvas = useRef<HTMLCanvasElement>(null);
	const refImg = useRef<HTMLImageElement>(null);
	const [cameraFacingMode, setCameraFacingMode] = useState<CameraFacingMode>("environment");
	const animationFrameRef = useRef<number | null>(null);

	const applyNightVisionEffect = useCallback(() => {
		const video = refVideo.current;
		const canvas = refCanvas.current;
		if (!video || !canvas || video.paused || video.ended) return;

		const ctx = canvas.getContext("2d", { willReadFrequently: true });
		if (!ctx) return;

		canvas.width = video.videoWidth || 640;
		canvas.height = video.videoHeight || 480;

		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];

			// Calculate brightness with enhanced sensitivity for low light
			const brightness = r * 0.299 + g * 0.587 + b * 0.114;

			// Amplify brightness for low-light enhancement (gamma correction)
			const amplified = (brightness / 255) ** 0.6 * 255;

			// Apply green night vision tint
			data[i] = Math.min(255, amplified * 0.2); // Red - minimal
			data[i + 1] = Math.min(255, amplified * 1.2); // Green - enhanced
			data[i + 2] = Math.min(255, amplified * 0.2); // Blue - minimal
		}

		ctx.putImageData(imageData, 0, 0);
		animationFrameRef.current = requestAnimationFrame(applyNightVisionEffect);
	}, []);

	const getCameraStream = async (cameraFacingMode: CameraFacingMode) => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {
					facingMode: cameraFacingMode,
				},
			});

			if (refVideo.current) {
				refVideo.current.srcObject = stream;
				refVideo.current.onloadedmetadata = () => {
					refVideo.current?.play();
					applyNightVisionEffect();
				};

				setCapturedImage(null);
				setCameraState("play");
			}
		} catch (error) {
			console.error("Error accessing camera:", error);
		}
	};

	const handleCamera = async () => {
		setIsLoading(true);
		await getCameraStream(cameraFacingMode);
		setIsLoading(false);
	};

	const handleCameraFace = async () => {
		const newCameraFacingMode = cameraFacingMode === "user" ? "environment" : "user";
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
		setCameraFacingMode(newCameraFacingMode);
		await getCameraStream(newCameraFacingMode);
	};

	const handleCapture = () => {
		if (refCanvas.current) {
			const imageUrl = refCanvas.current.toDataURL("image/png");
			setCapturedImage(imageUrl);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			setCameraState("pause");
		}
	};

	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, []);

	return (
		<S.NightVision>
			{isLoading && (
				<S.Loader>
					<Loader size="size500" />
				</S.Loader>
			)}

			<S.Video ref={refVideo} autoPlay playsInline muted />
			<S.Canvas ref={refCanvas} />
			<S.Image ref={refImg} $image={capturedImage ? capturedImage : ""} />

			<S.Buttons>
				{cameraState === "play" && <Icon iconName="iconPauseCircle" size="size500" onClick={handleCapture} />}
				{cameraState === "play" && <Icon iconName="iconRefreshCw" size="size500" onClick={handleCameraFace} />}
				{cameraState === "pause" && <Icon iconName="iconPlayCircle" size="size500" onClick={handleCamera} />}
				{cameraState === "pause" && capturedImage && <Icon iconName="iconSave" size="size500" onClick={handleCamera} />}
			</S.Buttons>
		</S.NightVision>
	);
};
