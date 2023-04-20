import { ChangeEvent, useState } from "react";
import { FileInputButton } from "./FileInputButton";

import styles from "./styles.module.scss";
import { PhotoIcon } from "./PhotoIcon";
import { ImageCanvas } from "./ImageCanvas";

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
					<PhotoIcon style={{ width: "2rem", height: "2rem" }} />
					画像を選択
				</FileInputButton>
			</div>

			<button onClick={handleFileReset}>リセット</button>
			{files[0] ? (
				<ImageCanvas
					file={files[0]}
					onClick={(e) => {
						const rect = e.currentTarget.getBoundingClientRect();
						const x = e.clientX - rect.left;
						const y = e.clientY - rect.top;

						const ctx = e.currentTarget.getContext("2d")!;
						const { data } = ctx?.getImageData(x, y, 1, 1);

						const rgba = { r: data[0], g: data[1], b: data[2] };
						console.info(rgba);
					}}
				/>
			) : null}
		</div>
	);
}
