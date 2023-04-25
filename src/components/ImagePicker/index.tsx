import { FileInputButton } from "./FileInputButton";
import { ChangeEvent, useState } from "react";

import { useAddColors, useResetColors } from "../ColorProvider";
import { ImageCanvas } from "./ImageCanvas";
import { PhotoIcon } from "./PhotoIcon";
import styles from "./styles.module.scss";

export function ImagePicker() {
	const [files, setFiles] = useState<File[]>([]);
	const addColors = useAddColors();
	const resetColors = useResetColors();
	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;
		if (files) {
			setFiles(Array.from(files));
		}
	}
	function handleFileReset() {
		setFiles([]);
		resetColors();
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
					onMouseMove={(e) => {
						const rect = e.currentTarget.getBoundingClientRect();
						const x = e.clientX - rect.left;
						const y = e.clientY - rect.top;

						const ctx = e.currentTarget.getContext("2d", {
							willReadFrequently: true,
						})!;
						const { data } = ctx?.getImageData(x, y, 1, 1);

						const rgb = { r: data[0], g: data[1], b: data[2] };
						addColors([rgb.r, rgb.g, rgb.b]);
					}}
				/>
			) : null}
		</div>
	);
}
