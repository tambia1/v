import { Button } from "@src/components/button/Button";
import { Icon } from "@src/components/icon/Icon";
import { Progress } from "@src/components/progress/Progress";
import { Text } from "@src/components/text/Text";
import { useAnimationFrame } from "@src/hooks/UseAnimationFrame";
import { useEffect, useState } from "react";
import * as S from "./ChickenScream.styles";
import { Chicken } from "./components/chicken/Chicken";
import type { State as ChickenState } from "./components/chicken/Chicken.types";
import { Sun } from "./components/sun/Sun";
import { useMicrophone } from "./hooks/useMicrophone";

export const ChickenScream = () => {
	const [chickenState, setChickenState] = useState<{ state: ChickenState; time: number }>({ state: "idle", time: 0 });

	const [pakPakSensitivity, setPakpakSensitivity] = useState(1.0);
	const [pakKeekSensitivity, setPakKeekSensitivity] = useState(1.0);

	const { isListening, volume } = useMicrophone();

	const [calibrating, setCalibrating] = useState<"none" | "pak-pak" | "pak-keek">("none");

	const [groundX, setGroundX] = useState(0);

	const animationFrame = useAnimationFrame();

	const screenWidth = window.innerWidth;
	const stoneX = screenWidth + 60 - (groundX % (screenWidth + 60 * 2));
	const stoneWidth = 60;
	const chickenX = 100;
	const chickenWidth = 40;

	const [hits, setHits] = useState(0);
	const [hitDetected, setHitDetected] = useState(false);

	useEffect(() => {
		if (chickenState.state === "walk-1" || chickenState.state === "walk-2") {
			const speed = 50;
			setGroundX((prevGroundX) => prevGroundX + (speed * animationFrame.time.delta) / 1000);
		} else if (chickenState.state === "jump") {
			const speed = 100;
			setGroundX((prevGroundX) => prevGroundX + (speed * animationFrame.time.delta) / 1000);
		}
	}, [animationFrame.time, chickenState.state]);

	useEffect(() => {
		if (stoneX < chickenX && stoneX + stoneWidth > chickenX - chickenWidth) {
			if (hitDetected === false && chickenState.state !== "jump") {
				setHits(hits + 1);
				setHitDetected(true);
			}
		} else {
			setHitDetected(false);
		}
	}, [stoneX, hits, hitDetected, chickenState.state]);

	useEffect(() => {
		if (calibrating === "pak-pak") {
			setPakpakSensitivity(Math.max(pakPakSensitivity, volume));

			return;
		}

		if (calibrating === "pak-keek") {
			setPakKeekSensitivity(Math.max(pakKeekSensitivity, pakPakSensitivity, volume));

			return;
		}

		if (chickenState.state === "idle" && performance.now() - chickenState.time < 300) {
			return;
		}

		if (volume > pakKeekSensitivity) {
			setChickenState({ state: "jump", time: performance.now() });
		} else if (volume > pakPakSensitivity) {
			if (chickenState.state === "walk-1" && performance.now() - chickenState.time > 300) {
				setChickenState({ state: "walk-2", time: performance.now() });
			}

			if (chickenState.state === "walk-2" && performance.now() - chickenState.time > 300) {
				setChickenState({ state: "walk-1", time: performance.now() });
			}

			if (chickenState.state !== "walk-1" && chickenState.state !== "walk-2") {
				setChickenState({ state: "walk-1", time: performance.now() });
			}
		} else {
			setChickenState({ state: "idle", time: performance.now() });
		}
	}, [volume, chickenState.state, chickenState.time, pakPakSensitivity, pakKeekSensitivity, calibrating]);

	const handleOnClickTrainPakpak = () => {
		setPakpakSensitivity(0);
		setCalibrating("pak-pak");

		setTimeout(() => {
			setCalibrating("none");
		}, 2000);
	};

	const handleOnClickTrainPakeek = () => {
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

				<S.Row>
					<Text>Volume: {volume.toFixed(2)}</Text>
				</S.Row>

				<S.Row>
					<Text>Pak-Pak sensitivity: {pakPakSensitivity.toFixed(2)}</Text>
					<Button variant="styled" onClick={handleOnClickTrainPakpak} disabled={calibrating !== "none"}>
						Train
					</Button>
				</S.Row>

				<S.Row>
					<Text>Pa-Keek sensitivity: {pakKeekSensitivity.toFixed(2)}</Text>
					<Button variant="styled" onClick={handleOnClickTrainPakeek} disabled={calibrating !== "none"}>
						Train
					</Button>
				</S.Row>

				<S.Row>
					<Text>Hits: {hits}</Text>
				</S.Row>
			</S.Col>

			<S.Sun>
				<Sun />
			</S.Sun>

			<S.Chicken $isJumping={chickenState.state === "jump"}>
				<Chicken state={chickenState.state} />
			</S.Chicken>

			<S.Stone $x={screenWidth + 60 - (groundX % (screenWidth + 60 * 2))} />
			<S.Ground $x={groundX} />
		</S.ChickenScream>
	);
};
