import { Button } from "@src/components/button/Button";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiBdb } from "../../../../../../api/ApiBdbs";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Create.styles";

export const Create = () => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const mutateCreateBdbd = ApiBdb.mutateCreateBdb();

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	console.log(storeUser.csrf);

	const handleCreateBdb = async () => {
		setIsLoading(true);

		const mutateCreateBdbResult = await mutateCreateBdbd({
			csrf: storeUser.csrf,
			bdbName: "cache-M2YTGOOA",
			plan: 32190,
			dataPersistence: "disabled",
			replication: false,
			recurringPaymentInfo: 63492,
		});

		setIsLoading(false);

		setMessage(mutateCreateBdbResult.error === 0 ? "success" : "error");
	};

	return (
		<S.Create>
			<Text>{t(lang.redis.create.title)}</Text>

			<S.Spacer />

			<S.Col>
				<Button variant="full" onClick={handleCreateBdb}>
					Create bdb
				</Button>
				{isLoading && <Loader />}
				{message && <Text>{message}</Text>}
			</S.Col>
		</S.Create>
	);
};
