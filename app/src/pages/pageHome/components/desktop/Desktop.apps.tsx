import { T } from "@src/locales/T";
import { IRole } from "./Desktop.types";
import { lang } from "@src/locales/i18n";
import { Settings } from "@apps/settings/Settings";
import { Tetris } from "@apps/tetris/Tetris";
import { Test } from "@apps/test/Test";
import { TestSelect } from "@apps/testSelect/TestSelect";
import { TestTable } from "@apps/testTable/TestTable";
import { Camera } from "@apps/camera/Camera";
import { lazy } from "react";
import { Clock } from "@apps/clock/Clock";
import { IAppIcon } from "./components/appButton/AppButton.styles";
import { User } from "@apps/user/User";
import { ClashRoyale } from "@apps/clashRoyale/ClashRoyale";
import { TestTransition } from "@apps/testTransition/TestTransition";
import { Ninja } from "@apps/ninja/Ninja";
import { Stocks } from "./apps/stocks/Stocks";
import { Store } from "./apps/store/Store";
import { Chat } from "./apps/chat/Chat";
import { Calendar } from "./apps/calendar/Calendar";
import { Spin } from "./apps/spin/Spin";
import { TestAnimation } from "./apps/testAnimation/TestAnimation";
import { TestGraphQl } from "./apps/testGraphQl/GraphQl";
import { Speed } from "./apps/speed/Speed";
import { TestCube } from "./apps/testCube/TestCube";

const Mfe = lazy(() => import("remoteFrontend/Mfe").then((module) => ({ default: module.Mfe })));

const Notes = lazy(() => import("@apps/notes/Notes").then((module) => ({ default: module.Notes })));
const Calculator = lazy(() => import("@apps/calculator/Calculator").then((module) => ({ default: module.Calculator })));

export interface IApp {
	id: string;
	roles: IRole[];
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
}

export const apps: IApp[][] = [
	[
		{ id: "settings", roles: ["admin", "user", "guest"], title: <T>{lang.settings.title}</T>, icon: "settings", component: <Settings /> },
		{ id: "user", roles: ["admin", "user"], title: <T>{lang.user.title}</T>, icon: "userLoggedIn", component: <User /> },
		{ id: "user", roles: ["guest"], title: <T>{lang.user.title}</T>, icon: "userLoggedOut", component: <User /> },
		{ id: "notes", roles: ["admin", "user", "guest"], title: <T>{lang.notes.title}</T>, icon: "notes", component: <Notes /> },
		{ id: "calculator", roles: ["admin", "user", "guest"], title: <T>{lang.calculator.title}</T>, icon: "calculator", component: <Calculator /> },
		{ id: "camera", roles: ["admin", "user", "guest"], title: <T>{lang.camera.title}</T>, icon: "camera", component: <Camera /> },
		{ id: "clock", roles: ["admin", "user", "guest"], title: <T>{lang.clock.title}</T>, icon: "clock", component: <Clock /> },
		{ id: "calendar", roles: ["admin", "user", "guest"], title: <T>{lang.calendar.title}</T>, icon: "calendar", component: <Calendar /> },
		{ id: "stocks", roles: ["admin", "user", "guest"], title: <T>{lang.stocks.title}</T>, icon: "stocks", component: <Stocks /> },
		{ id: "chat", roles: ["admin", "user", "guest"], title: <T>{lang.chat.title}</T>, icon: "chat", component: <Chat /> },
		{ id: "store", roles: ["admin", "user", "guest"], title: <T>{lang.store.title}</T>, icon: "store", component: <Store /> },
		{ id: "spin", roles: ["admin", "user", "guest"], title: <T>{lang.spin.title}</T>, icon: "spin", component: <Spin /> },
		{ id: "speed", roles: ["admin", "user", "guest"], title: <T>{lang.speed.title}</T>, icon: "speed", component: <Speed /> },

		{ id: "tetris", roles: ["admin", "user"], title: <T>{lang.tetris.title}</T>, icon: "tetris", component: <Tetris /> },
		{ id: "ninja", roles: ["admin", "user"], title: <T>{lang.ninja.title}</T>, icon: "ninja", component: <Ninja /> },
		{ id: "clashRoyale", roles: ["admin", "user"], title: <T>{lang.clashRoyale.title}</T>, icon: "clashRoyale", component: <ClashRoyale /> },
	],
	[
		{ id: "mfe", roles: ["admin"], title: <T>{lang.mfe.title}</T>, icon: "test", component: <Mfe /> },
		{ id: "test", roles: ["admin"], title: <T>{lang.test.title}</T>, icon: "test", component: <Test /> },
		{ id: "testSelect", roles: ["admin"], title: <T>{lang.testSelect.title}</T>, icon: "test", component: <TestSelect /> },
		{ id: "testTable", roles: ["admin"], title: <T>{lang.testTable.title}</T>, icon: "test", component: <TestTable /> },
		{ id: "testTransition", roles: ["admin"], title: <T>{lang.testTransition.title}</T>, icon: "test", component: <TestTransition /> },
		{ id: "testAnimation", roles: ["admin"], title: <T>{lang.testAnimation.title}</T>, icon: "test", component: <TestAnimation /> },
		{ id: "testGraphQl", roles: ["admin"], title: <T>{lang.testGraphQl.title}</T>, icon: "test", component: <TestGraphQl /> },
		{ id: "testCube", roles: ["admin", "guest"], title: <T>{lang.testCube.title}</T>, icon: "test", component: <TestCube /> },
	],
];
