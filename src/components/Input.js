import React from "react";

function Input(props) {
    return (
        <div >
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