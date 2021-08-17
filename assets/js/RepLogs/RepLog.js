import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types'
import RepLogCreator from "./RepLogCreator";

function calculateTotalWeightLifted(repLogs) {
    let total = 0;

    for (let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }
    return total;
}

const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);


export default function RepLog(props) {
    const {withHeart, highlightedRowId, onRowClick, repLogs, onAddRepLog, numberOfHearts, onHeartChange} = props;


    let heart = '';
    if (withHeart) {
        heart = <span>{'React/'.repeat(numberOfHearts)}️</span>;
    }

    return (
        <div className="col-md-7">
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
                    <RepLogCreator onAddRepLog={onAddRepLog}/>
                </div>
            </div>
        </div>
    );
}

RepLog.prototype = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    onAddRepLog: PropTypes.func.isRequired,
    OnRowClick: PropTypes.func.isRequired,
    onHeartChange: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired
}
