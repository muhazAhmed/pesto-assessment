import toast from "react-hot-toast";
import { ResponseMessage, validNameString } from "../../utils/Validations";

export const formValidation = (inputs: any) => {
    if (!validNameString(inputs.title)) {
        toast.error(ResponseMessage("Title").REQUIRED_FIELD);
        return false;
    }
    if (!validNameString(inputs.description)) {
        toast.error(ResponseMessage("Description").REQUIRED_FIELD);
        return false;
    }
    return true;
}