import { createContext, FC, useContext, useEffect, useState } from "react";
import { newLocalStorage, useLocalStorage } from "./commonFunctions";
import { loadData } from "./onPageLoad";
import toast from "react-hot-toast";

interface ProviderProps {
  children: React.ReactNode;
}

export const initialSettings = {
  isAnimationEnabled: true,
  enableCreatingNewTasks: true,
};

const SettingsContext = createContext<any>(null);

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider: FC<ProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState({
    isAnimationEnabled: true,
    enableCreatingNewTasks: true,
  });

  useEffect(() => {
    const storedSettings = useLocalStorage("defaultSettings");
    if (storedSettings) {
      setSettings(storedSettings);
    } else {
      newLocalStorage("defaultSettings", settings);
    }
    loadData();
  }, []);

  const updateSettings = (newSettings: any) => {
    setSettings(newSettings);
    newLocalStorage("defaultSettings", newSettings);
  };

  const resetSettings = () => {
    setSettings(initialSettings);
    newLocalStorage("defaultSettings", initialSettings);
    return toast.success("Settings reset to default");
  };

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
