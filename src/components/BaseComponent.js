/**
 * Created by favcy on 17/01/18.
 */
import React from 'react';
import {getLocalData} from "../sdk-js/Common/cache";
import {Redirect} from "react-router-dom";
import {initValuex} from "../sdk-js/Common/common";

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        let token = getLocalData('valuex-token');
        if (token == 'undefined' || token == '' || token == null) {
            return <Redirect to={"/login"}/>
        }
    }
}