import { T } from "@src/locales/T";
import { IAppId } from "./PageHome.types";
import { IAppIcon } from "./components/button/Button.styles";
import { lang } from "@src/locales/i18n";
import { Settings } from "./apps/settings/Settings";
import { Notes } from "./apps/notes/Notes";
import { Calculator } from "./apps/calculator/Calculator";
import { Tetris } from "./apps/tetris/Tetris";
import { Test } from "./apps/test/Test";
import { TestDropDown } from "./apps/testDropDown/TestDropDown";
import { TestTable } from "./apps/testTable/TestTable";
import { Camera } from "./apps/camera/Camera";

interface IApp {
	id: IAppId;
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
}

export const apps: IApp[] = [
	{ id: "settings", title: <T>{lang.settings.title}</T>, icon: "settings", component: <Settings /> },
	{ id: "notes", title: <T>{lang.notes.title}</T>, icon: "notes", component: <Notes /> },
	{ id: "calculator", title: <T>{lang.calculator.title}</T>, icon: "calculator", component: <Calculator /> },
	{ id: "camera", title: <T>{lang.camera.title}</T>, icon: "camera", component: <Camera /> },
	{ id: "tetris", title: <T>{lang.tetris.title}</T>, icon: "tetris", component: <Tetris /> },
	{ id: "test", title: <T>{lang.test.title}</T>, icon: "weather", component: <Test /> },
	{ id: "testDropDown", title: <T>{lang.testDropDown.title}</T>, icon: "photos", component: <TestDropDown /> },
	{ id: "testTable", title: <T>{lang.testTable.title}</T>, icon: "photos", component: <TestTable /> },
];
