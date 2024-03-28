import * as S from "./Camera.styles";
import { useRef, useState } from "react";
import { Icon } from "@src/icons/Icon";
import { useTheme } from "styled-components";
import { Loader } from "@src/components/loader/Loader";

export const Camera = () => {
	const theme = useTheme();
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const [cameraState, setCameraState] = useState<"play" | "pause">("pause");
	const [isLoading, setIsLoading] = useState(false);
	const refVideo = useRef<HTMLVideoElement>(null);
	const refImg = useRef<HTMLImageElement>(null);

	const handleCamera = async () => {
		try {
			setIsLoading(true);
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {},
			});

			if (refVideo.current) {
				refVideo.current.srcObject = stream;

				setCapturedImage(null);
				setCameraState("play");
			}

			setIsLoading(false);
		} catch (error) {
			console.error("Error accessing camera:", error);
		}
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
					<Loader size="xl" />
				</S.Loader>
			)}

			<S.Video ref={refVideo} autoPlay playsInline />
			<S.Image ref={refImg} $image={capturedImage ? capturedImage : ""} />

			<S.Buttons>
				{cameraState === "play" && <Icon iconName="iconPauseCircle" size={theme.size.xl} onClick={handleCapture} />}
				{cameraState === "pause" && <Icon iconName="iconPlayCircle" size={theme.size.xl} onClick={handleCamera} />}
				{cameraState === "pause" && capturedImage && <Icon iconName="iconSave" size={theme.size.xl} onClick={handleCamera} />}
			</S.Buttons>
		</S.Camera>
	);
};
