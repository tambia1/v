import { Text } from "@src/components/text/Text";
import * as S from "./TestCouner.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Counter } from "@src/components/counter/Counter";

export const TestCouner = () => {
	return (
		<S.TestCouner>
			<Text size="l">
				<T>{lang.testCounter.title}</T>
			</Text>

			<S.Spacer />

			<Counter min={0} max={10} val={6} />

			<S.Spacer />

			<Counter.Compose min={0} max={10} val={6}>
				<Counter.Minus />
				<Counter.Plus />
				<Counter.Value />
			</Counter.Compose>

			<S.Spacer />

			<Counter.Compose min={0} max={10} val={6}>
				<Counter.Value />
				<Counter.Plus />
				<Counter.Minus />
			</Counter.Compose>
		</S.TestCouner>
	);
};
