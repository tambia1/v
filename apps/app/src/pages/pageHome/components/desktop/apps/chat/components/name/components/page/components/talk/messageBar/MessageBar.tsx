import { T } from "@src/locales/T";
import * as S from "./MessageBar.styles";
import { Button } from "@src/components/button/Button";
import { useState } from "react";
import { lang } from "@src/locales/i18n";

interface Props {
	message: string;
	onClickSend: (content: string) => void;
}

export const MessageBar = ({ message, onClickSend }: Props) => {
	const [content, setContent] = useState<string>(message);

	const handleTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setContent(e.currentTarget.value);
	};

	const handleOnClickSend = () => {
		onClickSend(content);
		setContent("");
	};

	return (
		<S.MessageBar>
			<S.Message onChange={handleTextChange} />
			<Button variant="full" onClick={handleOnClickSend}>
				<T>{lang.chat.send}</T>
			</Button>
		</S.MessageBar>
	);
};
