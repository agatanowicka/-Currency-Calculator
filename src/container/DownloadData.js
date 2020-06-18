import React, { Component } from "react";
import MainElements from "../components/MainElements";
import getData from './getData';

export class DownloadData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: "",
            result1: "",
            result2: "",
            amount: "",
            value1: 'PLN',
            value2: 'PLN',
            currencyValue: '',
            showChart: false
        }
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.getNBPData = this.getNBPData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect1 = this.handleSelect1.bind(this);
        this.handleSelect2 = this.handleSelect2.bind(this);
        this.swap = this.swap.bind(this);
    }
    handleSelect1 = (event) => {
        this.setState({
            value1: event.target.value
        })
    }

    handleSelect2 = (event) => {
        this.setState({
            value2: event.target.value
        })
    }

    handleAmountChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    getNBPData = async (event) => {
        event.preventDefault();
        const dataFromNBP = await getData(this.state)
        if (dataFromNBP.convertedValueOfMoney !== dataFromNBP.errorMessage) {
            this.setState({
                showChart: true
            })
        }
        this.setState({
            result2: dataFromNBP.convertedValueOfOneCoin,
            result1: dataFromNBP.convertedValueOfMoney,
            chartData: dataFromNBP.calculatedExchangeRateInDateRange
        })
        if (dataFromNBP.convertedValueOfMoney !== dataFromNBP.errorMessage) {
            this.setState({
                showChart: true
            })
        }
    }

    swap = () => {
        const firstCurrency = this.state.value1;
        this.setState({
            value1: this.state.value2,
            value2: firstCurrency
        })
        this.getNBPData({ preventDefault: () => { } });
    }

    render() {
        return (
            <div>
                <MainElements
                    showChart={this.state.showChart}
                    value1={this.state.value1}
                    value2={this.state.value2}
                    amount={this.amount}
                    data1FromParent={this.state.result1}
                    data2FromParent={this.state.result2}
                    handleSelect1={this.handleSelect1}
                    handleSelect2={this.handleSelect2}
                    handleSubmit={this.handleSubmit}
                    handleAmountChange={this.handleAmountChange}
                    getNBPData={this.getNBPData}
                    chartData={this.state.chartData}
                    swap={this.swap}
                />
            </div>
        )
    }
}
export default DownloadData;