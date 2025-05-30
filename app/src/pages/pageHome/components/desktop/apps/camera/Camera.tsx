import { Icon } from "@src/components/icon/Icon";
import { Loader } from "@src/components/loader/Loader";
import { useRef, useState } from "react";
import * as S from "./Camera.styles";

type CameraFacingMode = "user" | "environment";

export const Camera = () => {
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const [cameraState, setCameraState] = useState<"play" | "pause">("pause");
	const [isLoading, setIsLoading] = useState(false);
	const refVideo = useRef<HTMLVideoElement>(null);
	const refImg = useRef<HTMLImageElement>(null);
	const [cameraFacingMode, setCameraFacingMode] = useState<CameraFacingMode>("environment");

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

		setCameraFacingMode(newCameraFacingMode);
		await getCameraStream(newCameraFacingMode);
	};

	const handleCapture = () => {
		if (refVideo.current) {
			const canvas = document.createElement("canvas");
			canvas.width = refVideo.current.videoWidth;
			canvas.height = refVideo.current.videoHeight;

			const context = canvas.getContext("2d");

			if (context) {
				context.drawImage(refVideo.current, 0, 0, refVideo.current.videoWidth, refVideo.current.videoHeight);
				const imageUrl = canvas.toDataURL("image/png");
				setCapturedImage(imageUrl);
			}

			setCameraState("pause");
		}
	};

	return (
		<S.Camera>
			{isLoading && (
				<S.Loader>
					<Loader size="size500" />
				</S.Loader>
			)}

			<S.Video ref={refVideo} autoPlay playsInline />
			<S.Image ref={refImg} $image={capturedImage ? capturedImage : ""} />

			<S.Buttons>
				{cameraState === "play" && <Icon iconName="iconPauseCircle" size="size500" onClick={handleCapture} />}
				{cameraState === "play" && <Icon iconName="iconRefreshCw" size="size500" onClick={handleCameraFace} />}
				{cameraState === "pause" && <Icon iconName="iconPlayCircle" size="size500" onClick={handleCamera} />}
				{cameraState === "pause" && capturedImage && <Icon iconName="iconSave" size="size500" onClick={handleCamera} />}
			</S.Buttons>
		</S.Camera>
	);
};
