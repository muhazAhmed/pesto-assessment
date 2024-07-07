import axios from "axios";
import { API_URI } from "./Constants";
import { serverVariables } from "./ServerVariables";
import toast from "react-hot-toast";
import { ResponseMessage } from "./Validations";
import { newLocalStorage, useLocalStorage } from "./commonFunctions";
import { initialSettings } from "./SettingsContext";

// ============ To Load The Server Initially ============
export const loadServer = async () => {
    try {
        await axios.get(API_URI + serverVariables?.RELOAD_SERVER);
    } catch (error) {
        console.error("Server Is Not Connected");
        toast.error(ResponseMessage()?.SERVER_ERROR);
    }
};

export const defaultSettings = () => {
    const fetchExistingData = useLocalStorage("defaultSettings");
    if (!fetchExistingData) {
        newLocalStorage("defaultSettings", initialSettings);
    }
};

//  ===========  All In functions =========
export const loadData = () => {
    loadServer();
    defaultSettings();
};
