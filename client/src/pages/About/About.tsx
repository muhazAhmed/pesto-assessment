import { directWithNewTab, useLocalStorage } from "../../utils/commonFunctions";
import { motion } from "framer-motion";
import "./style.scss";

const About = () => {
  const defaultSettings = useLocalStorage("defaultSettings");

  return (
    <div className="about">
      <h1>About</h1>
      <div className="card">
        <motion.div
          className="item"
          onClick={() => directWithNewTab("https://github.com/muhazAhmed")}
          initial={
            defaultSettings?.isAnimationEnabled && { scale: 0.8, opacity: 0 }
          }
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={defaultSettings?.isAnimationEnabled && { scale: 1.1 }}
        >
          <i className="fa-brands fa-github"></i>
          <p>Check out my GitHub repositories and projects.</p>
        </motion.div>
        <motion.div
          className="item"
          onClick={() =>
            directWithNewTab("https://linkedin.com/in/muhazahmed/")
          }
          initial={
            defaultSettings?.isAnimationEnabled && { scale: 0.8, opacity: 0 }
          }
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={defaultSettings?.isAnimationEnabled && { scale: 1.1 }}
        >
          <i className="fa-brands fa-linkedin"></i>
          <p>Connect with me on LinkedIn for professional networking.</p>
        </motion.div>
        <motion.div
          className="item"
          onClick={() => directWithNewTab("https://instagram.com/muhaz_ahmd")}
          initial={
            defaultSettings?.isAnimationEnabled && { scale: 0.8, opacity: 0 }
          }
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={defaultSettings?.isAnimationEnabled && { scale: 1.1 }}
        >
          <i className="fa-brands fa-instagram"></i>
          <p>Follow me on Instagram to see my latest photos and updates.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
