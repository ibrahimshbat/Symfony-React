import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types'

function calculateTotalWeightLifted(repLogs) {
    let total = 0;

    for (let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }
    return total;
}

const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, log) => total + log.totalWeightLifted, 0);


export default function RepLog(props) {
    const {withHeart, highlightedRowId, onRowClick, repLogs, onNewItemSubmit} = props;

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('I love when a good form submits!');
        console.log(event.target.elements.namedItem('reps').value);
        onNewItemSubmit('Big Fat Cat', event.target.elements.namedItem('reps').value);
    }
        let heart = '';
        if (withHeart) {
            heart = <span>❤️</span>;
        }

        return (
            <div className="col-md-7">
                <h2>
                    Lift History {heart}
                </h2>

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
                <form className="form-inline" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label className="sr-only control-label required" htmlFor="rep_log_item">
                            What did you lift?
                        </label>
                        <select id="rep_log_item"
                                name="item"
                                required="required"
                                className="form-control">
                            <option value="">What did you lift?</option>
                            <option value="cat">Cat</option>
                            <option value="fat_cat">Big Fat Cat</option>
                            <option value="laptop">My Laptop</option>
                            <option value="coffee_cup">Coffee Cup</option>
                        </select>
                    </div>
                    {'  '}
                    <div className="form-group">
                        <label className="sr-only control-label required" htmlFor="rep_log_reps">
                            How many times?
                        </label>
                        <input type="number" id="rep_log_reps"
                               name="reps" required="required"
                               placeholder="How many times?"
                               className="form-control"/>
                    </div>
                    {'  '}
                    <button type="submit" className="btn btn-primary">I Lifted it!</button>
                </form>

            </div>
        );
    }

    RepLog.prototype = {
        withHeart: PropTypes.bool,
        highlightedRowId: PropTypes.any,
        handleNewItemSubmit: PropTypes.func.isRequired,
        OnRowClick: PropTypes.func.isRequired,
        repLogs: PropTypes.array.isRequired
    }
