import { T } from "@src/locales/T";
import * as S from "./MessageBar.styles";
import { Button } from "@src/components/button/Button";
import { useRef, useState } from "react";
import { lang } from "@src/locales/i18n";

interface Props {
	onClickSend: (content: string) => void;
}

export const MessageBar = ({ onClickSend }: Props) => {
	const [content, setContent] = useState<string>("");
	const messageRef = useRef<HTMLTextAreaElement>(null);

	const handleTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setContent(e.currentTarget.value);
	};

	const handleOnClickSend = () => {
		onClickSend(content);
		setContent("");
		messageRef.current?.focus();
	};

	return (
		<S.MessageBar>
			<S.Message ref={messageRef} value={content} onChange={handleTextChange} />
			<Button variant="full" onClick={handleOnClickSend}>
				<T>{lang.chat.send}</T>
			</Button>
		</S.MessageBar>
	);
};
