import { Button } from "@src/components/button/Button";
import { Input } from "@src/components/input/Input";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useState } from "react";
import * as S from "./TestAi.styles";

export const TestAi = () => {
	const [inputValue, setInputValue] = useState("");
	const [textAreaValue, setTextAreaValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setTextAreaValue(e.currentTarget.value);
	};

	const handleSendClick = () => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			setInputValue("");
		}, 2000);
	};

	return (
		<S.TestAi>
			<Text variant="title">
				<T>{lang.testAi.title}</T>
			</Text>

			<S.Col>
				<Text variant="body">Message</Text>

				<S.Row>
					<Input value={inputValue} onTextChange={handleInputChange} placeholder="" />

					<Button variant="styled" onClick={handleSendClick} disabled={isLoading}>
						Send
					</Button>

					<S.LoaderContainer $isVisible={isLoading}>
						<Loader />
					</S.LoaderContainer>
				</S.Row>

				<S.TextArea value={textAreaValue} onChange={handleTextAreaChange} placeholder="" rows={4} />
			</S.Col>
		</S.TestAi>
	);
};
