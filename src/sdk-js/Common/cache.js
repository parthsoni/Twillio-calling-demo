/*
 * Created by favcy-pc on 10-06-2017.
 */
export function getLocalData(key, defaultValue) {

    let data = "";
    if(defaultValue !== undefined) {
        data = defaultValue;
    }
    if (typeof (window.localStorage) !== "undefined" && typeof (Storage) !== "undefined") {
        try {
            let dataSet = localStorage.getItem(key);
            if(null!==dataSet) {
                dataSet = JSON.parse(dataSet);
                data= dataSet.value;
            }
            if((null!==dataSet || dataSet) && dataSet.expiry!==null && Date.now() >
                dataSet.timestamp && (parseInt(Date.now())-parseInt(dataSet.timestamp)) >=parseInt(dataSet.expiry)) {
                data=null;
                removeLocalData(key);
            }

        } catch (err) {
        }

    }
    return data;
}
export function setLocalData(key, value, timestamp) {

    if (typeof (window.localStorage) !== "undefined" && typeof (Storage) !== "undefined") {

        try {
            let dataSet = {};
            dataSet.value = value;
            dataSet.timestamp =Date.now();
            dataSet.expiry = undefined!==timestamp ? timestamp:null;
            localStorage.setItem(key, JSON.stringify(dataSet));
        } catch (err) {
        }
    }
}

export function removeLocalData(key)
{
    try {
        localStorage.removeItem(key);
    } catch (err) {
    }
}
