import React, { Key, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Html,
  Text3D,
  Text,
} from "@react-three/drei";
import styles from "./ComponentStyles/About.module.css";

import { useToolsQuery } from "./fetchers/Tools";

function Tools() {
  const { loading, error, data } = useToolsQuery();
  let tools = [];

  if (loading) {
    <pre>Loading...</pre>;
  }
  if (error) {
    <pre>An Error occured while fetching the data</pre>;
  }
  if (data) {
    for (let i = 0; i < data.toolz.length; i++) {
      tools[i] = [[data.toolz[i].tools, data.toolz[i].level]];
    }
    tools = Object.values(tools);
  }

  const container = {
    hidden: {
      x: 60,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 2,
        delayChildren: 1.2,
        staggerChildren: 0.5,
        type: "spring",
        stiffness: 10,
        mass: 2,
        damping: 5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div>
      <div>
        <Text>⚒️🪖</Text>
      </div>
      <Suspense fallback={<pre>Loading ...</pre>}>
        <motion.mesh
          position={[4, 25, -20]}
          scale={3.8}
          castShadow
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            type: "wobbly",
            damping: 10,
            stiffness: 100,
            duration: 5,
          }}
        >
          {data?.toolz.map((tools) => (
            <Text3D key={tools.tools}>{tools.tools}</Text3D>
          ))}
        </motion.mesh>
      </Suspense>
    </div>
  );
}

export default Tools;
