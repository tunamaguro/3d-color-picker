import { Canvas } from "@react-three/fiber";
import { Box } from "./components/Box";
import { Sphere } from "./components/Sphere";
import { OrbitControls } from "@react-three/drei";

function App() {
	return (
		<Canvas style={{ width: window.innerWidth, height: window.innerHeight }}>
			<ambientLight />
			<OrbitControls />
			<pointLight position={[10, 10, 10]} />
			<Sphere position={[0, 0, 0]} />
		</Canvas>
	);
}

export default App;
