export const ResponseMessage = (name?: any) => ({
  SERVER_ERROR: "Server Under Maintenance",
  UNAVAILABLE: "Temporarily Unavailable",
  TRY_AGAIN: "Please Try Again After Some Time",
  FILTER_APPLIED: `${name} Filter Applied`,
  SETTINGS_DISABLED: `${name} has been disabled in Settings`,
  SERVER_RESTART: "Please wait until server gets restarted",
  CONNECTED: "Connection Successful",

  // ============ Form ==========
  REQUIRED_FIELD: `Please Enter ${name}`,
  INVALID_EMAIL: "Please Enter Valid Email Address",
  INVALID_PHONE: "Please Enter Valid Phone Number",
  INVALID_PASSWORD:
    "Password Must Have At-Least 8 Characters With Minimum 1 Number And Alphabet",
  PASSWORD_NOT_MATCHING: "Passwords Not Matching",
  LOGIN_SUCCESS: "You Have Been LoggedIn",
  LOGOUT_SUCCESS: "You Have Been LoggedOut",

  // =========== API =============
  GET_FAIL: "Enable To Fetch Data",
  REGISTER_SUCCESS: `${name} Registration Successful`,
  REQUEST_SUBMITTED: "Your Request has been Sent",
  USER_ERROR: `Only ${name} can perform this Action`,
});

export const validNameString = (name: string) => {
  if (name.length < 1 && name !== typeof String) return false;
  return true;
};

export const minStringLength = (name: string) => {
  if (name.length < 4) return false;
  return true;
};

export const validEmail = (email: string) => {
  if (typeof email !== "undefined" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
  return false;
};

export const validPhone = (phone:string) => {
  if (typeof phone !== "undefined" && !/^\d{10}$/.test(phone)) return true;
  return false;
}

export const validPassword = (password: string) => {
  if (password != "undefined" && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) return true;
  return false;
};

export const validLength = (item: any, length: number) => {
  if (item.length < length) return false;
  return true;
}