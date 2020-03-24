import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Input(props) {
    return (
        <div className="labelAndInput">
            <label className="label">Amount:</label>
            <input
                type="text"
                value={props.amount}
                onChange={props.handleAmountChange}
                className="formInput"
            />
        </div>
    )
}

export default Input;