import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Result from "./Result";
import Form from "./Form";
import MyChart from "./MyChart";

function LeftContainer(props) {
    return (
        <div className="mainElements" >
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
                            getNBPDataAboutCurrency={props.getNBPDataAboutCurrency}
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
                        <MyChart 
                            chartData={props.chartData} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LeftContainer;