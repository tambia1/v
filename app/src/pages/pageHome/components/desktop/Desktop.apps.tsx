import { Camera } from "@apps/camera/Camera";
import { ClashRoyale } from "@apps/clashRoyale/ClashRoyale";
import { Clock } from "@apps/clock/Clock";
import { Ninja } from "@apps/ninja/Ninja";
import { Settings } from "@apps/settings/Settings";
import { Test } from "@apps/test/Test";
import { TestSelect } from "@apps/testSelect/TestSelect";
import { TestTable } from "@apps/testTable/TestTable";
import { TestTransition } from "@apps/testTransition/TestTransition";
import { Tetris } from "@apps/tetris/Tetris";
import { User } from "@apps/user/User";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { lazy } from "react";
import type { IRole } from "./Desktop.types";
import { Board } from "./apps/board/Board";
import { Calendar } from "./apps/calendar/Calendar";
import { Chat } from "./apps/chat/Chat";
import { ChickenScream } from "./apps/chickenScream/ChickenScream";
import { Debug } from "./apps/debug/Debug";
import { Redis } from "./apps/redis/Redis";
import { Speed } from "./apps/speed/Speed";
import { Spin } from "./apps/spin/Spin";
import { Stocks } from "./apps/stocks/Stocks";
import { Store } from "./apps/store/Store";
import { TestAnimation } from "./apps/testAnimation/TestAnimation";
import { TestCouner } from "./apps/testCounter/TestCouner";
import { TestCube } from "./apps/testCube/TestCube";
import { TestEdit } from "./apps/testEdit/TestEdit";
import { TestGraphQl } from "./apps/testGraphQl/GraphQl";
import { TestMenu } from "./apps/testMenu/TestMenu";
import { TestRedis } from "./apps/testRedis/TestRedis";
import { TestShared } from "./apps/testShared/TestShared";
import { TestTree } from "./apps/testTree/TestTree";
import type { IAppIcon } from "./components/appButton/AppButton.styles";

const TestMfe = lazy(() => import("remoteFrontend/Mfe").then((module) => ({ default: module.Mfe })));

const Notes = lazy(() => import("@apps/notes/Notes").then((module) => ({ default: module.Notes })));
const Calculator = lazy(() => import("@apps/calculator/Calculator").then((module) => ({ default: module.Calculator })));

export type IApp = {
	id: string;
	roles: IRole[];
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
};

export const apps: IApp[][] = [
	[
		{ id: "settings", roles: ["admin", "user", "guest"], title: <T>{lang.settings.title}</T>, icon: "settings", component: <Settings /> },
		{ id: "user", roles: ["admin", "user"], title: <T>{lang.user.title}</T>, icon: "userLoggedIn", component: <User /> },
		{ id: "user", roles: ["guest"], title: <T>{lang.user.title}</T>, icon: "userLoggedOut", component: <User /> },
		{ id: "debug", roles: ["admin", "user", "guest"], title: <T>{"Debug"}</T>, icon: "test", component: <Debug /> },
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
		{ id: "board", roles: ["admin", "user", "guest"], title: <T>{lang.board.title}</T>, icon: "board", component: <Board /> },
		{ id: "redis", roles: ["admin", "user"], title: <T>{lang.redis.title}</T>, icon: "redis", component: <Redis /> },

		{ id: "tetris", roles: ["admin", "user", "guest"], title: <T>{lang.tetris.title}</T>, icon: "tetris", component: <Tetris /> },
		{ id: "ninja", roles: ["admin", "user", "guest"], title: <T>{lang.ninja.title}</T>, icon: "ninja", component: <Ninja /> },
		{ id: "clashRoyale", roles: ["admin", "user", "guest"], title: <T>{lang.clashRoyale.title}</T>, icon: "clashRoyale", component: <ClashRoyale /> },
		{ id: "chickenScream", roles: ["admin", "user", "guest"], title: <T>{lang.chickenScream.title}</T>, icon: "chickenScream", component: <ChickenScream /> },
	],
	[
		{ id: "test", roles: ["admin"], title: <T>{lang.test.title}</T>, icon: "test", component: <Test /> },
		{ id: "testMfe", roles: ["admin"], title: <T>{lang.mfe.title}</T>, icon: "test", component: <TestMfe /> },
		{ id: "testShared", roles: ["admin"], title: <T>{lang.testShared.title}</T>, icon: "test", component: <TestShared /> },
		{ id: "testEdit", roles: ["admin", "guest"], title: <T>{lang.testEdit.title}</T>, icon: "test", component: <TestEdit /> },
		{ id: "testSelect", roles: ["admin"], title: <T>{lang.testSelect.title}</T>, icon: "test", component: <TestSelect /> },
		{ id: "testTable", roles: ["admin"], title: <T>{lang.testTable.title}</T>, icon: "test", component: <TestTable /> },
		{ id: "testTransition", roles: ["admin"], title: <T>{lang.testTransition.title}</T>, icon: "test", component: <TestTransition /> },
		{ id: "testAnimation", roles: ["admin"], title: <T>{lang.testAnimation.title}</T>, icon: "test", component: <TestAnimation /> },
		{ id: "testGraphQl", roles: ["admin"], title: <T>{lang.testGraphQl.title}</T>, icon: "test", component: <TestGraphQl /> },
		{ id: "testCube", roles: ["admin"], title: <T>{lang.testCube.title}</T>, icon: "test", component: <TestCube /> },
		{ id: "testRedis", roles: ["admin"], title: <T>{lang.testRedis.title}</T>, icon: "test", component: <TestRedis /> },
		{ id: "testTree", roles: ["admin"], title: <T>{lang.testTree.title}</T>, icon: "test", component: <TestTree /> },
		{ id: "testCounter", roles: ["admin"], title: <T>{lang.testCounter.title}</T>, icon: "test", component: <TestCouner /> },
		{ id: "testMenu", roles: ["admin"], title: <T>{lang.testMenu.title}</T>, icon: "test", component: <TestMenu /> },
	],
];
