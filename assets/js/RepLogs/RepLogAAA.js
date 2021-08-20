import React, {Component} from 'react';
import {render} from 'react-dom';
import RepLog from "./RepLog";
import PropTypes from 'prop-types'
import {v4 as uuid} from 'uuid'
import {getRepLogs, deleteRepLog, createRepLog} from '../api/rep_log_api';

export default class RepLogApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: {numberOfHearts: 1},

            OnDelelteRepLog: {OnDelelteRepLog: null},
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: '',
            newRepLogValidationErrorMessage: ''
        };
        this.successMessageTimeoutHandle = 0;
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
                    isLoaded: true
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
        })
        createRepLog(newRep).then(repLog => {
            this.setState(prevState => {
                const newRepLogs = [...prevState.repLogs, repLog];
                return {
                    repLogs: newRepLogs,
                    isSavingNewRepLog: false,
                    newRepLogValidationErrorMessage:''
                };
            });
            this.setSuccessMessage('Rep log is saved');
        })
            .catch(error => {
                error.response.json().then(errorsData => {
                    const errors = errorsData.errors;
                    const firstError = errors[Object.keys(errors)[0]];
                    this.setState({
                        newRepLogValidationErrorMessage: firstError
                    });
                })
            })
            // .catch(error => {
            //     error.response.json().then(errorsData => {
            //         console.log(errorsData);
            //     })
            // })
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

    setSuccessMessage(message) {
        this.setState({
            successMessage: message
        });
        clearTimeout(this.successMessageTimeoutHandle)
        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            });
            this.successMessageTimeoutHandle = 0;
        }, 3000)
    }

    componentWillmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }

    handleDeletingRepLog(id) {
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        return repLog;
                    }
                    return Object.assign({}, repLog, {isDeleting: true});
                })
            }
        });
        deleteRepLog(id)
            .then(() => {
                this.setState((prevState) => {
                    return {
                        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
                    };
                });
                this.setSuccessMessage('Item was Un-lifted!');
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
                onDeleteRepLog={this.handleDeletingRepLog}
            />
        )
    }
}

RepLogApp
    .propTypes = {
    numberOfHearts: PropTypes.number.isRequired,
    onDelelteRepLog: PropTypes.func.isRequired,
};