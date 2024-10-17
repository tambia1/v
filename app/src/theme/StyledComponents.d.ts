import {} from "styled-components";
import type { ITheme } from "./Theme.types";

declare module "styled-components" {
	export interface DefaultTheme extends ITheme {}
}
