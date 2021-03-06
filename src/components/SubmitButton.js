import React from "react";
import Button from 'react-bootstrap/Button';

function SubmitButton(props) {
    return (
        <Button
            className="submitButton"
            type="submit"
            variant='danger'
            onClick={props.getNBPData}
        >
            Convert
        </Button>
    )
}
export default SubmitButton;