import { Text } from "@src/components/text/Text";
import * as S from "./TestCude.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Cube } from "@src/components/cube/Cube";

export const TestCube = () => {
	return (
		<S.TestCube>
			<Text size="l">
				<T>{lang.testCube.title}</T>
			</Text>

			<Cube width={200} height={200} depth={100} x={100} y={100} z={0} rotateX={-25} rotateY={30} rotateZ={5} />
		</S.TestCube>
	);
};
