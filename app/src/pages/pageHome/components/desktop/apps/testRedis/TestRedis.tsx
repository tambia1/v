import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useState } from "react";
import * as S from "./TestRedis.styles";

export const TestRedis = () => {
	const [message, setMessage] = useState("");

	const handleOnClickSetKey = async () => {
		try {
			setMessage("Sending message...");
			const response = await fetch("http://localhost:5004/setRedisKey?value=Jim");
			const data = await response.json();
			setMessage(`Message received: ${data.message}`);
		} catch (error) {
			setMessage(`Error setting firstName in Redis: ${error}`);
		}
	};

	const handleOnClickGetKey = async () => {
		try {
			setMessage("Getting message...");
			const response = await fetch("http://localhost:5004/getRedisKey");
			const data = await response.json();
			setMessage(`Message received: ${data.value}`);
		} catch (error) {
			setMessage(`Error getting firstName in Redis: ${error}`);
		}
	};

	return (
		<S.TestRedis>
			<Text variant="header">
				<T>{lang.testRedis.title}</T>
			</Text>

			<S.Spacer />

			<Button onClick={handleOnClickSetKey}>Set key firstName</Button>
			<Button onClick={handleOnClickGetKey}>Get key firstName</Button>

			<Text>{message}</Text>
		</S.TestRedis>
	);
};
