export const ResponseMessage = (name?: any) => ({
  SERVER_ERROR: "Server Under Maintenance",
  UNAVAILABLE: "Temporarily Unavailable",
  TRY_AGAIN: "Please Try Again After Some Time",
  FILTER_APPLIED: `${name} Filter Applied`,
  SETTINGS_DISABLED: `${name} has been disabled in Settings`,

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
