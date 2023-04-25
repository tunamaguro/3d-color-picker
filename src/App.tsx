import { ImagePicker } from "./components/ImagePicker";
import { Sphere } from "./components/Sphere";
import { RgbCoord } from "./coord";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { useColorValue } from "./components/ColorProvider";
import { HslCylinder } from "./components/HslCylinder";
import style from "./style.module.scss";

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
				<HslCylinder />
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
