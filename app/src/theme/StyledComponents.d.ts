import {} from "styled-components";
import type { Theme } from "./Theme.types";

declare module "styled-components" {
	export interface DefaultTheme extends Theme {}
}
