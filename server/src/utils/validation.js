export const REQUIRE_FIELD = (name) => {
    return `${name} is Required`; 
}

export const PASSWORD_INCORRECT = () => {
    return "Email Or Password Incorrect"
}

export const EMAIL_EXISTS = () => {
    return "Email Already Exists"
}

export const RESPONSE_MESSAGE = (name) => ({
    USER_REGISTER: `${name} Registration Success`,
    USER_LOGIN: `${name} Login Success`,
    NEW_TASK: `New Task Has Been Created Successfully`,
    USER_UPDATE_REQ: "Update Request has Been Submitted to HR",
    USER_UPDATE: "Updated Successfully",
    NO_USER_FOUND: "No User Found",
    SERVER_ERROR: "Server Error",
})