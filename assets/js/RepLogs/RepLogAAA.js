import React, {Component} from 'react';
import {render} from 'react-dom';
import RepLog from "./RepLog";
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import { getRepLogs, deleteRepLog, createRepLog} from '../api/rep_log_api';
export default class RepLogApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts:{numberOfHearts:1},

            OnDelelteRepLog: {OnDelelteRepLog:null},
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: ''
        };
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeletingRepLog = this.handleDeletingRepLog.bind(this);
    }

    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded:true
                })
            });
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }
    handleAddRepLog(item, reps) {
        //event.preventDefault();
        const repLogs = this.state.repLogs;
        const newRep = {
           // id: uuid(),
            reps: reps,
            item: item,
            //totalWeightLifted: Math.floor(Math.random() * 50)
        };
        this.setState({
            isSavingNewRepLog: true,
            successMessage:'Rep log is saved'
        })
        createRepLog(newRep).
            then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];
                    return {repLogs: newRepLogs,
                        isSavingNewRepLog: false};
                })
            })
      //  this.setState(prevState => {
           // const newRepLogs = [...prevState.repLogs, newRep];
           // return {repLogs: newRepLogs};
      //  })
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
        deleteRepLog(id);
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
    onDelelteRepLog: PropTypes.func.isRequired,
};