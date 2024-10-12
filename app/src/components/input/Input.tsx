import { useState } from "react";
import * as S from "./Input.styles";

interface Props {
	className?: string;
	value: string;
	onTextChange: (content: string) => void;
}

export const Input = ({ className, value, onTextChange }: Props) => {
	const [content, setContent] = useState<string>(value);

	const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
		setContent(e.currentTarget.value);
		onTextChange(e.currentTarget.value);
	};

	return <S.Input className={className} value={content} onChange={handleTextChange} />;
};
