import { useState } from "react";
import * as S from "./PageCalculator.styles";

export const PageCalculator = () => {
	const [result, setResult] = useState(0);
	const [number, setNumber] = useState("0");
	const [action, setAction] = useState("+");
	const [display, setDisplay] = useState("0");

	const onCLickNumber = (arg: number | string) => {
		if (arg == "." && number.indexOf(".") >= 0) {
			return;
		}

		let newNumber = String(number) + String(arg);

		setNumber(newNumber);
		setDisplay(String(parseFloat(newNumber)));
	};

	const onClickOperand = (arg: string) => {
		let newResult = result;

		switch (action) {
			case "+":
				newResult = newResult + parseFloat(number);
				break;

			case "-":
				newResult = newResult - parseFloat(number);
				break;

			case "x":
				newResult = newResult * parseFloat(number);
				break;

			case "÷":
				newResult = newResult / parseFloat(number);
				break;
		}

		setResult(newResult);
		setNumber("0");
		setAction(arg);

		setDisplay(String(newResult));
	};

	const onClickAction = (arg: string) => {
		let newResult = result;
		let newNumber = number;
		let newAction = action;

		switch (arg) {
			case "C":
				newResult = 0;
				newNumber = "0";
				newAction = "+";
				break;

			case "±":
				newNumber = String(parseFloat(number) * -1);
				break;

			case "%":
				newNumber = String(parseFloat(number) / 100);
				break;

			case "":
				newResult = parseFloat(number);
				break;
		}

		setResult(newResult);
		setNumber(newNumber);
		setAction(newAction);

		setDisplay(String(parseFloat(newNumber)));
	};

	return (
		<S.PageCalculator>
			<S.ButtonsContainer>
				<S.Result>{display}</S.Result>
				<S.ButtonGrey
					onClick={() => {
						onClickAction("C");
					}}
				>
					C
				</S.ButtonGrey>
				<S.ButtonGrey
					onClick={() => {
						onClickAction("±");
					}}
				>
					±
				</S.ButtonGrey>
				<S.ButtonGrey
					onClick={() => {
						onClickAction("%");
					}}
				>
					%
				</S.ButtonGrey>

				<S.ButtonYellow
					onClick={() => {
						onClickOperand("÷");
					}}
				>
					÷
				</S.ButtonYellow>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(7);
					}}
				>
					7
				</S.ButtonBrown>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(8);
					}}
				>
					8
				</S.ButtonBrown>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(9);
					}}
				>
					9
				</S.ButtonBrown>

				<S.ButtonYellow
					onClick={() => {
						onClickOperand("x");
					}}
				>
					x
				</S.ButtonYellow>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(4);
					}}
				>
					4
				</S.ButtonBrown>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(5);
					}}
				>
					5
				</S.ButtonBrown>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(6);
					}}
				>
					6
				</S.ButtonBrown>

				<S.ButtonYellow
					onClick={() => {
						onClickOperand("-");
					}}
				>
					-
				</S.ButtonYellow>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(1);
					}}
				>
					1
				</S.ButtonBrown>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(2);
					}}
				>
					2
				</S.ButtonBrown>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(3);
					}}
				>
					3
				</S.ButtonBrown>

				<S.ButtonYellow
					onClick={() => {
						onClickOperand("+");
					}}
				>
					+
				</S.ButtonYellow>
				<S.ButtonZero
					onClick={() => {
						onCLickNumber(0);
					}}
				>
					0
				</S.ButtonZero>
				<S.ButtonBrown
					onClick={() => {
						onCLickNumber(".");
					}}
				>
					.
				</S.ButtonBrown>
				<S.ButtonYellow
					onClick={() => {
						onClickOperand("=");
					}}
				>
					=
				</S.ButtonYellow>
			</S.ButtonsContainer>
		</S.PageCalculator>
	);
};
