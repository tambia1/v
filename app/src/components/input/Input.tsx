import * as S from "./Input.styles";
import { useState } from "react";

interface Props {
	value: string;
	onTextChange: (content: string) => void;
}

export const Input = ({ value, onTextChange }: Props) => {
	const [content, setContent] = useState<string>(value);

	const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
		setContent(e.currentTarget.value);
		onTextChange(e.currentTarget.value);
	};

	return <S.Input value={content} onChange={handleTextChange} />;
};
