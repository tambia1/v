import { Button } from "@src/components/button/Button";
import { useState } from "react";
import * as S from "./ChickenScream.styles";
import { Chicken } from "./components/chicken/Chicken";
import type { State } from "./components/chicken/Chicken.types";

export const ChickenScream = () => {
	const [chickenState, setChickenState] = useState<State>("idle");

	const handleOnClickWalk = () => {
		setChickenState("walk");

		setTimeout(() => {
			setChickenState("idle");
		}, 100);
	};

	const handleOnClickJump = () => {
		setChickenState("jump");

		setTimeout(() => {
			setChickenState("idle");
		}, 100);
	};

	return (
		<S.ChickenScream>
			<S.Row>
				<Button onClick={handleOnClickWalk}>Walk</Button>
				<Button onClick={handleOnClickJump}>Jump</Button>
			</S.Row>

			<S.Spacer />

			<Chicken state={chickenState} />
		</S.ChickenScream>
	);
};
