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
	const [mcpMode, _setMcpMode] = useState<"tool" | "resource" | "prompt">("tool");
	const [selectedTool, _setSelectedTool] = useState<"ai_chat" | "generate_code">("ai_chat");

	const handleInputChange = (value: string) => {
		setInputValue(value);
	};

	const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setTextAreaValue(e.currentTarget.value);
	};

	const handleSendClick = async () => {
		if (!inputValue.trim()) {
			return;
		}

		setIsLoading(true);
		setTextAreaValue("");
		setInputValue("");
		setIsLoading(false);
	};

	return (
		<S.TestAi>
			<Text variant="title">
				<T>{lang.testAi.title}</T>
			</Text>

			<S.Col>
				<S.Row>
					<Input
						value={inputValue}
						onTextChange={handleInputChange}
						onPressEnter={handleSendClick}
						placeholder={
							mcpMode === "tool"
								? selectedTool === "ai_chat"
									? "Ask the AI anything..."
									: "Describe the code you want to generate..."
								: mcpMode === "resource"
									? "Enter a name for greeting..."
									: "Enter a message for prompt..."
						}
						disabled={isLoading}
					/>

					<Button variant="styled" onClick={handleSendClick} disabled={isLoading}>
						Send
					</Button>

					<S.LoaderContainer $isVisible={isLoading}>
						<Loader />
					</S.LoaderContainer>
				</S.Row>

				<S.TextArea value={textAreaValue} onChange={handleTextAreaChange} placeholder="MCP responses will appear here..." rows={8} readOnly />
			</S.Col>
		</S.TestAi>
	);
};
