import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IPageBarPosition } from "./PageHome.styles";

interface Props {
	onChange: (pageBarPosition: IPageBarPosition) => void;
}

export const usePageBarSearchParams = ({ onChange }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const pageBarPositions: { [K in IPageBarPosition]: K } = {
			top: "top",
			bottom: "bottom",
			left: "left",
			right: "right",
		};

		const position = searchParams.get("pagebar") as IPageBarPosition;

		if (Object.keys(pageBarPositions).includes(position)) {
			onChange(pageBarPositions[position]);
		} else {
			searchParams.delete("theme");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
