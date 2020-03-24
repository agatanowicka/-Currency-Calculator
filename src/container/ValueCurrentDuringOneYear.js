import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import MyChart from "../components/MyChart";

export class ValueCurrentDuringOneYear extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allResult: ""
        }
        this.getNBPDataAboutCurrency = this.getNBPDataAboutCurrency.bind(this);
    }
    getNBPDataAboutCurrency(event) {
        event.preventDefault();
        let date = new Date()
        let endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let startDate = (date.getFullYear() - 1) + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        let URL1 = `http://api.nbp.pl/api/exchangerates/rates/A/${this.state.value1}/${startDate}/${endDate}/?format=json`
        let URL2 = `http://api.nbp.pl/api/exchangerates/rates/A/${this.state.value2}/${startDate}/${endDate}/?format=json`

        const promise1 = axios.get(URL1);
        const promise2 = axios.get(URL2);

        Promise.all([promise1, promise2])
            .then(([response1, response2]) => {
                const mappedTab1 = response1.data.retes.map(obj => { return { date1: obj.effectiveDate, value1: obj.mid } })
                const mappedTab2 = response2.data.retes.map(obj => { return { date2: obj.effectiveDate, value2: obj.mid } })
                let calculatedTabObj = [];
                alert(mappedTab1)
                alert(mappedTab2)

                // mappedTab1.map((object1) => {
                //     mappedTab2.map((object2) => {
                //         if (object1.date1 === object2.date2) {
                //             let value = Math.round((object1.value1 / object2.value2) * 100) / 100;
                //             calculatedTabObj.push({ date: object2.date1, value: value });
                //         }
                //     })
                // })

                for (let i = 0; i < mappedTab1.length; i++) {
                    let object1 = mappedTab1[i];
                    let object2 = mappedTab2[i];
                    if (object1.date1 === object2.date2) {
                        let value = Math.round((object1.value1 / object2.value2) * 100) / 100;
                        calculatedTabObj.push({ date: object2.date1, value: value });
                    }
                }
                const calculatedTab = calculatedTabObj.map(item => [item.date, item.value])
                this.setState({
                    allResult: calculatedTab
                })

            })
            .catch((error) => {
                alert(error);
            })
    }
    render() {
        return (
            < MyChart allResult={this.state.allResult} getNBPDataAboutCurrency={this.getNBPDataAboutCurrency}/>
        )
    }
}

export default ValueCurrentDuringOneYear;