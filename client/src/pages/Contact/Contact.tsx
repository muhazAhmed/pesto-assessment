import { fetchUserId, useLocalStorage } from "../../utils/commonFunctions";
import { motion } from "framer-motion";
import "./style.scss";
import { useState } from "react";
import { PostMethodAPI } from "../../utils/axios";
import { serverVariables } from "../../utils/ServerVariables";
import Loading from "../../components/Loading/Loading";

const Contact = () => {
  const [inputs, setInputs] = useState<any>({
    name: "",
    email: "",
    message: "",
    userId: fetchUserId ? fetchUserId : "-",
  });
  const defaultSettings = useLocalStorage("defaultSettings");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setInputs((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    await PostMethodAPI(serverVariables?.NEW_MESSAGE, inputs, setLoading);
  };

  return (
    <div className="contact">
      {loading && <Loading />}
      <motion.div
        className="left"
        initial={defaultSettings?.isAnimationEnabled && { opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <input
          placeholder="Your Name"
          name="name"
          value={inputs?.name || ""}
          onChange={handleInputChange}
        />
        <input
          placeholder="Your Email"
          type="email"
          name="email"
          value={inputs?.email || ""}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Share your thoughts..."
          name="message"
          value={inputs?.message || ""}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>
          <i className="fa-solid fa-rocket"></i>Submit
        </button>
      </motion.div>
      <motion.div
        className="right"
        initial={defaultSettings?.isAnimationEnabled && { opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="header">
          <h1>Contact</h1>
          <h2>
            <p></p> Us
          </h2>
        </div>
        <p>
          We value your feedback and inquiries. For questions, support, or
          suggestions, please use the contact form below or email us at&nbsp;
          <span
            onClick={() =>
              (window.location.href = "mailto:muhazvla313@gmail.com")
            }
          >
            muhazvla313@gmail.com
          </span>
          . We aim to respond within 24 hours. Your satisfaction is our
          priority, and we look forward to hearing from you.
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
