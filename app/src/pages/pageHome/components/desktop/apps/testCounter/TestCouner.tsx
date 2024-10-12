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
				<Counter.Minus onClick={() => {}} />
				<Counter.Plus onClick={() => {}} />
				<Counter.Value val={7} />
			</Counter.Compose>

			<S.Spacer />

			<Counter.Compose>
				<Counter.Value val={3} />
				<Counter.Plus onClick={() => {}} />
				<Counter.Minus onClick={() => {}} />
			</Counter.Compose>
		</S.TestCouner>
	);
};
