import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types'
import RepLogCreator from "./RepLogCreator";

//import RepLogCreator from './RepLogCreatorControlledComponents';
function calculateTotalWeightLifted(repLogs) {
    let total = 0;

    for (let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }
    return total;
}

const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);


export default function RepLog(props) {
    const {
        withHeart,
        highlightedRowId,
        onRowClick,
        onDeleteRepLog,
        repLogs,
        onAddRepLog,
        numberOfHearts,
        onHeartChange,
        isLoaded,
        isSavingNewRepLog,
        successMessage,
        newRepLogValidationErrorMessage,
        itemOptions,
    } = props;


    let heart = '';
    if (withHeart) {
        heart = <span>{'React/'.repeat(numberOfHearts)}️</span>;
    }

    return (
        <div>
            <h2>
                Lift History {heart}
            </h2>
            <input
                type="range"
                value={numberOfHearts}
                onChange={(e) => {
                    onHeartChange(+e.target.value);
                }
                }
            />

            {successMessage && (
                <div className="alert alert-success text-center">
                    {successMessage}
                </div>
            )}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <RepLogList
                    highlightedRowId={highlightedRowId}
                    onRowClick={onRowClick}
                    repLogs={repLogs}
                    onDeleteRepLog={onDeleteRepLog}
                    isLoaded={isLoaded}
                    isSavingNewRepLog={isSavingNewRepLog}
                />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Total</th>
                    <th>{calculateTotalWeightFancier(repLogs)}</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>
            <div className="row">
                <div className="col-md-6">
                    <RepLogCreator onAddRepLog={onAddRepLog}
                                   validationErrorMessage={newRepLogValidationErrorMessage}
                                   itemOptions={itemOptions}/>
                </div>
            </div>
        </div>
    );
}

RepLog.prototype = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    onAddRepLog: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    onHeartChange: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
    newRepLogValidationErrorMessage: PropTypes.string.isRequired,
    itemOptions: PropTypes.array.isRequired

}
