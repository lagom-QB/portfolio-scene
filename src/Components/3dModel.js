import {
  AdaptiveDpr,
  AdaptiveEvents,
  Html,
  useProgress,
  Stars,
  Text3D,
  Text,
  Environment,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, {
  Suspense,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { useTransform, useScroll, motion } from "framer-motion";
import * as THREE from "three";
// -------------- Components----------------------------------
import Model from "./modelScene";
import { useAuthorsQuery } from "./Getters/fetchers/Author.jsx";
import { useToolsQuery } from "./Getters/fetchers/Tools";
import { useProjectsQuery } from "./Getters/fetchers/Projects";
import { useUIStore } from "../App";
// -----------------------------------------------------------

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function ScrollThroughModel() {
  const lookieHere = new THREE.Vector3(0, 10, -5);
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const distance = useTransform(scrollYProgress, [0, 1], [50, 8]);

  useFrame(({ camera }) => {
    camera.position.setFromCylindricalCoords(
      distance.get(), //radius, phi and theta.
      0, //phi
      0 //theta.
    );

    camera.updateProjectionMatrix();
    camera.lookAt(lookieHere.x, lookieHere.y, lookieHere.z);
  });

  useLayoutEffect(() => gl.setPixelRatio(0.7), [gl]);

  return (
    <>
      <Model rotation={[Math.PI / 4, -Math.PI, 0]} scale={3} />
    </>
  );
}
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 1, 1]} intensity={0.5} />
      <pointLight
        position={[-12, 8, 6]}
        angle={Math.PI / 6}
        penumbra={1}
        decay={1.5}
        color={0xf1f288}
        intensity={200}
        distance={20}
      />
      <pointLight
        position={[12, 8, 6]}
        angle={Math.PI / 6}
        penumbra={1}
        decay={1.5}
        color={0xf1f288}
        intensity={200}
        distance={20}
      />
    </>
  );
}
function ButtonClickable({
  data,
  buttonPosition,
  buttonDestination,
  destinationRotation,
  scale = 1,
  route,
  clicked,
  setClickedProject,
  setClickedTools,
  clickedProjects,
  clickedTools,
}) {
  // --------------- Variables
  const [hover, setHover] = useState(false),
    ref = useRef(),
    out = () => setHover(false),
    over = (e) => {
      // eslint-disable-next-line no-sequences
      return e.stopPropagation(), setHover(true);
    };

  // ------------------------ Hooks
  useEffect(() => {
    document.body.style.cursor = hover
      ? "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 10 10 ,auto"
      : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hover]); // Change the cursor when hovering over the button
  useFrame((state) => {
    if (clicked && route !== null) {
      state.camera.rotation.x = destinationRotation.x;
      state.camera.lookAt(route);
    } else if (clickedTools && data === "Tools") {
      state.camera.position.x = buttonDestination.x - 5;
      state.camera.position.y = buttonDestination.y - 15;
      state.camera.position.z = buttonDestination.z - 15;
      state.camera.rotation.x = destinationRotation.x;
      state.camera.rotation.y = destinationRotation.y;
      state.camera.rotation.z = destinationRotation.z;
    } else if (clickedProjects && data === "Projects") {
      state.camera.position.x = buttonDestination.x - 5;
      state.camera.position.y = buttonDestination.y - 15;
      state.camera.position.z = buttonDestination.z - 15;
      state.camera.rotation.x = destinationRotation.x;
      state.camera.rotation.y = destinationRotation.y;
      state.camera.rotation.z = destinationRotation.z;
    }
    state.camera.updateProjectionMatrix();
  }); // move camera
  // -------------------------
  return (
    <Text3D
      castShadow
      ref={ref}
      lineHeight={0.5}
      letterSpacing={-0.05}
      font="/Inter-Bold.json"
      position={buttonPosition} //xyz
      rotation={[Math.PI / 4, 0, 0]}
      scale={scale}
      onPointerOver={over}
      onPointerOut={out}
      onClick={() =>
        data === "Tools" ? setClickedTools(true) : setClickedProject(true)
      }
    >
      {data?.split(" ").length > 1 ? data.split(" ")[1] : data}
      <meshBasicMaterial color={hover ? "#6666ff" : "#ffbb00"} />
    </Text3D>
  );
}
function AboutMe(data) {
  const name = "Quinsy Brenda",
    title = "About Me",
    allAboutMes = [];
  const { scrollYProgress } = useScroll(),
    [currentScrollVal, setCurrentScrollVal] = useState(0),
    gl = useThree((state) => state.gl);

  for (let i = 0; i < data.data.authors.length; i++) {
    allAboutMes[i] = data.data.authors[i].aboutMe;
  }

  const POSITIONS = {
    0: [-1, 1, 0],
    1: [-0.56, 2, 0],
    2: [-0.36, 3, 0],
    3: [-0.88, 4, 0],
    4: [-1.29, 5, 0],
  };

  useFrame(() => {
    setCurrentScrollVal(scrollYProgress.get());
  });
  if (currentScrollVal < 0.7) return null;
  else {
    gl.setPixelRatio(0.6);
    return (
      <>
        <Text3D
          lineHeight={0.5}
          letterSpacing={0.15}
          font="/Inter-Bold.json"
          position={[-2, 18, -18]} //xyz
          rotation={[Math.PI / 4, -Math.PI / 8, 0]}
          scale={[1.5, 1.5, 1.5]}
        >
          {title}
          <meshNormalMaterial />
        </Text3D>
        <mesh position={[4, 25, -20]} scale={3.8} castShadow>
          {allAboutMes.map((item, index) => {
            return (
              <Text
                key={index}
                rotation={[Math.PI / 4, 0, 0]}
                position={POSITIONS[index]}
                fontSize=".6"
                letterSpacing="-0.05"
                lineHeight="4"
                material-toneMapped="true"
              >
                {"    " + item}
                <meshNormalMaterial />
              </Text>
            );
          })}
        </mesh>

        <Text
          lineHeight={0.5}
          letterSpacing={0.025}
          //font="/Inter-Bold.json"
          position={[-3, 10, -12]} //xyz
          rotation={[Math.PI / 4, Math.PI / 10, 0]}
          scale={[14, 14, 14]}
        >
          {name}
          <meshNormalMaterial />
        </Text>
      </>
    );
  }
}
function Tools({
  label,
  labelPosition,
  labelRotation,
  data,
  position,
  rotation,
}) {
  return (
    <>
      <Text3D
        castShadow
        lineHeight={0.8}
        letterSpacing={0.05}
        font="/Inter-Bold.json"
        position={labelPosition}
        rotation={[labelRotation.x, labelRotation.y, labelRotation.z]}
        scale={[4, 4, 2]}
      >
        {label}
        <meshNormalMaterial flatShading />
      </Text3D>
      {data?.toolz.map((tools, idx) => (
        <Text3D
          cashShadow
          font="/Inter-Bold.json"
          key={idx}
          rotation={[rotation.x, rotation.y, rotation.z]}
          position={[
            position.x + (5 * idx) / 2,
            position.y,
            position.z - 3 * idx,
          ]}
          letterSpacing={0.08}
          scale={[4, 4, 1]}
        >
          {tools.tools}
          <meshNormalMaterial flatShading />
        </Text3D>
      ))}
    </>
  );
}
function Projects({ label, data }) {
  const [hover, setHover] = useState(false),
    ref = useRef(),
    out = () => setHover(false),
    over = (e) => {
      // eslint-disable-next-line no-sequences
      return e.stopPropagation(), setHover(true);
    };
  return (
    <>
      <Text3D
        castShadow
        lineHeight={0.8}
        letterSpacing={0.05}
        font="/Inter-Bold.json"
        position={[37, 65, -58]}
        rotation={[Math.PI / 4, -Math.PI / 2, 0]}
        scale={[2, 2, 0.5]}
      >
        {label}
        <meshNormalMaterial flatShading />
      </Text3D>
      {data?.projects.map((projects, idx) => (
        <Text
          ref={ref}
          key={idx}
          rotation={[Math.PI / 4, -Math.PI / 2, 0]}
          position={[33, 80 + idx / 2, -53 + idx]}
          letterSpacing={0.03}
          lineHeight={1.2}
          scale={[12, 12, 0.5]}
          onPointerOver={over}
          onPointerOut={out}
          onClick={() => window.open(projects.link)}
        >
          {projects.name}
          <meshBasicMaterial color={hover ? "#6666ff" : "#ffbb00"} />
          {/* <meshNormalMaterial flatShading /> */}
        </Text>
      ))}
    </>
  );
}
export default function CanvasModel() {
  /* --------Styles---------- */
  const container = {
    /* height: "100%", */
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const { data: dataA } = useAuthorsQuery(),
    { data: dataT } = useToolsQuery(),
    { data: dataP } = useProjectsQuery(),
    projectsButton = "Projects",
    toolsButton = "Tools";

  // -------------Variables
  const toolsLabel = "Tools",
    projectsLabel = "Projects",
    toolsButtonPosition = new THREE.Vector3(-4, 30, -3),
    toolsButtonRotation = new THREE.Vector3(Math.PI / 4, 0, 0),
    toolsButtonDestination = new THREE.Vector3(-12, 70, -18),
    toolsTextDestination = new THREE.Vector3(-30, 80, -75),
    toolsTextRotation = new THREE.Vector3(-Math.PI / 4, 0, Math.PI / 5),
    projectsButtonPosition = new THREE.Vector3(4, 30, -3),
    projectsButtonDestination = new THREE.Vector3(4, 100, -34),
    projectsButtonRotation = new THREE.Vector3(Math.PI / 4, -Math.PI / 2, 0);
  const toolsLabelPosition = new THREE.Vector3(-30, 63, -70),
    toolsLabelRotation = new THREE.Vector3(-Math.PI / 4, 0, Math.PI / 5);
  // --------------------------

  const route = useUIStore((state) => state.homeRoute);
  const rotation = useUIStore((state) => state.homeRotation);
  const clicked = useUIStore((state) => state.clickedState);
  const clickedTools = useUIStore((state) => state.clickedToolsState);
  const clickedProjects = useUIStore((state) => state.clickedProjectsState);
  const setClickedToolsState = useUIStore(
    (state) => state.setClickedToolsState
  );
  const setClickedProjectsState = useUIStore(
    (state) => state.setClickedProjectsState
  );

  if (route !== null && clicked) console.log("Route updated ...");
  return (
    <div style={container}>
      <Canvas
        perspective="false"
        powerpreference="low-power"
        gl={{ antialias: false, physicallyCorrectLights: true }}
        shadows
        shadowmap="true"
        colormanagement="true"
        camera
      >
        <Suspense fallback={<Loader />}>
          <fog attach="fog" args={["black", 18, 10]} />
          <Stars
            radius={50}
            depth={50}
            count={500}
            factor={5}
            saturation={5}
            fade
            speed={0.5}
          />
          <ambientLight intensity={0.2} />
          <ScrollThroughModel />
          <SceneLights />
          {dataA?.authors?.length && <AboutMe data={dataA} />}
          {dataT?.toolz?.length && (
            <Tools
              label={toolsLabel}
              labelPosition={toolsLabelPosition}
              labelRotation={toolsLabelRotation}
              data={dataT}
              position={toolsTextDestination}
              rotation={toolsTextRotation}
            />
          )}
          {dataP?.projects?.length && (
            <Projects label={projectsLabel} data={dataP} />
          )}
          {projectsButtonPosition && (
            <ButtonClickable
              data={projectsButton}
              buttonPosition={projectsButtonPosition}
              buttonDestination={projectsButtonDestination}
              destinationRotation={projectsButtonRotation}
              route={route}
              rotation={rotation}
              clicked={clicked}
              setClickedProject={setClickedProjectsState}
              setClickedTools={setClickedToolsState}
              clickedProjects={clickedProjects}
              clickedTools={clickedTools}
            />
          )}
          {toolsButtonPosition && (
            <ButtonClickable
              data={toolsButton}
              buttonPosition={toolsButtonPosition}
              buttonDestination={toolsButtonDestination}
              destinationRotation={toolsButtonRotation}
              route={route}
              rotation={rotation}
              clicked={clicked}
              setClickedProject={setClickedProjectsState}
              setClickedTools={setClickedToolsState}
              clickedProjects={clickedProjects}
              clickedTools={clickedTools}
            />
          )}
        </Suspense>
        <Environment
          files="/Cgtuts_OceanHDRIs_Freebie/008/008.hdr"
          background={true}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
