import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

type ColorArray = [number, number, number][];

const colorsContext = createContext<ColorArray>([]);
const setColorsContext = createContext<Dispatch<SetStateAction<ColorArray>>>(
	() => undefined,
);

export function ColorProvider({ children }: PropsWithChildren) {
	const [colors, setColors] = useState<ColorArray>([]);
	return (
		<colorsContext.Provider value={colors}>
			<setColorsContext.Provider value={setColors}>
				{children}
			</setColorsContext.Provider>
		</colorsContext.Provider>
	);
}

export function useColorValue() {
	return useContext(colorsContext);
}

export function useAddColors() {
	const setColors = useContext(setColorsContext);
	return (...args: ColorArray) => setColors((colors) => [...colors, ...args]);
}

export function useResetColors() {
	const setColors = useContext(setColorsContext);
	return () => {
		setColors([]);
	};
}
