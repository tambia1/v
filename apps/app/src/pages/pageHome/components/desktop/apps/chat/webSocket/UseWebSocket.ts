import { useEffect, useRef } from "react";
import { IMessage } from "../Chat.types";

interface Props {
	url: string;
	onMessage: (message: string) => void;
}

export const useWebSocket = ({ url, onMessage }: Props) => {
	const refWs = useRef<WebSocket>();

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onopen = () => console.log("Connected to WebSocket server");
		ws.onclose = () => console.log("Disconnected from WebSocket server");
		ws.onmessage = (event) => onMessage(event.data as string);

		refWs.current = ws;

		return () => {
			ws?.close();
		};
	}, [url]);

	const sendMessage = (message: IMessage) => {
		if (refWs.current) {
			refWs.current.send(JSON.stringify(message));
		} else {
			console.error("WebSocket connection not established.");
		}
	};

	return {
		sendMessage,
	};
};
