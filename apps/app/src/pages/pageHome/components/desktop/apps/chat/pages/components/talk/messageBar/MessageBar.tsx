import { T } from "@src/locales/T";
import * as S from "./MessageBar.styles";
import { Button } from "@src/components/button/Button";
import { useState } from "react";

interface Props {
	onClickSend: (content: string) => void;
}

export const MessageBar = ({ onClickSend }: Props) => {
	const [content, setContent] = useState<string>("");

	const handleTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setContent(e.currentTarget.value);
	};

	return (
		<S.MessageBar>
			<S.Message onChange={handleTextChange} />
			<Button variant="full" onClick={() => onClickSend(content)}>
				<T>Send</T>
			</Button>
		</S.MessageBar>
	);
};
