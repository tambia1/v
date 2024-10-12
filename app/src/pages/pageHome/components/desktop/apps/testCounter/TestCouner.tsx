import { Counter } from "@src/components/counter/Counter";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./TestCouner.styles";

export const TestCouner = () => {
	return (
		<S.TestCouner>
			<Text size="l">
				<T>{lang.testCounter.title}</T>
			</Text>

			<S.Spacer />

			<Counter val={6} onClickMinus={() => {}} onClickPlus={() => {}} />

			<S.Spacer />

			<Counter.Compose>
				<Counter.Minus onClickMinus={() => {}} />
				<Counter.Plus onClickPlus={() => {}} />
				<Counter.Value val={7} />
			</Counter.Compose>

			<S.Spacer />

			<Counter.Compose>
				<Counter.Value val={3} />
				<Counter.Plus onClickPlus={() => {}} />
				<Counter.Minus onClickMinus={() => {}} />
			</Counter.Compose>

			<S.Spacer />

			<Counter.Compose>
				<Counter.Plus.Compose iconName="iconPlusCircle" onClickPlus={() => {}} />
				<Counter.Value val={8} />
				<Counter.Minus.Compose iconName="iconMinusCircle" onClickMinus={() => {}} />
			</Counter.Compose>
		</S.TestCouner>
	);
};
