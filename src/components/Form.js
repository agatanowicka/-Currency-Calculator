import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from "./Input"
import Select from "./Select"
import ChangeButton from "./ChangeButton"
import SubmitButton from "./SubmitButton";

function Form(props) {
   
    return (
        <div className="allForm">
            <form onSubmit={props.getNBPData} className="form">
                <div className="leftDiv">
                    <Input
                        amount={props.amount}
                        handleAmountChange={props.handleAmountChange}
                    />
                    <Select
                        label="I have:"
                        value={props.value1}
                        handleSelect={props.handleSelect1}
                    />
                </div>
                <ChangeButton value1={props.value1} value2={props.value2}swap={props.swap}/>
                <div className="leftDiv">
                    <Select
                        label="I exchange for:"
                        value={props.value2}
                        handleSelect={props.handleSelect2}
                    />
                    <SubmitButton />
                </div>
            </form>
        </div>
    )
}

export default Form;