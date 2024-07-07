import axios from "axios";
import { API_URI } from "./Constants";
import toast from "react-hot-toast";
import { ResponseMessage } from "./Validations";

interface ApiResponse {
  response: any;
  status: number;
  message: string;
  data: any;
}

const serverError = (error: any) => {
  console.error(error);
  if (error?.response?.status === 404)
    return new Error(toast.error(ResponseMessage("").SERVER_ERROR));
  return new Error(
    toast.error(error?.response?.data || ResponseMessage("").SERVER_ERROR)
  );
};

export const PostMethodAPI = async (
  variable: string,
  inputs: any,
  loading: (isLoading: boolean) => void
): Promise<{ res: ApiResponse; successMessage: string } | Error> => {
  try {
    loading(true);
    const res: ApiResponse = await axios.post(API_URI + variable, inputs);
    if (res.status === 201 || res.status === 200) {
      const successMessage = res?.data?.message || "";
      toast.success(successMessage, {
        duration: 4000,
      });
      return { res, successMessage };
    } else {
      return serverError(res);
    }
  } catch (error: any) {
    return serverError(error);
  } finally {
    loading(false);
  }
};
