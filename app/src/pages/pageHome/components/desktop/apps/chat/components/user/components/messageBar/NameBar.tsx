import { T } from "@src/locales/T";
import * as S from "./NameBar.styles";
import { useState } from "react";
import { lang } from "@src/locales/i18n";

interface Props {
	name: string;
	onClickSet: (content: string) => void;
}

export const NameBar = ({ name, onClickSet }: Props) => {
	const [content, setContent] = useState<string>(name);

	const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
		setContent(e.currentTarget.value);
	};

	return (
		<S.NameBar>
			<S.Name value={content} onChange={handleTextChange} />
			<S.ButtonSet variant="full" onClick={() => onClickSet(content)}>
				<T>{lang.chat.set}</T>
			</S.ButtonSet>
		</S.NameBar>
	);
};
