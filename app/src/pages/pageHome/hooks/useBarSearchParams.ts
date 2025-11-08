import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BarPosition } from "../components/desktop/Desktop.styles";

type Props = {
	onChange: (barPosition: BarPosition) => void;
};

export const useBarSearchParams = ({ onChange }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const barPositions: { [K in BarPosition]: K } = {
			top: "top",
			bottom: "bottom",
			left: "left",
			right: "right",
		};

		const position = searchParams.get("bar") as BarPosition;

		if (Object.keys(barPositions).includes(position)) {
			onChange(barPositions[position]);
		} else {
			searchParams.delete("bar");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
