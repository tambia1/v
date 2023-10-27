import { useLanguage } from "@src/language/UseLanguage";

interface Props {
	children: string;
}

export const Lang = ({ children }: Props) => {
	const { language, getText } = useLanguage();

	return <span key={language.languageName}>{children.charAt(0) === "." ? getText(children) : children}</span>;
};
