import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RepLog from "./RepLog";
import {render} from 'react-dom';

export default class RepLogCreator extends Component {

    constructor(props) {
        super(props);
        this.quantityInput = React.createRef();
        this.itemSelect = React.createRef();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.itemOptions = [
            {id: 'cat', text: 'Cat'},
            {id: 'fat_cat', text: 'Big Fat Cat'},
            {id: 'laptop', text: 'My Laptop'},
            {id: 'coffee_cup', text: 'Coffee Cup'},
        ];
        this.state = {
            quantityInputError: ''
        }
        this.state = {
            selectedItemId: '',
            quantityValue: 0
        }
    }

    //onAddRepLog={this.handleAddRepLog}

    handleFormSubmit(event) {
        event.preventDefault();
        const {onAddRepLog} = this.props;
        const quantityInput = this.quantityInput.current;
        const itemSelect = this.itemSelect.current;


        console.log(quantityInput.value);
        console.log(itemSelect.options[itemSelect.selectedIndex].value);
        // console.log('I love when a good form submits!');
        // console.log(event.target.elements.namedItem('reps').value);
        if (quantityInput.value <= 0) {
            this.setState({quantityInputError: 'Please enter a value greater than 0'});
            return;
        }
        onAddRepLog(itemSelect.options[itemSelect.selectedIndex].text,
            quantityInput.value);
        quantityInput.value = '';
        itemSelect.selectedIndex = 0;
        this.setState({quantityInputError: ''});

    }

    handleSelectedItemChange(event) {
        this.setState({
            selectedItemId: event.target.value
        });
    }

    handleQuantityInputChange(event) {
        this.setState({
            quantityValue: event.target.value
        });
    }

    render() {

        const {quantityInputError, selectedItemId, quantityValue} = this.state;
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            ref={this.itemSelect}
                            required="required"
                            className="form-control"
                            value={selectedItemId}
                            onChange={this.handleSelectedItemChange}
                    >
                        {this.itemOptions.map(option => {
                            return <option value={option.id} key={option.id}>{option.text}</option>
                        })}
                    </select>
                </div>
                {'  '}
                <div className={`form-group ${quantityInputError ? 'has-error' : ''}`}>
                    <label className="sr-only control-label required" htmlFor="rep_log_reps">
                        How many times?
                    </label>
                    <input type="number" id="rep_log_reps"
                           ref={this.quantityInput}
                           required="required"
                           placeholder="How many times?"
                           className="form-control"
                           value={quantityValue}
                           onChange={this.handleQuantityInputChange}
                    />

                    {quantityInputError && <span className="help-block">{quantityInputError}</span>}
                </div>

                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>
        );
    }
}