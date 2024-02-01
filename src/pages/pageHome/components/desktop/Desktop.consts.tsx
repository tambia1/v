import { T } from "@src/locales/T";
import { IAppId } from "./Desktop.types";
import { lang } from "@src/locales/i18n";
import { Settings } from "../../apps/settings/Settings";
import { Tetris } from "../../apps/tetris/Tetris";
import { Test } from "../../apps/test/Test";
import { TestDropDown } from "../../apps/testDropDown/TestDropDown";
import { TestTable } from "../../apps/testTable/TestTable";
import { Camera } from "../../apps/camera/Camera";
import { lazy } from "react";
import { Clock } from "../../apps/clock/Clock";
import { IAppIcon } from "./components/appButton/AppButton.styles";
import { User } from "../../apps/user/User";
import { Snake } from "../../apps/snake/Snake";
import { ClashRoyale } from "../../apps/clashRoyale/ClashRoyale";

const Notes = lazy(() => import("../../apps/notes/Notes").then((module) => ({ default: module.Notes })));
const Calculator = lazy(() => import("../../apps/calculator/Calculator").then((module) => ({ default: module.Calculator })));

interface IApp {
	id: IAppId;
	authType: "loggedIn" | "loggedOut" | "both";
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
	isLoading: boolean;
}

export const apps: IApp[] = [
	{ id: "settings", authType: "both", title: <T>{lang.settings.title}</T>, icon: "settings", component: <Settings />, isLoading: false },
	{ id: "user", authType: "loggedIn", title: <T>{lang.user.title}</T>, icon: "userLoggedIn", component: <User />, isLoading: false },
	{ id: "user", authType: "loggedOut", title: <T>{lang.user.title}</T>, icon: "userLoggedOut", component: <User />, isLoading: false },
	{ id: "notes", authType: "both", title: <T>{lang.notes.title}</T>, icon: "notes", component: <Notes />, isLoading: true },
	{ id: "calculator", authType: "both", title: <T>{lang.calculator.title}</T>, icon: "calculator", component: <Calculator />, isLoading: false },
	{ id: "camera", authType: "both", title: <T>{lang.camera.title}</T>, icon: "camera", component: <Camera />, isLoading: false },
	{ id: "clock", authType: "both", title: <T>{lang.clock.title}</T>, icon: "clock", component: <Clock />, isLoading: false },
	{ id: "tetris", authType: "loggedIn", title: <T>{lang.tetris.title}</T>, icon: "tetris", component: <Tetris />, isLoading: false },
	{ id: "snake", authType: "loggedIn", title: <T>{lang.snake.title}</T>, icon: "snake", component: <Snake />, isLoading: false },
	{ id: "clashRoyale", authType: "loggedIn", title: <T>{lang.clashRoyale.title}</T>, icon: "clashRoyale", component: <ClashRoyale />, isLoading: false },
	{ id: "test", authType: "loggedIn", title: <T>{lang.test.title}</T>, icon: "weather", component: <Test />, isLoading: false },
	{ id: "testDropDown", authType: "loggedIn", title: <T>{lang.testDropDown.title}</T>, icon: "photos", component: <TestDropDown />, isLoading: false },
	{ id: "testTable", authType: "loggedIn", title: <T>{lang.testTable.title}</T>, icon: "photos", component: <TestTable />, isLoading: false },
];
