import { useState } from "react";
import * as S from "./Input.styles";

export interface Props {
	className?: string;
	value: string;
	placeholder?: string;
	onTextChange: (content: string) => void;
	disabled?: boolean;
}

export const Input = ({ className, value, placeholder, onTextChange, disabled }: Props) => {
	const [content, setContent] = useState<string>(value);

	const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
		setContent(e.currentTarget.value);
		onTextChange(e.currentTarget.value);
	};

	return <S.Input className={className} value={content} placeholder={placeholder} onChange={handleTextChange} type="text" disabled={disabled} />;
};
