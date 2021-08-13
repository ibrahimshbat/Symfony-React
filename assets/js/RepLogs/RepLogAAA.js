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
    }

    handleRowClick(repLogId) {
        this.setState({highlightedRowId: repLogId});
    }

    render() {
        const {withHeart} = this.props;
        const {highlightedRowId, repLogs} = this.state

        return (
            <RepLog

                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
            />
        )
    }
}

//RepLogApp.prototype = {
  //  withHeart: PropTypes.bool,
    //repLogs: PropTypes.array.isRequired
//}