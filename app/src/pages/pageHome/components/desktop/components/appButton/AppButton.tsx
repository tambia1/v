import { Icon } from "@src/components/icon/Icon";
import { type ITouch, useTouch } from "@src/hooks/UseTouch";
import { type MutableRefObject, type ReactNode, useRef } from "react";
import { StoreApps } from "../../stores/StoreApps";
import * as S from "./AppButton.styles";

type Props = {
	id: string;
	title: ReactNode;
	icon: S.IAppIcon | string;
	onClick: (id: string) => void;
	onLongPress: (id: string) => void;
	isLoading: boolean;
	isShakeMode: boolean;
	isPreventTouch?: MutableRefObject<boolean>;
};

export const AppButton = ({ id, title, icon, onClick, onLongPress, isPreventTouch, isLoading, isShakeMode, ...rest }: Props) => {
	const refButton = useRef<HTMLDivElement>(null);
	const storeApps = StoreApps();
	const isExternalApp = storeApps.apps.findIndex((item) => item.name === id) >= 0;

	useTouch({
		ref: refButton,
		onTouch: ({ status, time }: ITouch) => {
			if (isPreventTouch?.current) {
				return;
			}

			if (status === "long") {
				onLongPress?.(id);
			} else if (status === "up" && time < 700) {
				if (isShakeMode && isExternalApp) {
					if (storeApps.apps.find((item) => item.name === id)) {
						storeApps.setData([...storeApps.apps.filter((item) => item.name !== id)]);
					}

					return;
				}

				onClick?.(id);
			}
		},
	});

	return (
		<S.AppButton ref={refButton} $isLoading={isLoading} $isShakeMode={isShakeMode} {...rest}>
			<S.Image $appIcon={icon} />
			<S.Title>{title}</S.Title>

			<S.ImageDeleteApp $isShakeMode={isShakeMode && isExternalApp}>
				<Icon iconName="iconMinusCircle" />
			</S.ImageDeleteApp>
		</S.AppButton>
	);
};
