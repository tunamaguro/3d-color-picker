import { ChangeEvent, useState } from "react";
import { FileInputButton } from "./FileInputButton";

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
			<FileInputButton
				inputProps={{
					accept: "image/*",
					onChange: handleFileChange,
				}}
			>
				ファイルを選択
			</FileInputButton>
			<button onClick={handleFileReset}>リセット</button>
			{files.map((file) => {
				const src = URL.createObjectURL(file);
				return <img alt={file.name} src={src} />;
			})}
		</div>
	);
}
