/**
 * The class provides, wrapper functions for HTTP methods
 * @param {object} config - HTTP Header Configuration, specified as a JSON Object
 * @constructor
 * @tutorial http-tutorial
 * @example
 * var config = {
 *           'appid': 'T4FW87AUDBEQQDP',
 *           'app-id': 'T4FW87AUDBEQQDP',
 *           'auth-token': '6fbe63c620d4bc9482424bc67a738491',
 *           'Content-Type': ' application/x-www-form-urlencoded',
 *           'Accept': 'application/json',
 *
 *       };
 * var httpHandler = new HttpHandler(config);
 * // => object
 */
import {parseURLParams, generateUUID, addTrackingParams} from "./common";
import axios from "axios";

import  {setLocalData, getLocalData} from "./cache";

export function  HttpHandler (config) {

    let parentId = 0;
    let startPoint = 0;
    const mConfig = config;

    let querystring = require('querystring');
    /**
     *
     * @param url
     * @return {AxiosPromise}
     */
    this.httpGet = function (url) {
        return axios.get(url, {headers: mConfig});
    };

    /**
     *  Function executes an HTTP PUT Request to the URL. Is used
     *  for APIs modifying an endpoint.
     * @param {String} url - URL of the endpoint to Put
     * @param {JSON} data - Data in JSON Format
     * @param {Function} callback callback function of type function myFunction(response).
     *                            The function is called on the request getting completed
     * @example
     * var config = {
            'appid': 'T4FW87AUDBEQQDP',
            'app-id': 'T4FW87AUDBEQQDP',
            'auth-id': '6fbe63c620d4bc9482424bc67a738491',
            'Content-Type': ' application/x-www-form-urlencoded',
            'Accept': 'application/json',

        };
     var data = { 'gender': 'male'}
     var httpHandler = new HttpHandler(config);
     httpHandler.httpPut("https://www.favcy.com/api/1.0/user/me", data, function (response) {
        console.log(response);
     });
     */
    this.httpPut = function (url, data) {

        return axios.put(url, data, {headers: mConfig});
    };

    /**
     *  Function executes an HTTP POST Request to the URL. Is used
     *  for APIs creating an endpoint.
     * @param {String} url - URL of the endpoint to Put
     * @param {JSON} data - Data in JSON Format
     * @param {Function} callback callback function of type function myFunction(response).
     *                            The function is called on the request getting completed
     * @example
     * var config = {
            'appid': 'T4FW87AUDBEQQDP',
            'app-id': 'T4FW87AUDBEQQDP',
            'auth-id': '6fbe63c620d4bc9482424bc67a738491',
            'Content-Type': ' application/x-www-form-urlencoded',
            'Accept': 'application/json',

        };
     var data = { 'gender': 'male'}
     var httpHandler = new HttpHandler(config);
     httpHandler.httpPost("https://www.favcy.com/api/1.0/user/me", data, function (response) {
        console.log(response);
     });
     */
    this.httpPost = function (url, data) {
        return axios.post(url, querystring.stringify(data), {headers: mConfig});
    };


}
