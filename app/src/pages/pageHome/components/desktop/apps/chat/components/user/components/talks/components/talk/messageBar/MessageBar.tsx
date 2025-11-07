import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useRef, useState } from "react";
import * as S from "./MessageBar.styles";

interface Props {
	onClickSend: (content: string) => void;
}

export const MessageBar = ({ onClickSend }: Props) => {
	const [content, setContent] = useState("");
	const messageRef = useRef<HTMLTextAreaElement>(null);
	const [numberOfLineBreaks, setNumberOfLineBreaks] = useState(0);

	const handleTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setContent(e.currentTarget.value);
		setNumberOfLineBreaks((e.currentTarget.value.match(/\n/g) || []).length);
	};

	const handleOnClickSend = () => {
		onClickSend(content);
		setContent("");
		messageRef.current?.focus();
	};

	return (
		<S.MessageBar $numberOfLineBreaks={numberOfLineBreaks}>
			<S.Message ref={messageRef} value={content} onChange={handleTextChange} />
			<S.ButtonSend variant="full" onClick={handleOnClickSend}>
				<T>{lang.chat.send}</T>
			</S.ButtonSend>
		</S.MessageBar>
	);
};
