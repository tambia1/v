import * as S from "./Camera.styles";
import { useRef, useState } from "react";
import { Icon } from "@src/icons/Icon";
import { useTheme } from "styled-components";

export const Camera = () => {
	const theme = useTheme();
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const [cameraState, setCameraState] = useState<"play" | "pause">("pause");
	const refVideo = useRef<HTMLVideoElement>(null);
	const refImg = useRef<HTMLImageElement>(null);

	const handleCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: false,
				video: {},
			});

			if (refVideo.current) {
				refVideo.current.srcObject = stream;

				const adjustImageSize = () => {
					if (!refVideo.current || !refImg.current) {
						return;
					}

					const containerWidth = refVideo.current.clientWidth;
					const containerHeight = refVideo.current.clientHeight;

					if (containerWidth / containerHeight > refImg.current.naturalWidth / refImg.current.naturalHeight) {
						refImg.current.style.width = containerWidth + "px";
						refImg.current.style.height = "auto";
					} else {
						refImg.current.style.width = "auto";
						refImg.current.style.height = containerHeight + "px";
					}
				};

				if (refVideo.current && refImg.current) {
					refImg.current.addEventListener("resize", adjustImageSize);
					adjustImageSize();
				}

				setCapturedImage(null);

				setCameraState("play");
			}
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
			<S.Video ref={refVideo} autoPlay playsInline />
			<S.ImageContainer>
				<S.Image ref={refImg} src={capturedImage ? capturedImage : ""} alt="Captured" />
			</S.ImageContainer>

			<S.Buttons>
				{cameraState === "pause" && <Icon iconName="iconPlayCircle" size={theme.size.xl} onClick={handleCamera} />}
				{cameraState === "play" && <Icon iconName="iconPauseCircle" size={theme.size.xl} onClick={handleCapture} />}
			</S.Buttons>
		</S.Camera>
	);
};
