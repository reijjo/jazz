"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usernameCheck = (username) => {
    if (username.length < 3 || username.length > 20) {
        return {
            message: "Username length must be 3 - 20 characters.",
            info: "error",
        };
    }
    if (!username.match(/^[A-Za-z0-9-_.]+$/)) {
        return {
            message: "Only letters, numbers and -_. allowed in username.",
            info: "error",
        };
    }
    return undefined;
};
const emailCheck = (email) => {
    if (!email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
        return {
            message: "Shady email address.",
            info: "info-error",
        };
    }
    if (email.length > 60) {
        return {
            message: "Max 60 characters on email",
            info: "info-error",
        };
    }
    return undefined;
};
const passwdCheck = (passwd) => {
    if (passwd.length < 8 || passwd.length > 30) {
        return {
            message: "Password length must be 8 - 30 characters.",
            info: "info-error",
        };
    }
    if (!/\d/.test(passwd)) {
        return {
            message: "Password must contain at least one number.",
            info: "info-error",
        };
    }
    if (!/[A-Z]/.test(passwd)) {
        return {
            message: "Password must contain at least one Uppercase letter.",
            info: "info-error",
        };
    }
    if (!/[!._\-@#*$]/.test(passwd)) {
        return {
            message: "Password must contain at least one special character (!._-@#*$).",
            info: "info-error",
        };
    }
    return undefined;
};
const passwd2Check = (passwd, passwd2) => {
    if (passwd2 !== passwd) {
        return {
            message: "Passwords do not match!",
            info: "info-error",
        };
    }
    return undefined;
};
const isValid = {
    usernameCheck,
    emailCheck,
    passwdCheck,
    passwd2Check,
};
exports.default = isValid;
