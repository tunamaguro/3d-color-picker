import styles from "./footer.module.scss";

export function Footer() {
	return (
		<footer className={styles.wrapper}>
			<p className={styles.content}>Copyright © 2023 tunamaguro</p>
		</footer>
	);
}
