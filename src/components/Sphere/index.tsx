import { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

type Props = ThreeElements["mesh"] & {
	color?: number | string;
	position: [number, number, number];
};

export function Sphere({ color, position, ...props }: Props) {
	const mesh = useRef<Mesh>(null!);

	const size = position[2] === 0 ? 0.3 : 0.1;

	return (
		<mesh position={position} {...props} ref={mesh}>
			<sphereGeometry args={[size, 12, 12]} />
			<meshStandardMaterial color={color ?? "orange"} />
		</mesh>
	);
}
