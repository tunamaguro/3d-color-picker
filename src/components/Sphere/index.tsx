import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

type Props = ThreeElements["mesh"];

export function Sphere({ ...props }: Props) {
	const mesh = useRef<Mesh>(null!);

	return (
		<mesh {...props} ref={mesh}>
			<sphereGeometry args={[1, 12, 12]} />
			<meshStandardMaterial wireframe={true} color={"orange"} />
		</mesh>
	);
}
