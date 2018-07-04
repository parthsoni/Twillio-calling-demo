
import {ValuexSDK} from "../sdk-js/sdk";
import {ValuexEvent, ValuexEventManager} from "../sdk-js/events";

let assert = require('assert');
const mConfig = {
    'app_id': "A9FKZEJCMKADFGZ",
    'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6InVzZXIta2V5In0.eyJpZCI6IjQ0MDUxMSIsInJvbGUiOiJ1c2VyIiwiYXBwX2lkIjoiQTlGS1pFSkNNS0FERkdaIiwidmlzaXRvcl9pZCI6IjU3NzVhYTEwMTYwOGQwZGIiLCJjcmVhdGVkIjoxNTIwNjY1NTA0LCJleHBpcnkiOjE1MjMzNDM5MDR9.tVfAEj4UzatSG8OdwJNaaPAzjoGAehB_PO3SNXBIBh0"
};

let userId=null;
let user =null;

describe('Valuex SDK', function () {
    describe('Test Valuex Get Instance', function () {
        it('Should return an object of the type ValuexSDK', function () {
                let sdk = ValuexSDK.getInstance();
                assert.equal(typeof sdk, 'object');
        });
    });

    describe('Test Valuex Init', function () {
        it('Should call result onSuccess', function (done) {

                ValuexSDK.getInstance().init(mConfig).then(
                    response => {
                        done();
                    },
                    error => {
                        done(error);
                    }
                )

            });
    });

    describe('Test Valuex getApplication', function () {

        it('Should return an object of the type ValuexApplication', function (done) {
            let sdk = ValuexSDK.getInstance();
            let application = sdk.getApplication();
            assert.equal(typeof application, 'object');
        })
    });

    describe('Test Valuex getOnlineUsers', function () {
        this.timeout(5000);

        it('Should return user data as JSON', function (done) {
            let sdk = ValuexSDK.getInstance();
            sdk.getOnlineUsers().then(
                response => {
                    assert(response);
                    done();
                },
                error => {
                    done(error);
                });
        });
    });

    describe('Test Valuex getUserDetail', function () {
        this.timeout(5000);

        it('Should return user data as JSON', function (done) {
            let sdk = ValuexSDK.getInstance();
            sdk.getUserDetail().then(
                response => {
                    user = response;
                    assert(user);
                    userId = user.user_id;
                    done();
                },
                error => {
                    done(error);
                });
        });
    });

    describe('Test Valuex getUserById', function () {
        this.timeout(5000);

        it('Should return user data as JSON', function (done) {
            let sdk = ValuexSDK.getInstance();
            sdk.getUserById(userId).then(
                response => {
                    assert.equal(response.user_id, user.user_id);
                    done();
                },
                error => {
                    done(error);
                });
        });
    });

    describe('Test Valuex getUser', function () {
        it('Should return user data as JSON', function (done) {
            let sdk = ValuexSDK.getInstance();
            assert.equal( sdk.getUser().user_id, user.user_id);
            done();
        });
    });

    describe('Test Valuex isCallActive', function () {
        it('Should return false ', function (done) {
            let sdk = ValuexSDK.getInstance();
            assert.equal( sdk.isCallActive(), false);
            done();
        });
    });
    describe('Test onConnect Event', function () {
        let mEventManager = new ValuexEventManager();
        it('Subscribe a call back method', function (done) {
            try {
                mEventManager.subscribe("onConnect", function (eventName, eventData) {
                    console.log("on connnnnnnnnnnnnnnnnnnnnnnnn");
                    done();
                });
            } catch (error) {
            }

        });
    });

    describe('Test onError Event', function () {
        let mEventManager = new ValuexEventManager();
        it('Subscribe a call back method', function (done) {
            try {
                mEventManager.subscribe("onError", function (eventName, eventData) {
                    console.log("on errrorororrororororo");
                    done();
                });
            } catch (error) {
            }

        });
    });

    describe('Test Valuex getUserFromFavcyId', function () {
        this.timeout(5000);

        it('Should return user data as JSON', function (done) {
            let sdk = ValuexSDK.getInstance();
            sdk.getUserFromFavcyId(user.favcy_member_id).then(
                response => {
                    assert.equal( response.data.data.user.user_id, user.user_id);
                    done();
                },
                error => {
                    done(error);
                });

        });
    });

    describe('Test Valuex getCalls', function () {
        this.timeout(5000);
        it('Should return call records data as JSON', function (done) {
            let sdk = ValuexSDK.getInstance();
            sdk.getCalls().then(
                response => {
                    assert(response);
                    done();
                },
                error => {
                    done(error);
                });
        });
    });


    describe('Test Valuex generate Token', function () {
        this.timeout(5000);

        it('Should return token as string', function (done) {
            let sdk = ValuexSDK.getInstance();
            sdk.generateToken().then(
                response => {
                    done();
                },
                error => {
                    done(error);
                });
        });
    });

    describe('Test Valuex connect call', function () {
        it('Should return nothing ', function (done) {
            let sdk = ValuexSDK.getInstance();
            sdk.connect({To : '44'});
            done();
        });
    });

    describe('Test Valuex connect call', function () {
        it('Should return call data in json ', function (done) {
            let sdk = ValuexSDK.getInstance();
            sdk.getCall().then(
                response => {
                    done();
                },
                error => {
                    done(error);
                });
        });
    });



});
