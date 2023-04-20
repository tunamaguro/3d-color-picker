import { CanvasHTMLAttributes, useEffect, useRef } from "react";

import styles from "./styles.module.scss";

type RectLike = {
	width: number;
	height: number;
};

function calcAspect(canvas: RectLike, image: RectLike) {
	// それぞれのアスペクト比を計算
	const canvasAspect = canvas.width / canvas.height;
	const imageAspect = image.width / image.height;

	// 画像が横長の時、つまり上下に隙間ができるとき
	if (imageAspect >= canvasAspect) {
		const left = 0;
		const width = canvas.width;
		const height = canvas.width / imageAspect;
		const top = (canvas.height - height) / 2;
		return {
			left,
			top,
			width,
			height,
		};
	}
	// それ以外
	const top = 0;
	const height = canvas.height;
	const width = canvas.height * imageAspect;
	const left = (canvas.width - width) / 2;

	return {
		left,
		top,
		width,
		height,
	};
}

type ImageCanvasProps = {
	file: File;
} & Omit<CanvasHTMLAttributes<HTMLCanvasElement>, "ref">;

export function ImageCanvas({ file, ...rest }: ImageCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		async function setImage() {
			const image = await createImageBitmap(file);
			const canvasContext = canvasRef.current?.getContext("2d");
			// 何かしらの要因でcanvasContextがなかったら抜ける
			if (!canvasContext) {
				return;
			}

			// css上の大きさとcanvasの大きさをそろえる
			const { clientWidth, clientHeight } = canvasContext.canvas;
			canvasContext.canvas.setAttribute("width", `${clientWidth}px`);
			canvasContext.canvas.setAttribute("height", `${clientHeight}px`);

			const { height, left, top, width } = calcAspect(
				canvasContext.canvas,
				image,
			);
			canvasContext.drawImage(
				image,
				0,
				0,
				image.width,
				image.height,
				left,
				top,
				width,
				height,
			);
		}
		setImage();
	}, []);
	return (
		<canvas
			{...rest}
			ref={canvasRef}
			className={`${styles.canvas} ${rest.className ?? ""}`}
		/>
	);
}
