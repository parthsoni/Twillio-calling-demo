/**
 * Created by rajachhabra on 06/11/17.
 */
import {ValuexApplication} from "../sdk-js/application";
import {HttpHandler} from "../sdk-js/Common/http";


let assert = require('assert');
const mConfig = {
    'app_id': "A9FKZEJCMKADFGZ",
    'app-id': "A9FKZEJCMKADFGZ",
    'auth-token': "test",
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
};
const httpHandler = new HttpHandler(mConfig);

describe('Valuex Application', function () {
   this.timeout(500);
    describe('Test Valuex Constructor', function () {
        it('Should return an object of the type ValuexApplication', function (done) {
            httpHandler.httpGet(process.env.baseURL + "/bot-bundle.js").then(
                 response =>  {
                let application = new ValuexApplication('A9FKZEJCMKADFGZ');
                assert.equal(typeof application, 'object');
                done();
            },
            error => {
                done(error);
            });
        })
    });

    describe('Test Valuex ValuexApplication Init', function () {
        it('Should call result onSunccess', function (done) {

                let applicationObj = new ValuexApplication('A9FKZEJCMKADFGZ');

                applicationObj.initialize().then(
                    (response) => {
                        done();
                    },
                    (error) => {
                        done(error);
                    });
        });
    });

});
