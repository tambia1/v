import { Button } from "@src/components/button/Button";
import { Loader } from "@src/components/loader/Loader";
import { Text } from "@src/components/text/Text";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiBdb } from "../../../../../../api/ApiBdbs";
import { ApiCrdbs } from "../../../../../../api/ApiCrdbs";
import { ApiPlans } from "../../../../../../api/ApiPlans";
import { ApiRegions } from "../../../../../../api/ApiRegions";
import { ApiSubscriptions } from "../../../../../../api/ApiSubscriptions";
import { StoreUser } from "../../../../../user/stores/StoreUser";
import * as S from "./Create.styles";

export const Create = () => {
	const { t } = useTranslation();

	const storeUser = StoreUser();
	const mutateCreateBdbd = ApiBdb.mutateCreateBdb();

	const queryPlans = ApiPlans.quryPlans({ csrf: storeUser.csrf, only_customer_plans: true });
	const querySubs = ApiSubscriptions.qurySubscriptions({ csrf: storeUser.csrf });
	const queryBdbs = ApiBdb.quryBdbs({ csrf: storeUser.csrf });
	const queryCrdbs = ApiCrdbs.quryCrdbs({ csrf: storeUser.csrf });
	const queryRegions = ApiRegions.quryRegions({ csrf: storeUser.csrf });

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

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

		queryPlans.refetch();
		querySubs.refetch();
		queryBdbs.refetch();
		queryCrdbs.refetch();
		queryRegions.refetch();

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
