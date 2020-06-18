import React from "react";
import { FaArrowsAltH } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

function ChangeButton(props) {
    return (
        <Button
            className="changeButton "
            variant="outline-danger"
            onClick={props.swap}>
            <FaArrowsAltH className="arrow" />
        </Button>
    )
}
export default ChangeButton;