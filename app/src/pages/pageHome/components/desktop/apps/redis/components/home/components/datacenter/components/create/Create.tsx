import { Button } from "@src/components/button/Button";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useTranslation } from "react-i18next";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Create.styles";

export const Create = () => {
	const { t } = useTranslation();

	const storeUser = StoreUser();

	console.log(storeUser.csrf);

	const handleCreateDb1 = () => {
		const payload = {
			bdb_package: {
				subscription: {
					plan: 32190,
					recurring_payment_info: 63492,
					is_marketplace: false,
				},
				bdb: {
					name: "cache-M2XYYHSQ",
					replication: false,
					data_persistence: "disabled",
					eviction_policy: "volatile-lru",
					bdb_type: "redis",
				},
			},
		};

		console.log(payload);
	};

	return (
		<S.Create>
			<Text>{t(lang.redis.create.title)}</Text>

			<S.Spacer />

			<S.Col>
				<Text>Create 1</Text>
				<Button variant="full" onClick={handleCreateDb1}>
					Create
				</Button>
			</S.Col>
		</S.Create>
	);
};
