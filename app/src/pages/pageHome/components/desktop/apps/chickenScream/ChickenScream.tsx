import { Button } from "@src/components/button/Button";
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
	const [pakPakSensitivity, setPakpakSensitivity] = useState(0.0);
	const [pakKeekSensitivity, setPakKeekSensitivity] = useState(0.0);

	const { isListening, volume } = useMicrophone();

	const [calibrating, setCalibrating] = useState<"none" | "pak-pak" | "pak-keek">("none");

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
		if (calibrating === "pak-pak") {
			setPakpakSensitivity(Math.max(pakPakSensitivity, volume));

			return;
		}

		if (calibrating === "pak-keek") {
			setPakKeekSensitivity(Math.max(pakKeekSensitivity, volume));

			return;
		}

		if (volume > pakKeekSensitivity) {
			setChickenState("jump");
			timer.current = 0;
			groundX.current += 2;
		} else if (volume > pakPakSensitivity) {
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
	}, [volume, chickenState, pakPakSensitivity, pakKeekSensitivity, calibrating]);

	const handleOnClickCalibratePakpak = () => {
		setPakpakSensitivity(0);
		setCalibrating("pak-pak");

		setTimeout(() => {
			setCalibrating("none");
		}, 2000);
	};

	const handleOnClickCalibratePakeek = () => {
		setPakKeekSensitivity(0);
		setCalibrating("pak-keek");

		setTimeout(() => {
			setCalibrating("none");
		}, 2000);
	};

	return (
		<S.ChickenScream>
			<S.Col>
				<S.Row>
					{!isListening && <Icon iconName="iconMicOff" stroke="red" />}
					{isListening && <Icon iconName="iconMic" stroke="green" />}
					<Progress percent={volume * 100} />
				</S.Row>

				<S.Spacer />

				<S.Row>
					<Text>Volume: {volume.toFixed(2)}</Text>
				</S.Row>

				<S.Spacer />

				<S.Row>
					<Text>Pak-Pak sensitivity: {pakPakSensitivity.toFixed(2)}</Text>
					<Button variant="styled" onClick={handleOnClickCalibratePakpak} disabled={calibrating !== "none"}>
						Calibrate Pak-Pak
					</Button>
				</S.Row>

				<S.Row>
					<Text>Pa-Keek sensitivity: {pakKeekSensitivity.toFixed(2)}</Text>
					<Button variant="styled" onClick={handleOnClickCalibratePakeek} disabled={calibrating !== "none"}>
						Calibrate Pak-eek
					</Button>
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
