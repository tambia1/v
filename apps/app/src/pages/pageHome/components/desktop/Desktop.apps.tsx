import { T } from "@src/locales/T";
import { IAppId, IRole } from "./Desktop.types";
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
import { Snake } from "@apps/snake/Snake";
import { ClashRoyale } from "@apps/clashRoyale/ClashRoyale";
import { TestTransition } from "@apps/testTransition/TestTransition";
import { Ninja } from "@apps/ninja/Ninja";

const Mfe = lazy(() => import("remoteMicroFrontend/Mfe").then((module) => ({ default: module.Mfe })));

const Notes = lazy(() => import("@apps/notes/Notes").then((module) => ({ default: module.Notes })));
const Calculator = lazy(() => import("@apps/calculator/Calculator").then((module) => ({ default: module.Calculator })));

interface IApp {
	id: IAppId;
	roles: IRole[];
	title: React.ReactNode;
	icon: IAppIcon;
	component: React.ReactElement;
}

export const apps: IApp[] = [
	{ id: "settings", roles: ["admin", "user", "guest"], title: <T>{lang.settings.title}</T>, icon: "settings", component: <Settings /> },
	{ id: "user", roles: ["admin", "user"], title: <T>{lang.user.title}</T>, icon: "userLoggedIn", component: <User /> },
	{ id: "user", roles: ["guest"], title: <T>{lang.user.title}</T>, icon: "userLoggedOut", component: <User /> },
	{ id: "notes", roles: ["admin", "user", "guest"], title: <T>{lang.notes.title}</T>, icon: "notes", component: <Notes /> },
	{ id: "calculator", roles: ["admin", "user", "guest"], title: <T>{lang.calculator.title}</T>, icon: "calculator", component: <Calculator /> },
	{ id: "camera", roles: ["admin", "user", "guest"], title: <T>{lang.camera.title}</T>, icon: "camera", component: <Camera /> },
	{ id: "clock", roles: ["admin", "user", "guest"], title: <T>{lang.clock.title}</T>, icon: "clock", component: <Clock /> },
	{ id: "tetris", roles: ["admin", "user"], title: <T>{lang.tetris.title}</T>, icon: "tetris", component: <Tetris /> },
	{ id: "snake", roles: ["admin", "user"], title: <T>{lang.snake.title}</T>, icon: "snake", component: <Snake /> },
	{ id: "ninja", roles: ["admin", "user"], title: <T>{lang.ninja.title}</T>, icon: "ninja", component: <Ninja /> },
	{ id: "clashRoyale", roles: ["admin", "user"], title: <T>{lang.clashRoyale.title}</T>, icon: "clashRoyale", component: <ClashRoyale /> },
	{ id: "mfe", roles: ["admin"], title: <T>{lang.mfe.title}</T>, icon: "photos", component: <Mfe /> },
	{ id: "test", roles: ["admin"], title: <T>{lang.test.title}</T>, icon: "photos", component: <Test /> },
	{ id: "testSelect", roles: ["admin"], title: <T>{lang.testSelect.title}</T>, icon: "photos", component: <TestSelect /> },
	{ id: "testTable", roles: ["admin"], title: <T>{lang.testTable.title}</T>, icon: "photos", component: <TestTable /> },
	{ id: "testTransition", roles: ["admin"], title: <T>{lang.testTransition.title}</T>, icon: "photos", component: <TestTransition /> },
];