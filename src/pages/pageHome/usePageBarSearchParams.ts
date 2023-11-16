import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IPageBarPosition } from "./PageHome.styles";

interface Props {
	setPagePosition: (pageBarPosition: IPageBarPosition) => void;
}

export const usePageBarSearchParams = ({ setPagePosition }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const pageBarPositions: { [K in IPageBarPosition]: K } = {
			top: "top",
			bottom: "bottom",
			left: "left",
			right: "right",
		};

		const position = (searchParams.get("bar") || "") as IPageBarPosition;

		if (Object.keys(pageBarPositions).includes(position)) {
			setPagePosition(pageBarPositions[position]);
		} else {
			searchParams.delete("theme");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
