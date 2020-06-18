import React from "react";

function Result(props) {
    const tempDate = new Date();
    const date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes();
    return (
        <div className="resultAndData">
            <h1>{props.data1FromParent}</h1>
            <h5>{props.data2FromParent}</h5>
            <h6>{date}</h6>
            <h6>Source:NBP</h6>
        </div>
    )
}

export default Result;