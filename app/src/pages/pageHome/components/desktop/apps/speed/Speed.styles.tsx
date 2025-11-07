import styled, { css, type RuleSet } from "styled-components";
import caliper from "./images/caliper.png";
import compass from "./images/compass.png";
import speedometer from "./images/speedometer.png";

export const Speed = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	padding: 1rem;
	box-sizing: border-box;

	background-color: #000000;
`;

export const Speedometer = styled.div`
	position: relative;
	width: 320px;
	height: 230px;
	top: 20px;
	left: 0px;
`;

export const SpeedometerImage = styled.div`
	background-image: url(${speedometer});
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 1;
`;

export const CaliperValueMap: { [key: string]: RuleSet<object> } = {
	0: css`
		top: 177px;
		left: 147px;
	`,
	1: css`
		top: 169px;
		left: 110px;
	`,
	2: css`
		top: 141px;
		left: 85px;
	`,
	3: css`
		top: 108px;
		left: 77px;
	`,
	4: css`
		top: 75px;
		left: 84px;
	`,
	5: css`
		top: 46px;
		left: 109px;
	`,
	6: css`
		top: 36px;
		left: 147px;
	`,
	7: css`
		top: 47px;
		left: 184px;
	`,
	8: css`
		top: 75px;
		left: 209px;
	`,
};

export const CaliperValue = styled.div<{ $key: string }>`
	position: absolute;
	width: 28px;
	height: 18px;
	color: #000000;
	font-size: 14px;
	text-shadow: 0px 1px 2px #000000;
	text-align: center;
	z-index: 2;

	${(props) => CaliperValueMap[props.$key]}
`;

export const Caliper = styled.div<{ $rotateDegree: string }>`
	background-image: url(${caliper});
	position: absolute;
	width: 6px;
	height: 54px;
	top: 141px;
	left: 158px;
	transform: rotate(${(props) => props.$rotateDegree});
	transform-origin: 3px -25px;
	transition: transform 1s ease-in-out 0s;
	z-index: 1;
`;

export const Compass = styled.div<{ $rotateDegree: string }>`
	background-image: url(${compass});
	position: absolute;
	width: 8px;
	height: 10px;
	top: 4px;
	left: 157px;
	transform: rotate(${(props) => props.$rotateDegree});
	transform-origin: 4px 112px;
	transition: transform 1s ease-in-out 0s;
	z-index: 1;
`;

export const SpeedValue = styled.div`
	position: absolute;
	width: 140px;
	height: 18px;
	top: 70px;
	left: 90px;
	color: #ffffff;
	font-size: 18px;
	text-align: center;
	text-shadow: 0px 1px 2px #666666;
	z-index: 2;
`;

export const Kmh = styled.div`
	position: absolute;
	width: 50px;
	height: 18px;
	color: #ffffff;
	font-size: 14px;
	text-shadow: 0px 1px 2px #666666;
	text-align: center;
	top: 90px;
	left: 136px;
	border-bottom: solid 1px #666666;
	z-index: 2;
`;

export const OdoValue = styled.div`
	position: absolute;
	width: 50px;
	height: 18px;
	color: #ffffff;
	font-size: 14px;
	text-shadow: 0px 1px 2px #666666;
	text-align: right;
	top: 125px;
	left: 135px;
	z-index: 2;
`;

export const OdoKm = styled.div`
	position: absolute;
	width: 50px;
	height: 18px;
	color: #ffffff;
	font-size: 10px;
	text-shadow: 0px 1px 2px #666666;
	text-align: left;
	top: 127px;
	left: 190px;
	z-index: 2;
`;

export const GpsIndicator = styled.div<{ $enabled: boolean }>`
	position: absolute;
	width: 40px;
	height: 18px;
	top: 179px;
	left: 172px;
	color: #000000;
	font-size: 10px;
	text-align: left;
	z-index: 2;

	${(props) =>
		props.$enabled
			? css`
					text-shadow: 0px 1px 3px #00ff00;
			`
			: css`
					text-shadow: 0px 1px 3px #ff0000;
			`}
`;

const Indicator = css`
	position: absolute;
	width: 40px;
	height: 18px;
	color: #ffffff;
	font-size: 10px;
	text-align: left;
	text-shadow: 0px 1px 2px #666666;
	z-index: 2;
`;

export const IndicatorLatText = styled.div`
	${Indicator}
	top: 15px;
	left: 12px;
`;

export const IndicatorLatText_0 = styled.div`
	${Indicator}
	top: 91px;
	left: 29px;
`;

export const IndicatorLatText_1 = styled.div`
	${Indicator}
	top: 74px;
	left: 33px;
`;

export const IndicatorLatText_2 = styled.div`
	${Indicator}
	top: 59px;
	left: 41px;
`;

export const IndicatorLatText_3 = styled.div`
	${Indicator}
	top: 45px;
	left: 49px;
`;

export const IndicatorLatText_4 = styled.div`
	${Indicator}
	top: 30px;
	left: 62px;
`;

export const IndicatorLngText = styled.div`
	${Indicator}
	top: 203px;
	left: 12px;
`;

export const IndicatorLngText_0 = styled.div`
	${Indicator}
	top: 187px;
	left: 61px;
`;

export const IndicatorLngText_1 = styled.div`
	${Indicator}
	top: 174px;
	left: 50px;
`;

export const IndicatorLngText_2 = styled.div`
	${Indicator}
	top: 160px;
	left: 42px;
`;

export const IndicatorLngText_3 = styled.div`
	${Indicator}
	top: 144px;
	left: 33px;
`;

export const IndicatorLngText_4 = styled.div`
	${Indicator}
	top: 127px;
	left: 28px;
`;

export const IndicatorAccurecyText = styled.div`
	${Indicator}
	top: 15px;
	left: 270px;
`;

export const IndicatorAccurecyText_0 = styled.div`
	${Indicator}
	top: 30px;
	left: 255px;
`;

export const IndicatorAccurecyText_1 = styled.div`
	${Indicator}
	top: 59px;
	left: 264px;
`;

export const IndicatorAccurecyText_2 = styled.div`
	${Indicator}
	top: 92px;
	left: 276px;
`;

export const IndicatorAltText = styled.div`
	${Indicator}
	top: 202px;
	left: 270px;
`;

export const IndicatorAltText_0 = styled.div`
	${Indicator}
	top: 126px;
	left: 288px;
`;

export const IndicatorAltText_1 = styled.div`
	${Indicator}
	top: 158px;
	left: 264px;
`;

export const IndicatorAltText_2 = styled.div`
	${Indicator}
	top: 188px;
	left: 238px;
`;

export const IndicatorLatDisabled = styled.div`
	position: absolute;
	width: 50px;
	height: 62px;
	top: 36px;
	left: 13px;
	background-color: #ffffff;
	overflow: hidden;
`;

export const IndicatorLatEnabled = styled.div<{ $top: string }>`
	position: absolute;
	width: 50px;
	height: 62px;
	top: ${(props) => props.$top};
	left: 0px;
	background-color: #ff0000;
	transition: top 1s ease-in-out 0s;
`;

export const IndicatorLngDisabled = styled.div`
	position: absolute;
	width: 50px;
	height: 62px;
	top: 133px;
	left: 13px;
	background-color: #ffffff;
	overflow: hidden;
`;

export const IndicatorLngEnabled = styled.div<{ $top: string }>`
	position: absolute;
	width: 50px;
	height: 62px;
	top: ${(props) => props.$top};
	left: 0px;
	background-color: #ff0000;
	transition: top 1s ease-in-out 0s;
`;

export const IndicatorAccurecyDisabled = styled.div`
	position: absolute;
	width: 50px;
	height: 62px;
	top: 36px;
	left: 268px;
	background-color: #ffffff;
	overflow: hidden;
`;

export const IndicatorAccurecyEnabled = styled.div<{ $top: string }>`
	position: absolute;
	width: 50px;
	height: 62px;
	top: ${(props) => props.$top};
	left: 0px;
	background-color: #ff0000;
`;

export const IndicatorAltDisabled = styled.div`
	position: absolute;
	width: 50px;
	height: 62px;
	top: 133px;
	left: 268px;
	background-color: #ffffff;
	overflow: hidden;
`;
export const IndicatorAltEnabled = styled.div<{ $top: string }>`
	position: absolute;
	width: 50px;
	height: 62px;
	top: ${(props) => props.$top};
	left: 0px;
	background-color: #ff0000;
`;

export const MaxSpeed = styled.div`
	position: absolute;
	width: 45px;
	height: 45px;
	top: 43px;
	left: 190px;
	z-index: 2;
`;

export const ErrorMessage = styled.div`
	position: absolute;
	width: 100%;
	top: 230px;
	color: #f00;
	font-size: 10px;
	z-index: 2;
	text-align: center;
`;
