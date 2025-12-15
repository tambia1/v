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

	// Slider states
	const [brightness, setBrightness] = useState(0.5);
	const [amplified, setAmplified] = useState(0.6);
	const [redChannel, setRedChannel] = useState(0.2);
	const [greenChannel, setGreenChannel] = useState(1.0);
	const [blueChannel, setBlueChannel] = useState(0.2);
	const [showSliders, setShowSliders] = useState(false);

	// Use refs to access current slider values in the animation callback
	const slidersRef = useRef({ brightness, amplified, redChannel, greenChannel, blueChannel });
	useEffect(() => {
		slidersRef.current = { brightness, amplified, redChannel, greenChannel, blueChannel };
	}, [brightness, amplified, redChannel, greenChannel, blueChannel]);

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

		const { brightness: br, amplified: amp, redChannel: r, greenChannel: g, blueChannel: b } = slidersRef.current;
		const brightnessMultiplier = br * 2; // 0 to 2 range

		for (let i = 0; i < data.length; i += 4) {
			const red = data[i];
			const green = data[i + 1];
			const blue = data[i + 2];

			// Calculate brightness with enhanced sensitivity for low light
			const pixelBrightness = (red * 0.299 + green * 0.587 + blue * 0.114) * brightnessMultiplier;

			// Amplify brightness for low-light enhancement (gamma correction)
			const amplifiedValue = (pixelBrightness / 255) ** amp * 255;

			// Apply night vision tint with adjustable channels
			data[i + 0] = Math.min(255, amplifiedValue * r);
			data[i + 1] = Math.min(255, amplifiedValue * g);
			data[i + 2] = Math.min(255, amplifiedValue * b);
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

	const handleToggleSliders = () => {
		setShowSliders(!showSliders);
	};

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

			<S.Sliders $visible={showSliders}>
				<S.SliderRow>
					<S.SliderLabel variant="note">Brightness</S.SliderLabel>
					<S.SliderStyled value={brightness} onChange={setBrightness} />
				</S.SliderRow>
				<S.SliderRow>
					<S.SliderLabel variant="note">Amplified</S.SliderLabel>
					<S.SliderStyled value={amplified} onChange={setAmplified} />
				</S.SliderRow>
				<S.SliderRow>
					<S.SliderLabel variant="note">Red</S.SliderLabel>
					<S.SliderStyled value={redChannel} onChange={setRedChannel} />
				</S.SliderRow>
				<S.SliderRow>
					<S.SliderLabel variant="note">Green</S.SliderLabel>
					<S.SliderStyled value={greenChannel} onChange={setGreenChannel} />
				</S.SliderRow>
				<S.SliderRow>
					<S.SliderLabel variant="note">Blue</S.SliderLabel>
					<S.SliderStyled value={blueChannel} onChange={setBlueChannel} />
				</S.SliderRow>
			</S.Sliders>

			<S.Buttons>
				{cameraState === "play" && <Icon iconName="iconPauseCircle" size="size500" onClick={handleCapture} />}
				{cameraState === "play" && <Icon iconName="iconRefreshCw" size="size500" onClick={handleCameraFace} />}
				{cameraState === "play" && <Icon iconName="iconSliders" size="size500" onClick={handleToggleSliders} />}
				{cameraState === "pause" && <Icon iconName="iconPlayCircle" size="size500" onClick={handleCamera} />}
				{cameraState === "pause" && capturedImage && <Icon iconName="iconSave" size="size500" onClick={handleCamera} />}
			</S.Buttons>
		</S.NightVision>
	);
};
