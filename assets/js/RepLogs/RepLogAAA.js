import React, {Component} from 'react';
import {render} from 'react-dom';
import RepLog from "./RepLog";
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
export default class RepLogApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
                { id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: uuid(), reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
            ]
        };
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this)
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }
    handleAddRepLog(itemLabel, reps) {
        //event.preventDefault();
        const repLogs = this.state.repLogs;
        const newRep = {
            id: uuid(),
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50)
        };
        this.setState(prevState => {
            const newRepLogs = [...prevState.repLogs, newRep];
            return {repLogs: newRepLogs};
        })
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
                onAddRepLog={this.handleAddRepLog}
                onRowClick={this.handleRowClick}
            />
        )
    }
}

