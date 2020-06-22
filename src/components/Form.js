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
                    <Col xs={12} s={2} md={2} lg={2} >
                        <Input
                            amount={props.amount}
                            handleAmountChange={props.handleAmountChange}
                        />
                    </Col>
                    <Col xs={12} s={3} md={3} lg={3} >
                        <Select
                            label="I have:"
                            value={props.value1}
                            handleSelect={props.handleSelect1}
                        />
                    </Col>
                    <Col xs={12} s={2} md={2} lg={2} className='changeBtnCol'>
                        <ChangeButton
                            value1={props.value1}
                            value2={props.value2}
                            swap={props.swap}
                        />
                    </Col>
                    <Col xs={12} s={3} md={3} lg={3} >
                        <Select
                            label="I convert into:"
                            value={props.value2}
                            handleSelect={props.handleSelect2}
                        />
                    </Col>

                    <Col xs={12} s={2} md={2} lg={2} >
                        <SubmitButton getNBPData={props.getNBPData} />
                    </Col>
                </Row>
            </Container>
        </form >

    )
}

export default Form;