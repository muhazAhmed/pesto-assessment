import "./style.scss";
import Switch from "react-switch";
import { toggleItems } from "./ArrayOfItems";
import { useSettings } from "../../utils/SettingsContext";
import { useState } from "react";
import DeleteModal from "../Dashboard/SubComponents/DeleteModal";
import { fetchUserId, openModal } from "../../utils/commonFunctions";
import Login from "../Login/Login";
import Loading from "../../components/Loading/Loading";

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [formModal, setFormModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggleAction = (item: string) => {
    const updatedSettings = { ...settings, [item]: !settings[item] };
    updateSettings(updatedSettings);
  };

  return (
    <div className="settings">
      {loading && <Loading />}
      {logoutModal && <DeleteModal setModal={setLogoutModal} page="logout" />}
      {formModal && <Login setLoading={setLoading} setModal={formModal} />}
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
      <div className="setting-container">
        <h3>Account Settings</h3>
        <div className="items">
          <label>{fetchUserId ? "Switch account / Logout" : "Login"}</label>
          <button
            id={fetchUserId ? "logout" : "login"}
            onClick={() =>
              openModal(fetchUserId ? setLogoutModal : setFormModal)
            }
          >
            {fetchUserId ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
