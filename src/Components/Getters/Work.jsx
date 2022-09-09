import React, { Key, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import styles from "./ComponentStyles/Work.module.css";

import { useProjectsQuery } from "./fetchers/Projects";

function Work() {
  const { loading, error, data } = useProjectsQuery();
  let projects = [];

  if (loading) {
    <pre>Loading...</pre>;
  }
  if (error) {
    <pre>An Error occured while fetching the data</pre>;
  }
  if (data) {
    for (let i = 0; i < data.projects.length; i++) {
      projects[i] = [
        data.projects[i].name,
        data.projects[i].link,
        data.projects[i].tags,
      ];
    }
    projects = Object.values(projects);
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
    <div className={styles.container}>
      <div className={styles.ggr}>
        <div className={styles.pinkBlue} />
        <motion.h1
          animate={{
            color: [
              "rgb(242, 159, 255)",
              "rgb(124, 153, 255)",
              "rgb(95, 10, 213)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Works
        </motion.h1>
      </div>
      <div className={styles.wrapColumn}>
        <Suspense fallback={<pre>Loading ...</pre>}>
          <div style={{ padding: " 10% 0 0 0" }}>
            <motion.ul
              className={styles.gg}
              style={{ listStyle: "none" }}
              variants={container}
              initial="hidden"
              animate="show"
            >
              {data?.projects.map((projects) => (
                <Link href={projects.link} key={projects.name}>
                  <a className={styles.projectBox}>
                    <div className={styles.ggr}>
                      <div className={styles.blueGreen} />
                      <h3>{projects.name}</h3>
                      <div className={styles.disk}></div>
                    </div>
                    <motion.li variants={item} className={styles.projectItems}>
                      {projects.tags.map((tag) => (
                        <pre key={tag} className={styles.projectTags}>
                          {tag}
                        </pre>
                      ))}
                    </motion.li>
                  </a>
                </Link>
              ))}
            </motion.ul>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default Work;
