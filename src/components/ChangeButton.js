import React from "react";
import { FaArrowsAltH } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

function ChangeButton(props) {
    return (
        <Button
            className="changeButton "
            variant="outline-dark"
            onClick={props.swap}>
            <FaArrowsAltH />
        </Button>
    )
}
export default ChangeButton;