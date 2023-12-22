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
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
}

export const apps: IApp[] = [
	{ id: "settings", title: <T>{lang.settings.title}</T>, icon: "settings", component: <Settings /> },
	{ id: "user", title: <T>{lang.user.title}</T>, icon: "user", component: <User /> },
	{ id: "notes", title: <T>{lang.notes.title}</T>, icon: "notes", component: <Notes /> },
	{ id: "calculator", title: <T>{lang.calculator.title}</T>, icon: "calculator", component: <Calculator /> },
	{ id: "camera", title: <T>{lang.camera.title}</T>, icon: "camera", component: <Camera /> },
	{ id: "clock", title: <T>{lang.clock.title}</T>, icon: "clock", component: <Clock /> },
	{ id: "tetris", title: <T>{lang.tetris.title}</T>, icon: "tetris", component: <Tetris /> },
	{ id: "snake", title: <T>{lang.snake.title}</T>, icon: "snake", component: <Snake /> },
	{ id: "test", title: <T>{lang.test.title}</T>, icon: "weather", component: <Test /> },
	{ id: "testDropDown", title: <T>{lang.testDropDown.title}</T>, icon: "photos", component: <TestDropDown /> },
	{ id: "testTable", title: <T>{lang.testTable.title}</T>, icon: "photos", component: <TestTable /> },
	{ id: "clashRoyale", title: <T>{lang.clashRoyale.title}</T>, icon: "clashRoyale", component: <ClashRoyale /> },
];
