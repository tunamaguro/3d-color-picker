import styles from "./header.module.scss";

export function Header() {
	return (
		<header className={styles.wrapper}>
			<div className={styles.content}>
				<h1>HSLカラーピッカー</h1>
			</div>
		</header>
	);
}
