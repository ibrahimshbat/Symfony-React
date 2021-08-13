import React from 'react';
import PropTypes from 'prop-types';
import RepLog from "./RepLog";
export default function RepLogCreator(props) {
    const {onNewItemSubmit} = props;

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log('I love when a good form submits!');
        console.log(event.target.elements.namedItem('reps').value);
        onNewItemSubmit('Big Fat Cat', event.target.elements.namedItem('reps').value);
    }
    return (
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
    );
}

RepLogCreator.prototype = {
    onNewItemSubmit: PropTypes.func.isRequired,
}