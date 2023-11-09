import { useLanguage } from "@src/language/UseLanguage";

interface Props {
	children: string;
	replacer?: (str: string) => string;
}

export const Lang = ({ children, replacer }: Props) => {
	const { getText } = useLanguage();

	return <>{!replacer ? getText(children) : replacer(getText(children))}</>;
};
