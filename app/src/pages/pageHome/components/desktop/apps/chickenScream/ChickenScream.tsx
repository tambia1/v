import { Counter } from "@src/components/counter/Counter";
import { Icon } from "@src/components/icon/Icon";
import { Progress } from "@src/components/progress/Progress";
import { Text } from "@src/components/text/Text";
import { useEffect, useRef, useState } from "react";
import * as S from "./ChickenScream.styles";
import { Chicken } from "./components/chicken/Chicken";
import type { State } from "./components/chicken/Chicken.types";
import { Sun } from "./components/sun/Sun";
import { useMicrophone } from "./hooks/useMicrophone";

export const ChickenScream = () => {
	const [chickenState, setChickenState] = useState<State>("walk-2");
	const timer = useRef(0);
	const groundX = useRef(0);
	const [pakpakSensitivity, setPakpakSensitivity] = useState(0.2);
	const [pakeekSensitivity, setPakeekSensitivity] = useState(0.3);

	const { isListening, volume } = useMicrophone();

	useEffect(() => {
		const INTERVAL = 100;
		const intervalId = setInterval(() => {
			timer.current += INTERVAL;
		}, INTERVAL);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (volume > pakeekSensitivity) {
			setChickenState("jump");
			timer.current = 0;
			groundX.current += 2;
		} else if (volume > pakpakSensitivity) {
			groundX.current++;

			if (timer.current < 300) {
				return;
			}

			setChickenState(chickenState === "walk-1" ? "walk-2" : "walk-1");
			timer.current = 0;
		} else {
			if (timer.current < 600) {
				return;
			}

			setChickenState("idle");
		}
	}, [volume, chickenState, pakpakSensitivity, pakeekSensitivity]);

	const addNumbers = (num1: number, num2: number) => {
		return Math.min(Math.max(~~((num1 + num2) * 100) / 100, 0), 1);
	};

	return (
		<S.ChickenScream>
			<S.Col>
				<S.Row>
					{!isListening && <Icon iconName="iconMicOff" stroke="red" />}
					{isListening && <Icon iconName="iconMic" stroke="green" />}
					<Progress percent={volume * 100} />
				</S.Row>

				<S.Row>
					<Text>Volume: {volume.toFixed(3)}</Text>
				</S.Row>

				<S.Row>
					<Text>Pak-Pak sensitivity: </Text>
					<Counter
						val={pakpakSensitivity.toFixed(2)}
						onClickMinus={() => {
							setPakpakSensitivity(addNumbers(pakpakSensitivity, -0.01));
						}}
						onClickPlus={() => {
							setPakpakSensitivity(addNumbers(pakpakSensitivity, +0.01));
						}}
					/>
				</S.Row>

				<S.Row>
					<Text>Pa-Keek sensitivity: </Text>
					<Counter
						val={pakeekSensitivity.toFixed(2)}
						onClickMinus={() => {
							setPakeekSensitivity(addNumbers(pakeekSensitivity, -0.01));
						}}
						onClickPlus={() => {
							setPakeekSensitivity(addNumbers(pakeekSensitivity, +0.01));
						}}
					/>
				</S.Row>
			</S.Col>

			<S.Sun>
				<Sun />
			</S.Sun>

			<S.Chicken $isJumping={chickenState === "jump"}>
				<Chicken state={chickenState} />
			</S.Chicken>

			<S.Ground $x={groundX.current} />
		</S.ChickenScream>
	);
};
