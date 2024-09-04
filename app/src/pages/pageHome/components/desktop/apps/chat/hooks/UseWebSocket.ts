import { useEffect, useRef } from "react";
import { IDataGet, IDataSend } from "../Chat.types";

interface Props {
	url: string;
	onOpen?: () => void;
	onClose?: () => void;
	onError?: (event: Event) => void;
	onMessage: (data: IDataGet) => void;
}

export const useWebSocket = ({ url, onMessage, onOpen, onClose, onError }: Props) => {
	const refWs = useRef<WebSocket>();

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onopen = () => () => {
			console.log("Connected to WebSocket server");
			onOpen?.();
		};

		ws.onclose = () => {
			console.log("Disconnected from WebSocket server");
			onClose?.();
		};

		ws.onerror = (event) => {
			console.log("Error connecting WebSocket server: ", event);
			onError?.(event);
		};

		ws.onmessage = (event) => onMessage(JSON.parse(event.data as string));

		refWs.current = ws;

		return () => {
			ws?.close();
		};
	}, [url]);

	const sendMessage = (data: IDataSend) => {
		if (refWs.current) {
			refWs.current.send(JSON.stringify(data));
		} else {
			console.error("WebSocket connection not established.");
		}
	};

	return {
		sendMessage,
	};
};
