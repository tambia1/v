import { Button } from "@src/components/button/Button";
import * as S from "./Camera.styles";
import { Text } from "@src/components/text/Text";
import { useRef, useState } from "react";

export const Camera = () => {
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleTakePicture = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: false });
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		} catch (error) {
			console.error("Error accessing camera:", error);
		}
	};

	const handleCapture = () => {
		if (videoRef.current) {
			const canvas = document.createElement("canvas");
			canvas.width = videoRef.current.videoWidth;
			canvas.height = videoRef.current.videoHeight;
			const context = canvas.getContext("2d");
			if (context) {
				context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
				const imageUrl = canvas.toDataURL("image/png");
				setCapturedImage(imageUrl);
			}
		}
	};

	return (
		<S.Camera>
			<Button onClick={handleTakePicture}>Start Camera</Button>
			<Button onClick={handleCapture}>Take Picture</Button>
			<Text>Picture:</Text>
			<S.Image src={capturedImage ? capturedImage : ""} alt="Captured" />
			<video ref={videoRef} autoPlay muted style={{ display: capturedImage ? "none" : "block" }} />
		</S.Camera>
	);
};
