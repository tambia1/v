import * as S from "./Redis.styles";
import { Home } from "./components/home/Home";
import { User } from "./components/user/User";
import { StoreUser } from "./components/user/stores/StoreUser";

export const Redis = () => {
	const storeUser = StoreUser();
	const isLoggedin = Boolean(storeUser.csrf);

	return (
		<S.Redis>
			<S.Transition $visible={!isLoggedin}>{!isLoggedin && <User />}</S.Transition>

			<S.Transition $visible={isLoggedin}>{isLoggedin && <Home />}</S.Transition>
		</S.Redis>
	);
};
