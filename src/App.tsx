import { Canvas } from "@react-three/fiber";
import { Sphere } from "./components/Sphere";
import { OrbitControls } from "@react-three/drei";
import range from "just-range";
import { XyzCoord } from "./coord";
import { Box } from "./components/Box";

const baseR = 20;
const rads = range(0, 2 * Math.PI, Math.PI / 10);
const turn = range(0, 360, 40);
const circle = turn.flatMap((theta) =>
	rads.map((rad) => {
		const x = Math.cos(rad) * baseR;
		const y = Math.sin(rad) * baseR;
		const z = 0;
		const pos = new XyzCoord(x, y, z).turn_Xaxis(theta);
		return pos;
	}),
);

function App() {
	return (
		<Canvas style={{ width: window.innerWidth, height: window.innerHeight }}>
			<ambientLight />
			<OrbitControls />
			<pointLight position={[10, 10, 10]} />
			<Box />
			{circle.map((pos) => (
				<Sphere position={pos.to_vec()} />
			))}
		</Canvas>
	);
}

export default App;
