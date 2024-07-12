import axios from "axios";
import { API_URI } from "./Constants";
import { serverVariables } from "./ServerVariables";
import toast from "react-hot-toast";
import { ResponseMessage } from "./Validations";
import {
  fetchUserId,
  newLocalStorage,
  newSessionStorage,
  ResponseInstances,
  useLocalStorage,
  useSessionStorage,
} from "./commonFunctions";
import { initialSettings } from "./SettingsContext";
import { taskDummyItems } from "../pages/DummyData";
import { GetMethodAPI } from "./axios";

// ============ To Load The Server Initially ============
export const loadServer = async () => {
  try {
    const apiCall = axios.get(API_URI + serverVariables?.RELOAD_SERVER);
    const timer = new Promise((resolve) => {
      setTimeout(() => {
        resolve("timeout");
      }, 7000);
    });

    const response = await Promise.race([apiCall, timer]);
    if (!useSessionStorage("afg44")) {
      if (response === "timeout") {
        newSessionStorage("afg44", false);
        return toast.error(ResponseMessage()?.SERVER_RESTART);
      } else {
        newSessionStorage("afg44", true); //To disable default connection toast
        return toast.success(ResponseMessage()?.CONNECTED);
      }
    }
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

export const createDummyData = () => {
  if (!fetchUserId) {
    newSessionStorage("dummy-data", taskDummyItems);
    newSessionStorage("isDemoAccount", true);
    newLocalStorage("1rfg3", false); //To show the login warning popup
  } else {
    return;
  }
};

export const fetchDummyData = () => {
  if (!fetchUserId) {
    return useSessionStorage("dummy-data");
  } else {
    return;
  }
};

export const fetchAllTasks = async (setLoading: any, setData?: any) => {
  const res = await GetMethodAPI(
    serverVariables?.FETCH_ALL_TASK + fetchUserId,
    "",
    setLoading
  );
  setData &&
    ResponseInstances(res, 200, (responseData: any) => {
      setData(responseData);
    });
};

//  ===========  All In functions =========
export const loadData = () => {
  loadServer();
  defaultSettings();
  createDummyData();
  fetchUserId;
};
