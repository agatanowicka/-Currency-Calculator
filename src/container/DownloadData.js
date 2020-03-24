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
        debugger;
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

        Promise.all([promise1, promise2, promise3, promise4])
            .then(([response1, response2, response3, response4]) => {
                debugger;
                const valueToConversion = Math.round(response1.data.rates[0].mid * this.state.amount * 100) / 100;
                const valueAfterConversion = Math.round((valueToConversion / response2.data.rates[0].mid) * 100) / 100;
                const valueOneCoin = Math.round((response1.data.rates[0].mid / response2.data.rates[0].mid) * 100) / 100;
                const text1 = `${this.state.amount} ${this.state.value1} = ${valueAfterConversion} ${this.state.value2}`;
                const text2 = `1 ${this.state.value1} = ${valueOneCoin} ${this.state.value2}`;

                const mappedTab1 = response3.data.rates.map(obj => { return { date: obj.effectiveDate, value: obj.mid } })
                const mappedTab2 = response4.data.rates.map(obj => { return { date: obj.effectiveDate, value: obj.mid } })
                let calculatedTabObj = [];
                for (let i = 0; i < mappedTab1.length; i++) {
                    let object1 = mappedTab1[i];
                    let object2 = mappedTab2[i];
                    if (object1.date === object2.date) {
                        const value = Math.round((object1.value / object2.value) * 100) / 100;
                        calculatedTabObj.push({ date: object2.date, value: value });
                    }
                }
                const calculatedTab = calculatedTabObj.map(item => { return { x: item.date, y: item.value } })
                alert(calculatedTab)
                this.setState({
                    result2: text2,
                    result1: text1,
                    chartData: calculatedTab
                })

            })
            .catch((error) => {
                debugger;
                alert(error);
                this.setState({
                    currencyValue: "Error"
                })
            })
    }
    swap = () => {
        const firstCurrency = this.state.value1;
        this.setState({
            value1: this.state.value2,
            value2: firstCurrency
        })
        this.getNBPData({preventDefault: () => {}});
    }

    render() {
        return (
            <div>
                <LeftContainer value1={this.state.value1} value2={this.state.value2}amount={this.amount} data1FromParent={this.state.result1} data2FromParent={this.state.result2} handleSelect1={this.handleSelect1} handleSelect2={this.handleSelect2} handleSubmit={this.handleSubmit} handleAmountChange={this.handleAmountChange} getNBPData={this.getNBPData} chartData={this.state.chartData} swap={this.swap} />
            </div>
        )
    }
}
export default DownloadData;