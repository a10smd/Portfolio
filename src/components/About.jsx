import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full p-[1px] rounded-[20px] shadow-card relative overflow-hidden"
        style={{ position: "relative" }}
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-[#020212] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col relative z-10"
        >
          <img
            src={icon}
            alt="web-development"
            className="w-16 h-16 object-contain"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
        <div className="glow"></div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        As a Software Engineer deeply entrenched in web development, I've honed
        my skills across a wide spectrum of languages and tools. My expertise
        encompasses everything from React and React Native to TypeScript,
        reflecting my commitment to staying at the forefront of industry trends.
        I thrive on leveraging the latest advancements to craft innovative
        solutions that push the boundaries of what's possible in web
        development. With a keen eye for emerging technologies and a passion for
        pushing boundaries, I'm always ready to tackle new challenges head-on
        and deliver exceptional results.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
