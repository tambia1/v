import { useLanguage } from "@src/language/UseLanguage";

interface Props {
	children: string;
}

export const Lang = ({ children }: Props) => {
	const { getText } = useLanguage();

	return <>{getText(children)}</>;
};
