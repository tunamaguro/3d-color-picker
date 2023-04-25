import { Canvas } from "@react-three/fiber";
import { Sphere } from "./components/Sphere";
import { OrbitControls } from "@react-three/drei";
import range from "just-range";
import { RgbCoord, XyzCoord } from "./coord";
import { Box } from "./components/Box";
import { ImagePicker } from "./components/ImagePicker";

import style from "./style.module.scss";
import { useColorValue } from "./components/ColorProvider";

const baseR = 10;
const rads = range(0, 2 * Math.PI, Math.PI / 20);
const circle = rads.map((rad) => {
	const x = Math.cos(rad) * baseR;
	const y = Math.sin(rad) * baseR;
	const z = 0;
	const pos = new XyzCoord(x, y, z).turn_Xaxis(90);
	return pos;
});

const onionRads = [0, 45, 60, 75];
const onion = onionRads.flatMap((theta) =>
	circle.map((xyz) => {
		const [_x, y, _z] = xyz.to_vec();
		const [u, _v, w] = xyz.turn_Zaxis(theta).to_vec();
		return new XyzCoord(u, y, w);
	}),
);

const turn = range(0, 360, 15);
const sphere = turn.flatMap((theta) =>
	onion.map((xyz) => xyz.turn_Zaxis(theta)),
);

function App() {
	const colors = useColorValue();
	return (
		<main className={style.container}>
			<ImagePicker />
			<Canvas
				style={{
					aspectRatio: "1/1",
				}}
			>
				<ambientLight />
				<OrbitControls />
				<axesHelper args={[20]} />
				<pointLight position={[10, 10, 10]} />
				{sphere.map((pos) => (
					<Sphere
						position={pos.to_vec()}
						color={pos.to_hsl().to_rgb().to_hex()}
					/>
				))}
				{colors.map(([r, g, b]) => {
					const rgb = new RgbCoord(r, g, b);
					return (
						<Sphere
							position={rgb.to_hsl().to_xyz().to_vec()}
							color={rgb.to_hex()}
							size={0.4}
						/>
					);
				})}
			</Canvas>
		</main>
	);
}

export default App;
