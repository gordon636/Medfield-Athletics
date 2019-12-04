import Cookies from "universal-cookie";
import settings from "../assets/json/settings";
import uuid from "uuid";

export default class Utils {
    /**
     * Attempts to find a setting in the settings.json file which has a matching key
     * @param key
     * @returns the value of the setting or null if it does not exist
     */
    static findSetting(key) {
        if (settings.hasOwnProperty("length")) {
            for (let settingsIndex = 0; settingsIndex < settings.length; settingsIndex++) { // for all settings
                if (settings[settingsIndex].key === key) { // if the keys match
                    return settings[settingsIndex].value;
                }
            }
        }
        return null;
    }

    /**
     * Find matching user by url for displaying table username
     */
    static matchUserByUrl(userList, url) {
        for (let userIndex = 0; userIndex < userList.length; userIndex++) {
            if (userList[userIndex].url === url) {
                return userList[userIndex]
            }
        }
    }

    static matchUserByEmail(userList, email) {
        for (let userIndex = 0; userIndex < userList.length; userIndex++) {
            if (userList[userIndex].email === email) {
                return userList[userIndex]
            }
        }
    }

    static matchUserFromCookie(userList) {
        const cookies = new Cookies(); // bring in cookie support
        const email = cookies.get("currentUserEmail");
        for (let userIndex = 0; userIndex < userList.length; userIndex++) { // for all known users
            if (userList[userIndex].email === email) // match email
                return userList[userIndex]; // just return our user. do not modify state.
        }
    };

    static getEmailFromCookie() {
        const cookies = new Cookies(); // bring in cookie support
        return cookies.get("currentUserEmail");
    };

    static isAdminUser(user) {
        // sanity check
        if (!user.hasOwnProperty("email") || !user.hasOwnProperty("url")) {
            return false;
        }

        let admins = this.findSetting("admin-users"); // get admin list
        for (let adminIndex = 0; adminIndex < admins.length; adminIndex++) {
            if (admins[adminIndex] === user.email) {
                return true;
            }
        }

        return false;
    }

    /**
     * This is temporary and needs to be fixed ASAP!
     * ...only keeping the honest people out.
     * @param password
     */
    static matchAdminPassword(password) {
        let settingPass = this.findSetting("admin-password"); // get admin list
        return (settingPass != null && settingPass && password === settingPass);
    }

    // static getHostname() {
    //     return window.location.hostname;
    // }

    static getHostname() {
        return this.findSetting("hostname");
    }

    static getAPIUrl() {
        return "http://" + this.getHostname() + ":8000/"
    }

    static getThresholds() {
        return this.findSetting("thresholds");
    }

    static setWindowWidth(width) {
        const cookies = new Cookies(); // bring in cookie support
        cookies.set('windowWidth', width, {path: '/'});
        return
    };

    static getWindowWidth() {
        const cookies = new Cookies(); // bring in cookie support
        return cookies.get("windowWidth");
    };

    static generateUUID() {
        return uuid.v1();
    }

    static getIDfromURL(url) {
        if (!url)
            return null;
        let urlArray = url.split("/");
        if (urlArray.length > 2)
            return urlArray[urlArray.length - 2];
        else
            return null;
    }
}
