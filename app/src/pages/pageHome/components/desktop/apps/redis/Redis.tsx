import * as S from "./Redis.styles";
import { StoreUser } from "./components/user/stores/StoreUser";
import { User } from "./components/user/User";
import { Home } from "./components/home/Home";

export const Redis = () => {
	const storeUser = StoreUser();
	const isLoggedin = Boolean(storeUser.csrf);

	return (
		<S.Redis>
			<S.Transition $visible={!isLoggedin}>
				<User />
			</S.Transition>

			<S.Transition $visible={isLoggedin}>
				<Home />
			</S.Transition>
		</S.Redis>
	);
};
