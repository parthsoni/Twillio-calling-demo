/**
 * Created by rajachhabra on 06/11/17.
 */
import {HttpHandler} from "../sdk-js/Common/http";

var assert = require('assert');

describe('HTTP', function () {
    /*describe('Test HTTP Constructor', function () {
        it('Should return an object of the type HttpHandler', function () {
            let config = {
                'appid': 'T4FW87AUDBEQQDP',
                'app-id': 'T4FW87AUDBEQQDP',
                'auth-id': '6fbe63c620d4bc9482424bc67a738491',
                'Content-Type': ' application/x-www-form-urlencoded',
                'Accept': 'application/json',

            };
            let httpHandler = new HttpHandler(config);
            assert.equal(typeof httpHandler, 'object');
        })
    });*/

    describe('Test HTTP Get', function () {
        it('Should return the App Information', function (done) {
            let config = {
                'appid': 'A9FKZEJCMKADFGZ',
                'app-id': 'A9FKZEJCMKADFGZ',
                'Content-Type': ' application/x-www-form-urlencoded',
                'Accept': 'application/json',

            };
            let httpHandler = new HttpHandler(config);
            httpHandler.httpGet(valuexConst.baseUrl+'/api/1.0/app/' + config['appid']).then(
                response => {
                done();
            },
            error => {done(error)})
        })
    });


});
