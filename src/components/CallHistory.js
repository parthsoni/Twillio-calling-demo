import React, {Component} from 'react';
import DataTables from 'material-ui-datatables';
import BaseComponent from "./BaseComponent";
import {initValuex} from "../sdk-js/Common/common";
import CallHistoryCard from "./view/CallHistoryCard";

export default class CallHistory extends BaseComponent {
    ;

    constructor(props) {
        super(props);
        this.state = {
            calls: null,
            DEFAULT_TEXT: "Loading..."
        }
    }

    handleFilterValueChange = (value) => {
        // your filter logic
    }

    handleSortOrderChange = (key, order) => {
        // your sort logic
    }

    componentDidMount() {
        let self = this;
        initValuex().then(
            response => {
                response.getCalls().then(
                    response => {
                        this.setState({calls: response.data.data});
                    },
                    error => {

                    }
                )
            },
            error => {
            });
    }


    render() {

        if (!this.state.calls) {
            return this.state.DEFAULT_TEXT;
        }

        let list = [];

        {
            this.state.calls && this.state.calls.map((call) => {
                list.push(
                    <CallHistoryCard key={call.id}
                                     call={call}
                    />
                );
            });
        }


        return (<div>{list}</div>);
    }
}

