import React from "react";
import PropTypes from "prop-types";

export default function RepLogList(props) {

    const {highlightedRowId, onRowClick, repLogs, onDeleteRepLog, isLoaded, isSavingNewRepLog, successMessage} = props;

    const handleDeleteClick = function(event, repLogId) {
        event.preventDefault();
        onDeleteRepLog(repLogId);
    };
    //const repLogs = [
    // { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
    //  { id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
    //  { id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
    //];

    if (!isLoaded) {
        return (
            <tbody>
            <tr>
                <td colSpan="4" className="text-center">Loading...</td>
            </tr>
            </tbody>
        );
    }
    return (
        <tbody>
        {repLogs.map((repLog) => (
            <tr
                key={repLog.id}
                className={highlightedRowId === repLog.id ? 'info' : ''}
                onClick={() => onRowClick(repLog.id)}
                style={{
                    opacity: repLog.isDeleting ? .3 : 1
                }}
            >
                <td>{repLog.itemLabel}</td>
                <td>{repLog.reps}</td>
                <td>{repLog.totalWeightLifted}</td>
                <td>
                    <a href='#' onClick={(event)=>handleDeleteClick(event,repLog.id)}>
                    <span className='fa fa-trash'></span>
                </a>
            </td>
            </tr>
            ))}
        {isSavingNewRepLog && (
            <tr>
                <td
                    colSpan="4"
                    className="text-center"
                    style={{
                        opacity:.5
                    }}
                >Lifting to the database ...</td>
            </tr>
        )}
        </tbody>
    );
}

RepLogList.prototype = {
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    onDelelteRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
}