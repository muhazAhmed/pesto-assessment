import "./style.scss";
import Switch from "react-switch";
import { toggleItems } from "./ArrayOfItems";
import { useSettings } from "../../utils/SettingsContext";

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings();

  const handleToggleAction = (item: string) => {
    const updatedSettings = { ...settings, [item]: !settings[item] };
    updateSettings(updatedSettings);
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="setting-container">
        <h3>General Settings</h3>
        {toggleItems?.map((item: any, index: number) => (
          <div className="items" key={index}>
            <label>{item?.label}</label>
            <Switch
              onChange={() => handleToggleAction(item?.value)}
              checked={settings?.[item?.value]}
              uncheckedIcon
              checkedIcon
              onColor="#6e62e4"
              height={23}
              width={50}
            />
          </div>
        ))}
        <button onClick={resetSettings}>Reset to Default</button>
      </div>
    </div>
  );
};

export default Settings;
