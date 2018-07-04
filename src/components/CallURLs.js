import React, {Component} from 'react';
import DataTables from 'material-ui-datatables';
import BaseComponent from "./BaseComponent";
import {initValuex} from "../sdk-js/Common/common";

const TABLE_COLUMNS = [
    {
        key: 'link_id',
        label: 'Id',
    },
    {
        key: 'link',
        label: 'Link',
        render: (link, all) => <a href={"/profile/"+link} target="_blank">{link}</a>

    },
    {
        key: 'created_at',
        label: 'Date Created',
    }
];

export default class CallURLs extends BaseComponent {;

    constructor(props) {
        super(props);
        this.state = {
            links : null,
            DEFAULT_TEXT : "Loading..."
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
                response.getLinks().then(
                    response=> {
                        console.log(response);
                        this.setState({links:response});
                    },
                    error => {

                    }
                )
            },
            error => {
            });
    }


    render() {

        if(this.state.links == undefined) {
            return "No data found";
        }

        if(!this.state.links) {
            return this.state.DEFAULT_TEXT;
        }

        return (
            <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={this.state.links}
                showCheckboxes={false}
                onCellClick={this.handleCellClick}
                onCellDoubleClick={this.handleCellDoubleClick}
                onFilterValueChange={this.handleFilterValueChange}
                onSortOrderChange={this.handleSortOrderChange}
                page={1}
                count={100}
            />
        );
    }
}