import React, {Component} from 'react';
import {render} from 'react-dom';
import RepLog from "./RepLog";
import PropTypes from 'prop-types'

export default class RepLogApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
                { id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
            ]
        };
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this)
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }
    handleNewItemSubmit(itemLabel, reps) {
        //event.preventDefault();
        const repLogs = this.state.repLogs;
        const newRep = {
            id: 'TODO-id',
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50)
        };
        repLogs.push(newRep);
        this.setState({repLogs: repLogs});
        console.log("TODO - update state repLogs");
        //console.log(this.quatityInput);
       // console.log(this.itemSelect);
        console.log()
        //console.log(itemName, reps);

    }


    render() {
        const {withHeart} = this.props;
        const {highlightedRowId, repLogs} = this.state

        return (
            <RepLog

                {...this.props}
                {...this.state}
                onNewItemSubmit={this.handleNewItemSubmit}
                onRowClick={this.handleRowClick}
            />
        )
    }
}

