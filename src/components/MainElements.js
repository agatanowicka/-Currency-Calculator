import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Result from "./Result";
import Form from "./Form";
import MyChart from "./MyChart";

function MainElements(props) {
    return (
        <div className="mainElements" >
            <h1 className="heading">CURRENCY CALCULATOR</h1>
            <Container>
                <Row>
                    <Col lg={8}>
                        <Form
                            amount={props.amount}
                            handleSelect1={props.handleSelect1}
                            handleSelect2={props.handleSelect2}
                            handleSubmit={props.handleSubmit}
                            handleAmountChange={props.handleAmountChange}
                            getNBPData={props.getNBPData}
                            swap={props.swap}
                            value1={props.value1}
                            value2={props.value2}

                        />
                        <Result
                            data1FromParent={props.data1FromParent}
                            data2FromParent={props.data2FromParent}
                        />
                    </Col>
                    <Col lg={4}>
                    {props.showChart?<MyChart chartData={props.chartData} />:""}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainElements;