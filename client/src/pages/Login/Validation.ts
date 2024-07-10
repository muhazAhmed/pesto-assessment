import toast from "react-hot-toast";
import {
    ResponseMessage,
    validEmail,
    validNameString,
} from "../../utils/Validations";

export const registerValidations = (inputs: any, setValidated: any) => {
    if (!validNameString(inputs.name)) {
        setValidated(false);
        return toast.error(ResponseMessage("Name").REQUIRED_FIELD);
    }
    if (!validNameString(inputs.email)) {
        setValidated(false);
        return toast.error(ResponseMessage("Email").REQUIRED_FIELD);
    }
    if (validEmail(inputs.email)) {
        setValidated(false);
        return toast.error(ResponseMessage("").INVALID_EMAIL);
    }
    if (!validNameString(inputs.password)) {
        setValidated(false);
        return toast.error(ResponseMessage("Password").REQUIRED_FIELD);
    }
    setValidated(true);
    return null;
};

export const loginValidation = (inputs: any) => {
    if (!validNameString(inputs.email)) {
        toast.error(ResponseMessage("Email").REQUIRED_FIELD);
        return false;
    }
    if (!validNameString(inputs.password)) {
        toast.error(ResponseMessage("Password").REQUIRED_FIELD);
        return false;
    }
    return true;
}