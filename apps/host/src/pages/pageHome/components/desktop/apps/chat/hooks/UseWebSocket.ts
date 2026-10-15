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
	const onMessageRef = useRef(onMessage);
	const onOpenRef = useRef(onOpen);
	const onCloseRef = useRef(onClose);
	const onErrorRef = useRef(onError);

	// Update refs when callbacks change, but don't trigger reconnection
	useEffect(() => {
		onMessageRef.current = onMessage;
		onOpenRef.current = onOpen;
		onCloseRef.current = onClose;
		onErrorRef.current = onError;
	}, [onMessage, onOpen, onClose, onError]);

	useEffect(() => {
		const ws = new WebSocket(url);

		ws.onopen = (event: Event) => {
			console.log("WebSocket open", event);
			onOpenRef.current?.(event);
		};

		ws.onclose = (event: CloseEvent) => {
			console.log("WebSocket close", event);
			onCloseRef.current?.(event);
		};

		ws.onerror = (event: Event) => {
			console.log("WebSocket error: ", event);
			onErrorRef.current?.(event);
		};

		ws.onmessage = (event: MessageEvent) => {
			console.log("WebSocket message: ", event);
			onMessageRef.current?.(event);
		};

		refWs.current = ws;

		return () => {
			ws?.close();
		};
	}, [url]);

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
