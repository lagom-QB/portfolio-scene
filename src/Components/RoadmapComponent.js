import "./Styles/Roadmap.css";
import { useState } from "react";
// import { motion } from "framer-motion";
import { useUIStore } from "../App";
import * as THREE from "three";
/* ------------Navigation Module ------------------- */
/* function NavItem({ changeLocation, children, offset, isActive }) {
  const ref = useRef();
  const place = {
    cursor: "pointer",
    transition: "all 0.5s easeInOut",
    borderRadius: "5%",
    scale: isActive ? 1.2 : 1,
  };

  return (
    <motion.h1
      ref={ref}
      style={place}
      onClick={() => {
        changeLocation(ref);
      }}
      initial={{
        x: -offset,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: -offset,
        opacity: 0,
      }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
    >
      {children}
    </motion.h1>
  );
} */
/* -------------------------------------------------- */
const RoadMap = () => {
  const [isExpanded, setIsExpanded] = useState(false),
    homeDestination = new THREE.Vector3(0, 10, -5),
    homeRotation = new THREE.Euler(0, -Math.PI / 12, 0);

  const setHomeRoute = useUIStore((state) => state.setHomeRoute);
  const setHomeRotation = useUIStore((state) => state.setHomeRotation);
  const setHomeState = useUIStore((state) => state.setHomeState);
  const setClickedToolsState = useUIStore(
    (state) => state.setClickedToolsState
  );
  const setClickedProjectsState = useUIStore(
    (state) => state.setClickedProjectsState
  );

  //------------------------Styles
  const footer = {
      position: "fixed",
    bottom: "2%",
      left: "40vw",
      backgroundColor: "transparent",
      maxHeight: "2rem",
    },
    roadMapDiv = {
      display: "flex",
      width: "min(60vw, calc(70%))",
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
    },
    button = {
      backgroundColor: "transparent",
      cursor: "pointer",
      transition: "all 0.5s easeIn",
      opacity: !isExpanded ? 1 : 0.8,
      fontSize: "clamp(.8rem, 1vw, 1rem)",
      transform: `scale(${!isExpanded ? "1" : "2"})`,
    };
  /* ---------------- */

  return (
    <div style={footer}>
      <div style={roadMapDiv}>
        <div
          style={button}
          onClick={() => {
            // eslint-disable-next-line no-sequences
            return (
              setIsExpanded(!isExpanded),
              setHomeRoute(homeDestination),
              setHomeRotation(homeRotation),
              setHomeState(false), ///
              setClickedToolsState(false),
              setClickedProjectsState(false)
            );
          }}
        >
          <h1>{isExpanded ? "X" : "RoadMap"}</h1>
        </div>
      </div>
    </div>
  );
};

export default function RoadMapComponent() {
  return <RoadMap />;
}
