import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import LeftContainer from "../components/LeftContainer";

export class DownloadData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: "",
            result1: "",
            result2: "",
            amount: "",
            value1: '',
            value2: '',
            currencyValue: ''
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
    getNBPData(event) {
        const calculateRate = function (firstCurrencyRate, secondCurrencyRate) {
            return Math.round((firstCurrencyRate / secondCurrencyRate) * 100) / 100;
        };
        event.preventDefault();
        let date = new Date()
        let endDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
        let startDate = (date.getFullYear() - 1) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();

        let URL1 = `http://api.nbp.pl/api/exchangerates/rates/A/${this.state.value1}?format=json`
        let URL2 = `http://api.nbp.pl/api/exchangerates/rates/A/${this.state.value2}?format=json`
        let URL3 = `http://api.nbp.pl/api/exchangerates/rates/A/${this.state.value1}/${startDate}/${endDate}/?format=json`
        let URL4 = `http://api.nbp.pl/api/exchangerates/rates/A/${this.state.value2}/${startDate}/${endDate}/?format=json`

        const promise1 = axios.get(URL1);
        const promise2 = axios.get(URL2);
        const promise3 = axios.get(URL3);
        const promise4 = axios.get(URL4);

        Promise.allSettled([promise1, promise2, promise3, promise4])
            .then(([response1, response2, response3, response4]) => {
                debugger;
                let errorMessage;
                let valueAfterConversion;
                let valueOneCoin;
                let text1;
                let text2;
                if (this.state.value1 === this.state.value2) {
                    errorMessage = `You try conver from ${this.state.value1} to ${this.state.value2}`;
                }
                else if (response2.status === "fulfilled" && response1.status === "fulfilled") {
                    valueOneCoin = calculateRate(response1.value.data.rates[0].mid, response2.value.data.rates[0].mid);
                }
                else if (response2.status === "rejected" && response1.status === "rejected") {
                    errorMessage = `NBP server error`;
                }
                else if (response1.status === "rejected") {
                    valueOneCoin = calculateRate(1, response2.value.data.rates[0].mid);
                }
                else if (response2.status === "rejected") {
                    valueOneCoin = calculateRate(response1.value.data.rates[0].mid, 1);
                }
                valueAfterConversion = Math.round(valueOneCoin * this.state.amount * 100) / 100;
                if (errorMessage) {
                    text1 = errorMessage;
                } else {
                    text1 = `${this.state.amount} ${this.state.value1} = ${valueAfterConversion} ${this.state.value2}`;
                    text2 = `1 ${this.state.value1} = ${valueOneCoin} ${this.state.value2}`;
                }

                let mappedTab1;
                let mappedTab2;
                let calculatedTabObj = [];
                const transformResponseData = function (response) {
                    return response.status === "fulfilled" ? response.value.data.rates.map(obj => { return { value: obj.mid, date: obj.effectiveDate } }) : [];
                }
                mappedTab1 = transformResponseData(response3);
                mappedTab2 = transformResponseData(response4);
                const maxValue = Math.max(mappedTab1.length, mappedTab2.length);
                const neutralObject = { value: 1 };
                for (let i = 0; i < maxValue; i++) {
                    const object1 = mappedTab1[i] || neutralObject;
                    const object2 = mappedTab2[i] || neutralObject;
                    const date = object1.date || object2.date;
                    const value = Math.round((object1.value / object2.value) * 100) / 100;
                    calculatedTabObj.push({ x: date, y: value });
                }
                this.setState({
                    result2: text2,
                    result1: text1,
                    chartData: calculatedTabObj
                })

            })
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
                <LeftContainer value1={this.state.value1} value2={this.state.value2} amount={this.amount} data1FromParent={this.state.result1} data2FromParent={this.state.result2} handleSelect1={this.handleSelect1} handleSelect2={this.handleSelect2} handleSubmit={this.handleSubmit} handleAmountChange={this.handleAmountChange} getNBPData={this.getNBPData} chartData={this.state.chartData} swap={this.swap} />
            </div>
        )
    }
}
export default DownloadData;