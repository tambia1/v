import { useState, useEffect } from "react";

interface Props {
	url: string;
	onMessage: (message: string) => void;
}

interface IMessage {
	content: string;
}

export const useWebSocket = ({ url, onMessage }: Props) => {
	const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onopen = () => console.log("Connected to WebSocket server");
		ws.onclose = () => console.log("Disconnected from WebSocket server");
		ws.onmessage = (event) => onMessage(event.data as string);

		setWebSocket(ws);

		return () => {
			ws?.close();
		};
	}, [url]);

	const sendMessage = (message: IMessage) => {
		if (webSocket) {
			webSocket.send(JSON.stringify(message));
		} else {
			console.error("WebSocket connection not established.");
		}
	};

	return {
		sendMessage,
	};
};
