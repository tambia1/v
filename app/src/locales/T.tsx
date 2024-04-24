import { useTranslation } from "react-i18next";

interface Props {
	children: string;
}

export const T = ({ children }: Props) => {
	const { t } = useTranslation();

	return <>{t(children)}</>;
};
