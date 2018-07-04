/*
 * Created by favcy-pc on 10-06-2017.
 */

import {getLocalData} from "./cache";


let isinitCalled = false;

export function loadjscssfile(filename, filetype) {
    let fileref;
    if (filetype === "js") { //if filename is a external JavaScript file
        fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype === "css" && !loadCSSIfNotAlreadyLoadedForSomeReason(filename)) {
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
        fileref.setAttribute("async", false);
    }
    if (typeof fileref !== "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);

    return new Promise(function (resolve, reject) {
        resolve(1);
        reject("Function could not be executed");
    })

}

function loadCSSIfNotAlreadyLoadedForSomeReason(filename) {
    const ss = document.styleSheets;
    for (let i = 0, max = ss.length; i < max; i++) {
        if (ss[i].href === filename)
            return true;
    }
    return false;
}


export function parseURLParams() {
    let urlParams = [];
    window.location.search
        .replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
                urlParams[key] = value;
            }
        );
    return urlParams;
}


export function objExtend(obj1, obj2) {
    let keys = Object.keys(obj2);
    for (let i = 0; i < keys.length; i += 1) {
        let val = obj2[keys[i]];
        obj1[keys[i]] = ['string', 'number', 'array', 'boolean', 'undefined'].indexOf(typeof val) === -1 ? objExtend(obj1[keys[i]] || {}, val) : val;
    }
    return obj1;
}


export function raiseEvent(mEventManager, eventName, eventData) {

    if (mEventManager) {
        mEventManager.fire(eventName, eventData);
    }
}


export function formatSecondsAsTime(secs, format) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (hr) {
        hr = "00";
    }

    if (format != null) {
        var formatted_time = format.replace('hh', hr);
        formatted_time = formatted_time.replace('h', hr * 1 + ""); // check for single hour formatting
        formatted_time = formatted_time.replace('mm', min);
        formatted_time = formatted_time.replace('m', min * 1 + ""); // check for single minute formatting
        formatted_time = formatted_time.replace('ss', sec);
        formatted_time = formatted_time.replace('s', sec * 1 + ""); // check for single second formatting
        return formatted_time;
    } else {
        return hr + ':' + min + ':' + sec;
    }
}


export function createElement(id) {
    let elem = null !== document.getElementById(id) ?
        document.getElementById(id) : document.createElement('div');
    elem.id = id;
    document.body.appendChild(elem);
    return document.getElementById(id)
}


export let initValuex = function(config) {
    const configuration = require('../json/config.json');
    return new Promise(function (resolve, reject) {

        if (undefined !== window.ValuexSDK) {

            let defaultConfig = {
                style: {
                    primaryColor: '#e91e63',
                    secondaryColor: 'blue'
                },
            }
            defaultConfig.app_id = configuration.appId;
            if (getLocalData(defaultConfig.app_id + "_authToken") !== "") {
                defaultConfig.token = getLocalData(configuration.app_id + "_authToken");
            }

            if (undefined !== config) {
                defaultConfig = objExtend(defaultConfig, config);
            }

            if(isinitCalled) {
                resolve(window.ValuexSDK.getInstance());
            }


            if(!isinitCalled) {
                window.ValuexSDK.getInstance().init(defaultConfig).then(function (response) {
                    isinitCalled = true;
                    if (getLocalData("valuex-token") === null || getLocalData("valuex-token") === "") {
                        resolve(window.ValuexSDK.getInstance());
                    } else {
                        window.ValuexSDK.getInstance().setToken(getLocalData("valuex-token"));
                        resolve(generateToken());
                    }
                });
            }
        }
    });

}


export function generateToken()
{
    return new Promise(function (resolve, reject) {

        window.ValuexSDK.getInstance().getUserDetail().then(function (response) {
            window.ValuexSDK.getInstance().generateToken().then(
                response => {
                    resolve(window.ValuexSDK.getInstance());
                },
                error => {
                    reject(error);
                });
        },
            error => {
            console.log(error);
            });
    });

}