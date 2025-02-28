import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./TestEdit.styles";
import { ExampleButton } from "./examples/ExampleButton";
import { ExampleCheck } from "./examples/ExampleCheck";
import { ExampleInput } from "./examples/ExampleInput";
import { ExampleList } from "./examples/ExampleList";
import { ExampleModal } from "./examples/ExampleModal";
import { ExamplePopupMenu } from "./examples/ExamplePopupMenu";
import { ExampleProgress } from "./examples/ExampleProgress";
import { ExampleSelectMulti } from "./examples/ExampleSelectMulti";
import { ExampleSelectSignle } from "./examples/ExampleSelectSignle";
import { ExampleStepper } from "./examples/ExampleStepper";
import { ExampleSwitch } from "./examples/ExampleSwitch";
import { ExampleTab } from "./examples/ExampleTab";
import { ExampleText } from "./examples/ExampleText";

export const TestEdit = () => {
	return (
		<S.TestEdit>
			<Text variant="title">
				<T>{lang.testEdit.title}</T>
			</Text>

			<S.Col>
				<S.Line />
				<ExampleText />

				<S.Line />
				<ExampleSwitch />

				<S.Line />
				<ExampleCheck />

				<S.Line />
				<ExampleButton />

				<S.Line />
				<ExampleProgress />

				<S.Line />
				<ExampleInput />

				<S.Line />
				<ExampleStepper />

				<S.Line />
				<ExampleSelectSignle />

				<S.Line />
				<ExampleSelectMulti />

				<S.Line />
				<ExamplePopupMenu />

				<S.Line />
				<ExampleList />

				<S.Line />
				<ExampleTab />

				<S.Line />
				<ExampleModal />
			</S.Col>
		</S.TestEdit>
	);
};
