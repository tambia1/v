import { Input } from "@src/components/input/Input";
import { Stepper } from "@src/components/stepper/Stepper";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./TestCouner.styles";

export const TestCouner = () => {
	return (
		<S.TestCouner>
			<Text variant="header">
				<T>{lang.testCounter.title}</T>
			</Text>

			<S.Spacer />

			<S.Row>
				<Stepper onClickMinus={() => {}} onClickPlus={() => {}} />
				<Input value={"0"} size="s" textAlign="center" />
			</S.Row>

			<S.Spacer />

			<Stepper.Compose>
				<Stepper.Minus iconName="iconMinusCircle" onClick={() => {}} />
				<Stepper.Plus iconName="iconPlusCircle" onClick={() => {}} />
			</Stepper.Compose>

			<S.Spacer />

			<Stepper.Compose>
				<Stepper.Plus iconName="iconPlusSquare" onClick={() => {}} />
				<Stepper.Minus iconName="iconMinusSquare" onClick={() => {}} />
			</Stepper.Compose>
		</S.TestCouner>
	);
};
