import { Counter } from "@src/components/counter/Counter";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./TestCouner.styles";

export const TestCouner = () => {
	return (
		<S.TestCouner>
			<Text fontSize="header">
				<T>{lang.testCounter.title}</T>
			</Text>

			<S.Spacer />

			<Counter onClickMinus={() => {}} onClickPlus={() => {}}>
				6
			</Counter>

			<S.Spacer />

			<Counter.Compose>
				<Counter.Minus iconName="iconMinusCircle" onClick={() => {}} />
				<Counter.Plus iconName="iconPlusCircle" onClick={() => {}} />
				<Counter.Value>7</Counter.Value>
			</Counter.Compose>

			<S.Spacer />

			<Counter.Compose>
				<Counter.Value>3</Counter.Value>
				<Counter.Plus iconName="iconPlusSquare" onClick={() => {}} />
				<Counter.Minus iconName="iconMinusSquare" onClick={() => {}} />
			</Counter.Compose>
		</S.TestCouner>
	);
};
