/**
 * Created by rajachhabra on 06/11/17.
 */
import {ValuexEventManager, ValuexEvent} from "../sdk-js/events";


var assert = require('assert');

describe('ValuexEvents and ValuexEventManager', function () {



    describe('Test Event Handling', function () {
        let mEventManager = new ValuexEventManager();
        it('Subscribe a call back method, raise event and receive callback', function (done) {

            let callbackCount = [0, 0];
            mEventManager.subscribe(ValuexEvent.eventNames.incoming, function (eventName, eventData) {
                callbackCount[0] = 1;
                check();
            });

            /** Subscribe again */
            mEventManager.subscribe(ValuexEvent.eventNames.incoming, function (eventName, eventData) {
                callbackCount[1] = 1;
                check();
            });

            mEventManager.fire(ValuexEvent.eventNames.incoming, {someObject: "Passed Point for", points:10});

            function check() {
                if (callbackCount[0] && callbackCount[1]) {
                    done();
                }
            }
        })
    });


    describe('Test Event Handling negative', function () {
        let mEventManager = new ValuexEventManager();
        it('Subscribe a call back method, raise event and receive callback', function (done) {

            let callbackCount = [0, 0];
            try {
                mEventManager.subscribe("Some random string", function (eventName, eventData) {
                    callbackCount[0] = 1;
                    check();
                });
            } catch(error){
                callbackCount[0] = 1;
            }

            /** Subscribe again */
            mEventManager.subscribe(ValuexEvent.eventNames.incoming, function (eventName, eventData) {
                callbackCount[1] = 1;
                check();

            });

            mEventManager.fire(ValuexEvent.eventNames.incoming, {connection: "connection obj"});

            function check() {
                if (callbackCount[0] && callbackCount[1]) {
                    done();
                }
            }
        })
    });


});
