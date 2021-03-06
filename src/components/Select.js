import React from "react";
import currency from '../Constans';

function Select(props) {
    return (
        <div >
            <label className="label">{props.label}</label>
            <select
                className="formSelect"
                value={props.value}
                onChange={props.handleSelect}
            >
                {currency.map(item1 => (
                    <option key={item1.id} value={item1.id}>
                        {item1.id + "-" + item1.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;