import { Button } from "@src/components/button/Button";
import * as S from "./Camera.styles";
import { useRef } from "react";

export const Camera = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		} catch (error) {
			console.error("Error accessing camera:", error);
		}
	};

	const captureImage = () => {
		const video = videoRef.current;
		const canvas = canvasRef.current;

		if (video && canvas) {
			const context = canvas.getContext("2d");
			context?.drawImage(video, 0, 0, canvas.width, canvas.height);

			// Convert the canvas content to a data URL representing a PNG image
			const dataUrl = canvas.toDataURL("image/png");
			console.log("Captured image:", dataUrl);

			// Stop video tracks to release the camera
			const tracks = video.srcObject instanceof MediaStream && video.srcObject.getTracks();
			if (tracks) {
				tracks.forEach((track) => track.stop());
			}

			// Clear the video stream from the video element
			if (video.srcObject) {
				// Check if getTracks method exists before calling it
				if (video.srcObject instanceof MediaStream && "getTracks" in video.srcObject) {
					const tracks = video.srcObject.getTracks();
					tracks.forEach((track) => track.stop());
				}

				video.srcObject = null;
			}
		}
	};

	return (
		<S.Camera>
			<Button onClick={startCamera}>Take Picture</Button>
			<canvas ref={canvasRef} style={{ display: "none" }} width="400" height="300"></canvas>
			<Button onClick={captureImage}>Take Picture 1</Button>
		</S.Camera>
	);
};
