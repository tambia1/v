import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IAppBarPosition } from "./PageHome.styles";

interface Props {
	onChange: (appBarPosition: IAppBarPosition) => void;
}

export const useAppBarSearchParams = ({ onChange }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const appBarPositions: { [K in IAppBarPosition]: K } = {
			top: "top",
			bottom: "bottom",
			left: "left",
			right: "right",
		};

		const position = searchParams.get("appbar") as IAppBarPosition;

		if (Object.keys(appBarPositions).includes(position)) {
			onChange(appBarPositions[position]);
		} else {
			searchParams.delete("appbar");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
