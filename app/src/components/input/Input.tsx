import type { InputHTMLAttributes } from "react";
import * as S from "./Input.styles";

export type Props = InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
	value: string;
	placeholder?: string;
	onTextChange: (content: string) => void;
	disabled?: boolean;
};

export const Input = ({ className, value, placeholder, onTextChange, disabled, ...rest }: Props) => {
	const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
		onTextChange(e.currentTarget.value);
	};

	return <S.Input className={className} value={value} placeholder={placeholder} onChange={handleTextChange} type="text" disabled={disabled} {...rest} />;
};
