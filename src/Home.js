import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";

function useWobble(factor = 1, fn = "sin", cb) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math[fn](t) * factor;
    if (cb) cb(t, ref.current);
  });
  return ref;
}

export function Box(props) {
  const [hovered, setHover] = useState(false);
  // const hovered = useSpring({ color: hover ? "lightgreen" : "lightgray" });

  // useEffect(() => {
  //   document.body.style.cursor = hovered ? "pointer" : "auto";
  // }, [hovered]);
  // const [active, setActive] = useState(false);
  const ref = useWobble(0.5, "cos");
  useFrame(
    () =>
      (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01)
  );
  return (
    // removed {a} from react spring
    <mesh
      ref={ref}
      {...props}
      // scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      // onClick={(e) => setActive(!active)}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
      onPointerOver={(e) => {
        // e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(e) => {
        // e.stopPropagation();
        setHover(false);
      }}
    >
      <boxBufferGeometry attach="geometry" /*args={[1, 1, 1]} */ />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "lightgreen" : "lightgray"}
        // color={hovered.color}
      />
    </mesh>
  );
}

export function Shapes() {
  const {
    viewport: { width, height },
  } = useThree();
  const ringSize = Math.max(3, width / 2);
  const crossSize = 0.7;
  return (
    <>
      <Ring
        position={[-width * 0.8, height * -3, -5]}
        scale={[ringSize, ringSize, 1]}
      />
      <Cross
        position={[-width / 2.5, height / 8, -1]}
        scale={[crossSize, crossSize, 1]}
        rotation={[0, 0, Math.PI / 4]}
      />
      <Minus
        position={[width / 3, -height / 3.5, -2]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, 0, Math.PI / 10]}
      />
      <group
        rotation={[Math.PI / 8, 0, 0]}
        position={[-width / 4, -height / 6, 0]}
      >
        <Box scale={[0.8, 0.8, 0.8]} />
        <Box position={[width / 1.5, height / 4, -3]} scale={[0.5, 0.5, 0.5]} />
        <Lights />
      </group>
    </>
  );
}

function Ring(props) {
  const ref = useWobble(0.1, "sin");
  return (
    <group ref={ref}>
      <mesh {...props}>
        <ringBufferGeometry attach="geometry" args={[1, 1.4, 64]} />
        <meshBasicMaterial
          attach="material"
          color="#FFF9BE"
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Cross(props) {
  const inner = useRef();
  const ref = useWobble(0.1, "sin", () => (inner.current.rotation.z += 0.001));
  return (
    <group ref={ref}>
      <group ref={inner} {...props}>
        <mesh>
          <planeBufferGeometry attach="geometry" args={[2, 0.5]} />
          <meshBasicMaterial
            attach="material"
            color="#FFEDDD"
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, -0.625, 0]}>
          <planeBufferGeometry attach="geometry" args={[0.5, 0.75]} />
          <meshBasicMaterial
            attach="material"
            color="#FFEDDD"
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.625, 0]}>
          <planeBufferGeometry attach="geometry" args={[0.5, 0.75]} />
          <meshBasicMaterial
            attach="material"
            color="#FFEDDD"
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function Minus(props) {
  const ref = useWobble(0.1, "sin");
  return (
    <group ref={ref}>
      <group {...props}>
        <mesh>
          <planeBufferGeometry attach="geometry" args={[2, 0.7]} />
          <meshBasicMaterial
            attach="material"
            color="#DEF5FF"
            toneMapped={false}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight
        position={[7, -5, 10]}
        intensity={1}
        angle={0.3}
        penumbra={1}
      />
      <pointLight position={[1, -1, -5]} intensity={0.5} />
    </>
  );
}

export function Categories({ time = 6500 }) {
  const [index, set] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => set((index + 1) % 2), time);
    return () => clearInterval(interval);
  }, [index, time]);
  const cats = useMemo(
    () => [
      {
        npm: "aeropress-dice",
        description:
          "3D dice rolling game that generates random Aeropress recipes. Utilizes the react-three-fiber and use-cannon libraries.",
      },
      {
        npm: "district-build-nyc",
        description:
          "map of NYC that allows a user to interact with it's historical buildings and landmarks via a clickable icon. Constructed with Mapbox GL.",
      },
      // {
      //   npm: "churn",
      //   description: "credit card and spending category application.",
      // },
    ],
    []
  );

  const ref = useRef();
  useEffect(() => {
    ref.current.style.animation = "none";
    void ref.current.offsetHeight;
    ref.current.style.animation = `changewidth ${time / 1000}s linear`;
  }, [index, time]);

  return (
    <p style={{ height: 70 }}>
      <button
        // href="#"
        style={{ width: 280, left: 5 }}
        onClick={() => set((index + 1) % 2)}
      >
        {/* changed div to span */}
        <span
          ref={ref}
          className="progress"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: 2,
            opacity: 0.5,
            background: "#ffa5a5",
          }}
        />
        victorscholz/
        {cats.map(({ npm }, i) => (
          <span
            key={i}
            hidden={i !== index || undefined}
            className="transition vertical"
          >
            {npm}
          </span>
        ))}
      </button>
      is a
      <br />
      {cats.map(({ description }, i) => (
        <span
          key={i}
          hidden={i !== index || undefined}
          className="transition horizontal"
          style={{ width: "100%", left: 5 }}
        >
          {description}
        </span>
      ))}
    </p>
  );
}
