import { useEffect, useRef, useState } from "react";
import * as S from "./Speed.styles";

export const Speed = () => {
	const geolocationPointer = useRef(0);

	const arrMaxSpeed = [8, 16, 40, 48, 80, 120, 160];

	const [maxSpeedIndex, setMaxSpeedIndex] = useState(6);
	const [maxSpeed, setMaxSpeed] = useState(arrMaxSpeed[maxSpeedIndex]);
	const [caliperDegStep, setCaliperDegStep] = useState(240 / maxSpeed);
	const [errorMessage, setErrorMessage] = useState("");
	const [isGpsIndicatorEnabled, setIsGpsIndicatorEnabled] = useState(false);

	const speedIntervals = maxSpeed / 8;
	const caliperDegStart = 0;

	const [speedValue, setSpeedValue] = useState("0.00");
	const [caliperRotateDegree, setCaliperRotateDegree] = useState("0deg");
	const [compassRotateDegree, setCompassRotateDegree] = useState("0deg");
	const [indicatorLatEnabledTop, setIndicatorLatEnabledTop] = useState("0px");
	const [indicatorLngEnabledTop, setIndicatorLngEnabledTop] = useState("0px");
	const [indicatorAccurecyEnabledTop, setIndicatorAccurecyEnabledTop] = useState("0px");
	const [indicatorAltEnabledTop, setIndicatorAltEnabledTop] = useState("0px");

	useEffect(() => {
		geolocationPointer.current = navigator.geolocation.watchPosition(handleOnGpsOk, handleOnGpsError, {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 5000,
		});

		return () => {
			navigator.geolocation.clearWatch(geolocationPointer.current);
		};
	}, []);

	const handleOnGpsError = (error: { code: number }) => {
		navigator.geolocation.clearWatch(geolocationPointer.current);

		const errorMap: { [K: number]: string } = {
			0: "PERMISSION_DENIED",
			1: "POSITION_UNAVAILABLE",
			2: "TIMEOUT",
		};

		setErrorMessage(errorMap[error.code]);

		setIsGpsIndicatorEnabled(false);
	};

	const handleOnGpsOk = (position: GeolocationPosition) => {
		const latitude = position.coords.latitude || 0;
		const longitude = position.coords.longitude || 0;
		const altitude = position.coords.altitude || 0;
		const accuracy = position.coords.accuracy || 0;
		const heading = position.coords.heading || 0;
		const speed = (position.coords.speed || 0) * 3.6;

		drawSpeed(speed);
		drawCompass(heading);
		drawLat(latitude);
		drawLng(longitude);
		drawAccuracy(accuracy);
		drawAltitide(altitude);

		setIsGpsIndicatorEnabled(true);
	};

	const handleOnClickMacSpeed = () => {
		const newMaxSpeedIndex = (maxSpeedIndex + 1) % arrMaxSpeed.length;

		setMaxSpeedIndex(newMaxSpeedIndex);
		setMaxSpeed(arrMaxSpeed[newMaxSpeedIndex]);
		setCaliperDegStep(240 / maxSpeed);
	};

	const drawSpeed = (speed: number) => {
		let degree = caliperDegStart + speed * caliperDegStep;

		degree = Math.max(0, degree);
		degree = Math.min(degree, 240);

		setCaliperRotateDegree(`${degree}deg`);
		setSpeedValue(speed.toFixed(2));
	};

	const drawCompass = (heading: number) => {
		setCompassRotateDegree(`${heading}deg`);
	};

	const drawLat = (latitude: number) => {
		setIndicatorLatEnabledTop(`${62 - (62 / 180.0) * (latitude + 96)}px`);
	};

	const drawLng = (longitude: number) => {
		setIndicatorLngEnabledTop(`${62 - (62 / 360.0) * (longitude + 164)}px`);
	};

	const drawAccuracy = (accuracy: number) => {
		setIndicatorAccurecyEnabledTop(`${(62 / 500.0) * accuracy}px`);
	};

	const drawAltitide = (altitude: number) => {
		setIndicatorAltEnabledTop(`${(62 / 1000.0) * altitude}px`);
	};

	return (
		<S.Speed>
			<S.Speedometer>
				<S.SpeedometerImage />

				{Object.keys(S.CaliperValueMap).map((key, index) => (
					<S.CaliperValue key={key} $key={key}>
						{speedIntervals * index}
					</S.CaliperValue>
				))}

				<S.Caliper $rotateDegree={caliperRotateDegree} />
				<S.Compass $rotateDegree={compassRotateDegree} />

				<S.SpeedValue>{speedValue}</S.SpeedValue>
				<S.Kmh>km/h</S.Kmh>
				<S.OdoValue>0.0</S.OdoValue>
				<S.OdoKm>km</S.OdoKm>
				<S.GpsIndicator $enabled={isGpsIndicatorEnabled}>GPS</S.GpsIndicator>

				<S.IndicatorLatText>LAT</S.IndicatorLatText>
				<S.IndicatorLatText_0>-90</S.IndicatorLatText_0>
				<S.IndicatorLatText_1>-45</S.IndicatorLatText_1>
				<S.IndicatorLatText_2>0</S.IndicatorLatText_2>
				<S.IndicatorLatText_3>45</S.IndicatorLatText_3>
				<S.IndicatorLatText_4>90</S.IndicatorLatText_4>
				<S.IndicatorLatDisabled>
					<S.IndicatorLatEnabled $top={indicatorLatEnabledTop} />
				</S.IndicatorLatDisabled>

				<S.IndicatorLngText>LNG</S.IndicatorLngText>
				<S.IndicatorLngText_0>-180</S.IndicatorLngText_0>
				<S.IndicatorLngText_1>-90</S.IndicatorLngText_1>
				<S.IndicatorLngText_2>0</S.IndicatorLngText_2>
				<S.IndicatorLngText_3>90</S.IndicatorLngText_3>
				<S.IndicatorLngText_4>180</S.IndicatorLngText_4>
				<S.IndicatorLngDisabled>
					<S.IndicatorLngEnabled $top={indicatorLngEnabledTop} />
				</S.IndicatorLngDisabled>

				<S.IndicatorAccurecyText>Accuracy</S.IndicatorAccurecyText>
				<S.IndicatorAccurecyText_0>0</S.IndicatorAccurecyText_0>
				<S.IndicatorAccurecyText_1>250</S.IndicatorAccurecyText_1>
				<S.IndicatorAccurecyText_2>500</S.IndicatorAccurecyText_2>
				<S.IndicatorAccurecyDisabled>
					<S.IndicatorAccurecyEnabled $top={indicatorAccurecyEnabledTop} />
				</S.IndicatorAccurecyDisabled>

				<S.IndicatorAltText>Altitude</S.IndicatorAltText>
				<S.IndicatorAltText_0>0</S.IndicatorAltText_0>
				<S.IndicatorAltText_1>500</S.IndicatorAltText_1>
				<S.IndicatorAltText_2>1000</S.IndicatorAltText_2>
				<S.IndicatorAltDisabled>
					<S.IndicatorAltEnabled $top={indicatorAltEnabledTop} />
				</S.IndicatorAltDisabled>

				<S.MaxSpeed onClick={handleOnClickMacSpeed} />

				<S.ErrorMessage>{errorMessage}</S.ErrorMessage>
			</S.Speedometer>
		</S.Speed>
	);
};
