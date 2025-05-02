import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import * as S from "./TestEdit.styles";
import { ExampleButton } from "./examples/exampleButton/ExampleButton";
import { ExampleCard } from "./examples/exampleCard/ExampleCard";
import { ExampleCheck } from "./examples/exampleCheck/ExampleCheck";
import { ExampleInput } from "./examples/exampleInput/ExampleInput";
import { ExampleList } from "./examples/exampleList/ExampleList";
import { ExampleModal } from "./examples/exampleModal/ExampleModal";
import { ExamplePopupMenu } from "./examples/examplePopupMenu/ExamplePopupMenu";
import { ExampleProgress } from "./examples/exampleProgress/ExampleProgress";
import { ExampleSelectMulti } from "./examples/exampleSelectMulti/ExampleSelectMulti";
import { ExampleSelectSingle } from "./examples/exampleSelectSingle/ExampleSelectSingle";
import { ExampleShared } from "./examples/exampleShared/ExampleShared";
import { ExampleStepper } from "./examples/exampleStepper/ExampleStepper";
import { ExampleStyleX } from "./examples/exampleStyleX/ExampleStyleX";
import { ExampleSwitch } from "./examples/exampleSwitch/ExampleSwitch";
import { ExampleTab } from "./examples/exampleTab/ExampleTab";
import { ExampleText } from "./examples/exampleText/ExampleText";

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
				<ExampleSelectSingle />

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

				<S.Line />
				<ExampleCard />

				<S.Line />
				<ExampleStyleX />

				<S.Line />
				<ExampleShared />
			</S.Col>
		</S.TestEdit>
	);
};
