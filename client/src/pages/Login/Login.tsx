import { FC, useState } from "react";
import PopupModal from "../../components/PopupModal/PopupModal";
import { motion, AnimatePresence } from "framer-motion";
import "./style.scss";
import { loginValidation, registerValidations } from "./Validation";
import { PostMethodAPI } from "../../utils/axios";
import { serverVariables } from "../../utils/ServerVariables";
import { newLocalStorage } from "../../utils/commonFunctions";

interface ModalProps {
  setModal: any;
  setLoading: any;
}

const Login: FC<ModalProps> = ({ setModal, setLoading }) => {
  const [pageType, setPageType] = useState<string>("login");
  const [valid, setValid] = useState<boolean>(false);
  const [inputs, setInputs] = useState<any>({
    name: "",
    email: "",
    password: "",
  });

  const changePage = () => {
    setPageType(pageType === "login" ? "register" : "login");
  };

  const handleInputChange = (e: any) => {
    setInputs((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const SuccessResponse = (result: any, res: any) => {
    newLocalStorage("userInfo", result);
    newLocalStorage("userToken", res?.res?.data?.token);
    setValid(false);
    setModal(false);
  };

  const handleSubmit = async () => {
    if (pageType === "login") {
      const isValid = loginValidation(inputs);
      setValid(isValid);
      if (isValid) {
        const res = await PostMethodAPI(
          serverVariables?.LOGIN_USER,
          inputs,
          setLoading
        );
        if (res instanceof Error) {
          console.error(res.message);
        } else if (res.res.status === 200) {
          const result = res?.res?.data?.user;
          SuccessResponse(result, res);
        } else {
          return false;
        }
      }
    } else {
      registerValidations(inputs, setValid);
      if (valid) {
        const res = await PostMethodAPI(
          `${serverVariables.NEW_USER}`,
          inputs,
          setLoading
        );
        if (res instanceof Error) {
          console.error(res.message);
        } else if (res.res.status === 201) {
          const result = res?.res?.data?.result;
          return SuccessResponse(result, res);
        }
      }
    }
  };

  return (
    <PopupModal setModal={setModal} className="form">
      <div className="form">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageType}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              overflow: "hidden",
            }}
          >
            <h3>{pageType === "login" ? "Login" : "Register"}</h3>
            {pageType === "register" && (
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={inputs?.name || ""}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={inputs?.email || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={inputs?.password || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="btn">
              <button onClick={handleSubmit}>
                {pageType === "login" ? "Login" : "Register"}
              </button>
              <button onClick={changePage}>
                {pageType === "login"
                  ? "Create New Account"
                  : "Login Existing Account"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </PopupModal>
  );
};

export default Login;
