import React, {Component} from 'react';
import {render} from 'react-dom';
import RepLog from "./RepLog";
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import { getRepLogs } from '../api/rep_log_api';
export default class RepLogApp extends React.Component {
    constructor(props) {
        super(props);
        getRepLogs().
            then((data) => {
                console.log(data);
        }
        );
        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
                { id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
                { id: uuid(), reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
            ],
            numberOfHearts:{numberOfHearts:1},

            OnDelelteRepLog: {OnDelelteRepLog:null}
        };
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeletingRepLog = this.handleDeletingRepLog.bind(this);
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
    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount
        });
    }

    handleDeletingRepLog(id){
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
            };
        });
    }

    render() {
       // const {withHeart} = this.props;
       // const {highlightedRowId, repLogs, numberOfHearts} = this.state

        return (
            <RepLog
                {...this.props}
                {...this.state}
                onAddRepLog={this.handleAddRepLog}
                onRowClick={this.handleRowClick}
                onHeartChange={this.handleHeartChange}
                onDeleteRepLog = {this.handleDeletingRepLog}
            />
        )
    }
}
RepLogApp.propTypes = {
    numberOfHearts: PropTypes.number.isRequired,
    onDelelteRepLog: PropTypes.func.isRequired
};