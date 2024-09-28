import { ITouch, useTouch } from "@src/hooks/UseTouch";
import * as S from "./AppButton.styles";
import { ReactNode, useRef } from "react";
import { Icon } from "@src/components/icon/Icon";
import { StoreApps } from "../../stores/StoreApps";

interface Props {
	id: string;
	title: ReactNode;
	icon: S.IAppIcon | string;
	onClick: (id: string) => void;
	onLongPress: (id: string) => void;
	isLoading: boolean;
	isShakeMode: boolean;
}

export const AppButton = ({ id, title, icon, onClick, onLongPress, isLoading, isShakeMode }: Props) => {
	const refButton = useRef<HTMLDivElement>(null);
	const storeApps = StoreApps();
	const isExternalApp = storeApps.apps.findIndex((item) => item.name === id) >= 0;

	useTouch({
		ref: refButton,
		onTouch: ({ status, time }: ITouch) => {
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
		deps: [refButton.current],
	});

	return (
		<S.AppButton ref={refButton} $isLoading={isLoading} $isShakeMode={isShakeMode}>
			<S.Image $appIcon={icon} />
			<S.Title>{title}</S.Title>

			<S.ImageDeleteApp $isShakeMode={isShakeMode && isExternalApp}>
				<Icon iconName="iconMinusCircle" />
			</S.ImageDeleteApp>
		</S.AppButton>
	);
};
