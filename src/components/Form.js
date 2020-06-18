import React from "react";
import Input from "./Input";
import Select from "./Select";
import ChangeButton from "./ChangeButton";
import SubmitButton from "./SubmitButton";
import { Container, Row, Col } from "react-bootstrap";

function Form(props) {
    return (
        <form >
            <Container className="allForm">
                <Row>
                    <Col className="columns">
                        <Input
                            amount={props.amount}
                            handleAmountChange={props.handleAmountChange}
                        />
                    </Col>
                    <Col  className="selectAndButton columns">
                        <Select
                            label="I have:"
                            value={props.value1}
                            handleSelect={props.handleSelect1}
                        />
                        <ChangeButton
                            value1={props.value1}
                            value2={props.value2}
                            swap={props.swap}
                        />
                        <Select
                            label="I convert into:"
                            value={props.value2}
                            handleSelect={props.handleSelect2}
                        />
                    </Col>
                    <Col  className="columns" >
                        <SubmitButton getNBPData={props.getNBPData} />
                    </Col>
                </Row>
            </Container>
        </form >

    )
}

export default Form;