import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useState } from "react";
import * as S from "./NameBar.styles";

interface Props {
	name: string;
	onClickSet: (content: string) => void;
}

export const NameBar = ({ name, onClickSet }: Props) => {
	const [content, setContent] = useState<string>(name);

	const handleTextChange = (value: string) => {
		setContent(value);
	};

	return (
		<S.NameBar>
			<S.InputName value={content} onTextChange={handleTextChange} />
			<S.ButtonSet variant="styled" onClick={() => onClickSet(content)}>
				<T>{lang.chat.set}</T>
			</S.ButtonSet>
		</S.NameBar>
	);
};
