import "@emotion/react";
import type { Theme as AppTheme } from "./Theme.types";

declare module "@emotion/react" {
	export interface Theme extends AppTheme {}
}
