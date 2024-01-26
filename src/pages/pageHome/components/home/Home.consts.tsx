import { T } from "@src/locales/T";
import { IAppId } from "./Home.types";
import { lang } from "@src/locales/i18n";
import { Settings } from "../../apps/settings/Settings";
import { Tetris } from "../../apps/tetris/Tetris";
import { Test } from "../../apps/test/Test";
import { TestDropDown } from "../../apps/testDropDown/TestDropDown";
import { TestTable } from "../../apps/testTable/TestTable";
import { Camera } from "../../apps/camera/Camera";
import { lazy } from "react";
import { Clock } from "../../apps/clock/Clock";
import { IAppIcon } from "./components/button/Button.styles";
import { User } from "../../apps/user/User";
import { Snake } from "../../apps/snake/Snake";
import { ClashRoyale } from "../../apps/clashRoyale/ClashRoyale";

const Notes = lazy(() => import("../../apps/notes/Notes").then((module) => ({ default: module.Notes })));
const Calculator = lazy(() => import("../../apps/calculator/Calculator").then((module) => ({ default: module.Calculator })));

interface IApp {
	id: IAppId;
	isNeedAuth: boolean;
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
}

export const apps: IApp[] = [
	{ id: "settings", isNeedAuth: false, title: <T>{lang.settings.title}</T>, icon: "settings", component: <Settings /> },
	{ id: "user", isNeedAuth: false, title: <T>{lang.user.title}</T>, icon: "userLoggedOut", component: <User /> },
	{ id: "notes", isNeedAuth: false, title: <T>{lang.notes.title}</T>, icon: "notes", component: <Notes /> },
	{ id: "calculator", isNeedAuth: false, title: <T>{lang.calculator.title}</T>, icon: "calculator", component: <Calculator /> },
	{ id: "camera", isNeedAuth: false, title: <T>{lang.camera.title}</T>, icon: "camera", component: <Camera /> },
	{ id: "clock", isNeedAuth: false, title: <T>{lang.clock.title}</T>, icon: "clock", component: <Clock /> },
	{ id: "tetris", isNeedAuth: false, title: <T>{lang.tetris.title}</T>, icon: "tetris", component: <Tetris /> },
	{ id: "snake", isNeedAuth: false, title: <T>{lang.snake.title}</T>, icon: "snake", component: <Snake /> },
	{ id: "clashRoyale", isNeedAuth: false, title: <T>{lang.clashRoyale.title}</T>, icon: "clashRoyale", component: <ClashRoyale /> },
	{ id: "test", isNeedAuth: true, title: <T>{lang.test.title}</T>, icon: "weather", component: <Test /> },
	{ id: "testDropDown", isNeedAuth: true, title: <T>{lang.testDropDown.title}</T>, icon: "photos", component: <TestDropDown /> },
	{ id: "testTable", isNeedAuth: true, title: <T>{lang.testTable.title}</T>, icon: "photos", component: <TestTable /> },
];
