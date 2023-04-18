import { ChangeEvent, useState } from "react";
import { FileInputButton } from "./FileInputButton";

import styles from "./styles.module.scss"

export function ImagePicker() {
	const [files, setFiles] = useState<File[]>([]);
	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;
		if (files) {
			setFiles(Array.from(files));
		}
	}
	function handleFileReset() {
		setFiles([]);
	}

	return (
		<div>
			<div className={styles.wrapper}>
				<FileInputButton
                className={styles.fileButton}
					inputProps={{
						accept: "image/*",
						onChange: handleFileChange,
					}}
				>
					ファイルを選択
				</FileInputButton>
			</div>

			<button onClick={handleFileReset}>リセット</button>
			{files.map((file) => {
				const src = URL.createObjectURL(file);
				return <img alt={file.name} src={src} />;
			})}
		</div>
	);
}
