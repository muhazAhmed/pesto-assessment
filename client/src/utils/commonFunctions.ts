import toast from "react-hot-toast";
import { ResponseMessage } from "./Validations";

// Session Storage
export const newSessionStorage = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const deleteSessionStorage = (key: string) => {
    sessionStorage.removeItem(key);
};

export const useSessionStorage = (key: string) => {
    const items = sessionStorage.getItem(key);
    return items ? JSON.parse(items) : null;
};

// Local Storage
export const newLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const deleteLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

export const useLocalStorage = (key: string) => {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : null;
};

export const logout = (navigate: any, modalState?: any) => {
    deleteLocalStorage("userInfo");
    deleteLocalStorage("defaultSettings");
    toast.success(ResponseMessage("").LOGOUT_SUCCESS)
    modalState ? closeModal(modalState) : "";
    return navigate("/");
};

export const openModal = (setModal: any) => { return setModal(true) };
export const closeModal = (setModal: any) => { return setModal(false) };
export const goBack = () => { return history.back() };

export const ResponseInstances = (res: any, statusCode: number, setData: any) => {
    if (res instanceof Error) {
        return console.error(res.message);
    } else if (setData != "" && res?.res?.status === statusCode) {
        return setData(res?.res?.data)
    } else {
        return
    }
}

export const fetchUserId = useSessionStorage("userInfo")?._id

export const directWithNewTab = (url: string) => {
    return window.open(url, '_blank');
}