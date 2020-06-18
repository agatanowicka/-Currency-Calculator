import axios from "axios";

export default function getData(props) {
    const calculateRate = function (firstCurrencyRate, secondCurrencyRate) {
        return Math.round((firstCurrencyRate / secondCurrencyRate) * 100) / 100;
    }
    let date = new Date()
    let endDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
    let startDate = (date.getFullYear() - 1) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();

    const path = 'http://api.nbp.pl/api/exchangerates/rates/A/';
    const format = '?format=json';
    const table = [];
    table.push(`${path}${props.value1}/${format}`);
    table.push(`${path}${props.value2}/${format}`);
    table.push(`${path}${props.value1}/${startDate}/${endDate}/${format}`);
    table.push(`${path}${props.value2}/${startDate}/${endDate}/${format}`);
    const getsTable = table.map(url => axios.get(url));
    
    return (Promise.allSettled(getsTable)
        .then(([response1, response2, response3, response4]) => {
            let errorMessage;
            let valueAfterConversion;
            let valueOneCoin;
            let convertedValueOfMoney;
            let convertedValueOfOneCoin;
            if (props.value1 === props.value2) {
                errorMessage = `You are trying conver into ${props.value1} to ${props.value2}`;
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
            valueAfterConversion = Math.round(valueOneCoin * props.amount * 10000) / 10000;
            if (errorMessage) {
                convertedValueOfMoney = errorMessage;
            } else {
                convertedValueOfMoney = `${props.amount} ${props.value1} = ${valueAfterConversion} ${props.value2}`;
                convertedValueOfOneCoin = `1 ${props.value1} = ${valueOneCoin} ${props.value2}`;
            }

            let dataAboutFirstCurrencyInDateRange;
            let dataAboutSecondCurrencyInDateRange;
            let calculatedExchangeRateInDateRange = [];
            const transformResponseData = function (response) {
                return response.status === "fulfilled" ? response.value.data.rates.map(obj => { return { value: obj.mid, date: obj.effectiveDate } }) : [];
            }
            dataAboutFirstCurrencyInDateRange = transformResponseData(response3);
            dataAboutSecondCurrencyInDateRange = transformResponseData(response4);
            const maxValue = Math.max(dataAboutFirstCurrencyInDateRange.length, dataAboutSecondCurrencyInDateRange.length);
            const neutralObject = { value: 1 };
            for (let i = 0; i < maxValue; i++) {
                const object1 = dataAboutFirstCurrencyInDateRange[i] || neutralObject;
                const object2 = dataAboutSecondCurrencyInDateRange[i] || neutralObject;
                const date = object1.date || object2.date;
                const value = Math.round((object1.value / object2.value) * 1000000) / 1000000;
                calculatedExchangeRateInDateRange.push({ x: date, y: value });
            }
            return {
                calculatedExchangeRateInDateRange,
                convertedValueOfMoney,
                convertedValueOfOneCoin,
                errorMessage
            }
        }));
}