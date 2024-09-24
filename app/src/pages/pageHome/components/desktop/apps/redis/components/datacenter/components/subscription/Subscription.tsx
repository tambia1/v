import * as S from "./Subscription.styles";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";

type Props = {
	subscriptionId: number;
};

export const Subscription = ({ subscriptionId }: Props) => {
	const { t } = useTranslation();

	return (
		<S.Subscription>
			<Text size="l">{t(lang.redis.subscription.title)}</Text>

			<S.Spacer />
			<Text size="m">subscription id {subscriptionId}</Text>
		</S.Subscription>
	);
};
