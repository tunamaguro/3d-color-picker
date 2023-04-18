import {
	ButtonHTMLAttributes,
	InputHTMLAttributes,
	useRef,
} from "react";

export function useFiles() {
	const inputRef = useRef<HTMLInputElement>(null);

	function openFileDialog() {
		inputRef.current?.click();
	}

	return { inputRef, openFileDialog };
}

/**
 * 必ずtypeをfileにするためtypeを入力させない
 * refは常に既定のものを使うため入力させない
 * styleも常に非表示にさせるため入力させない
 */
type OmittedInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type" | "style" | "ref"
>;

// onClickは常にrefを開くためだけに使用するので入力させない
type OmittedButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	"onClick"
>;

type FileInputButtonProps = OmittedButtonProps & {
	inputProps?: OmittedInputProps;
};

export function FileInputButton({
	children,
	inputProps,
	...buttonRest
}: FileInputButtonProps) {
	const { inputRef, openFileDialog } = useFiles();
	return (
		<button {...buttonRest} onClick={openFileDialog}>
			{children}
			<input
				{...inputProps}
				type="file"
				ref={inputRef}
				hidden
				style={{ display: "none" }}
			/>
		</button>
	);
}
