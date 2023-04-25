import { PropsWithChildren } from "react";
import style from "./style.module.scss";

export function Wrapper({ children }: PropsWithChildren) {
	return (
		<div className={style.container}>
			<header>Header</header>
			<div>
				<main className={style.content}>{children}</main>
			</div>
			<footer>Footer</footer>
		</div>
	);
}
