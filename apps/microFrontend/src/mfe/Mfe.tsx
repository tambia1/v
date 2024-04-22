import "./Mfe.css";
import { version } from "./../../package.json";

export const Mfe = () => {
	return (
		<div data-mfe-version={`${version}}`} className="mfe">
			Hello Micro Frontend
		</div>
	);
};

export default Mfe;
