import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IBarPosition } from "../components/home/Home.styles";

interface Props {
	onChange: (barPosition: IBarPosition) => void;
}

export const useBarSearchParams = ({ onChange }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const barPositions: { [K in IBarPosition]: K } = {
			top: "top",
			bottom: "bottom",
			left: "left",
			right: "right",
		};

		const position = searchParams.get("bar") as IBarPosition;

		if (Object.keys(barPositions).includes(position)) {
			onChange(barPositions[position]);
		} else {
			searchParams.delete("bar");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
