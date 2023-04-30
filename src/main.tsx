import "modern-css-reset"

import App from "./App";
import { ColorProvider } from "./components/ColorProvider";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ColorProvider>
			<App />
		</ColorProvider>
	</React.StrictMode>,
);
