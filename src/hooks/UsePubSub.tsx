import { useEffect, useRef } from "react";

export const usePubSub = <T = string,>() => {
	type SubscriberCallback = (args: T) => void;

	const subscribers: { [key: string]: React.MutableRefObject<SubscriberCallback> } = {};

	const subscribe = function (subscriberName: string, subscriberCallback: SubscriberCallback) {
		unsubscribe(subscriberName);

		const callback = useRef<SubscriberCallback>(subscriberCallback);

		useEffect(() => {
			callback.current = subscriberCallback;
		}, [callback]);

		subscribers[subscriberName] = callback;
	};

	const unsubscribe = function (subscriberName: string) {
		delete subscribers[subscriberName];
	};

	const publish = function (args: T) {
		for (const k in subscribers) {
			subscribers[k].current(args);
		}
	};

	return { subscribe, unsubscribe, publish };
};
