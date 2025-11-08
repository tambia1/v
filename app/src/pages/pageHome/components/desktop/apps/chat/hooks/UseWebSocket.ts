import { useEffect, useRef } from "react";

type Props = {
	url: string;
	onOpen?: (event: Event) => void;
	onClose?: (event: CloseEvent) => void;
	onError?: (event: Event) => void;
	onMessage?: (event: MessageEvent) => void;
};

export const useWebSocket = ({ url, onMessage, onOpen, onClose, onError }: Props) => {
	const refWs = useRef<WebSocket>(null);

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onopen = (event: Event) => {
			console.log("WebSocket open", event);
			onOpen?.(event);
		};

		ws.onclose = (event: CloseEvent) => {
			console.log("WebSocket close", event);
			onClose?.(event);
		};

		ws.onerror = (event: Event) => {
			console.log("WebSocket error: ", event);
			onError?.(event);
		};

		ws.onmessage = (event: MessageEvent) => {
			console.log("WebSocket message: ", event);
			onMessage?.(event);
		};

		refWs.current = ws;

		return () => {
			ws?.close();
		};
	}, [url, onOpen, onClose, onError, onMessage]);

	const sendMessage = (message: string) => {
		if (refWs.current) {
			refWs.current.send(message);
		} else {
			console.error("WebSocket connection not established.");
		}
	};

	return {
		sendMessage,
	};
};
