import { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

type Props = ThreeElements["mesh"] & {
	color?: number | string;
	position: [number, number, number];
	size?: number;
};

export function Sphere({ color, position, size = 0.1, ...props }: Props) {
	const mesh = useRef<Mesh>(null);

	return (
		<mesh position={position} {...props} ref={mesh}>
			<sphereGeometry args={[size, 12, 12]} />
			<meshStandardMaterial color={color ?? "orange"} />
		</mesh>
	);
}
