import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

type Props = ThreeElements["mesh"];

export function Box({ ...props }: Props) {
	const mesh = useRef<Mesh>(null!);

	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);

	useFrame((_state, _delta) => {
		mesh.current.rotation.x += 0.01;
		mesh.current.rotation.y += 0.01;
	});

	return (
		<mesh
			{...props}
			ref={mesh}
			scale={active ? 1.5 : 1}
			onClick={() => setActive(!active)}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}
