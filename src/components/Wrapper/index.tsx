import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import style from "./style.module.scss";

export function Wrapper({ children }: PropsWithChildren) {
	return (
		<div className={style.container}>
			<Header />
			<div>
				<main className={style.content}>{children}</main>
			</div>
			<Footer />
		</div>
	);
}
