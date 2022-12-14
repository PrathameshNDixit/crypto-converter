import React, { useEffect, useRef, useState } from "react";
import { FaCoins } from "react-icons/fa";
import { Card, Form, Input, Select } from "antd";
import "./App.css";
function Converter() {
    const [cryptoList, setCryptoList] = useState([]);
    const [inputText, setInputText] = useState(0);
    const [firstSelect, setFirstSelect] = useState("Bitcoin");
    const [secondSelect, setSecondSelect] = useState("Ether");
    const [result, setResult] = useState(0);
    const inputTextRef = useRef(0);
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (cryptoList.length === 0) return;
        calculateRate();
    }, [inputText, firstSelect, secondSelect]);

    async function fetchData() {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/exchange_rates"
        );
        const jsonData = await response.json();
        const tempArray = [];
        Object.values(jsonData.rates).forEach((item) => {
            const obj = {
                value: item.name,
                label: item.name,
                rate: item.value,
            };
            tempArray.push(obj);
        });
        setCryptoList(tempArray);
    }
    function handleInputChange(event) {
        setInputText(event.target.value);
    }
    function handleFirstSelect(value) {
        setFirstSelect(value);
    }
    function handleSecondSelect(value) {
        setSecondSelect(value);
    }

    function calculateRate() {
        let firstSelectRate = cryptoList.find((item) => {
            return item.value === firstSelect;
        }).rate;
        firstSelectRate = Number(firstSelectRate);
        let SecondSelectRate = cryptoList.find((item) => {
            return item.value === secondSelect;
        }).rate;
        SecondSelectRate = Number(SecondSelectRate);
        const resultValue = (inputText * SecondSelectRate) / firstSelectRate;
        setResult(resultValue);
    }

    return (
        <div className="card-container">
            <Card
                className="crypto-card"
                title={
                    <div>
                        <h1><FaCoins/> Crypto Converter</h1>
                    </div>
                }
            >
                <Form>
                    <Form.Item defaultValue="0" onChange={handleInputChange}>
                        <Input ref={inputTextRef}></Input>
                    </Form.Item>
                </Form>
                <div className="select-box">
                    <Select
                        onChange={handleFirstSelect}
                        style={{ width: "160px" }}
                        defaultValue="Bitcoin"
                        options={cryptoList}
                    />
                    <Select
                        onChange={handleSecondSelect}
                        style={{ width: "160px" }}
                        defaultValue="Ether"
                        options={cryptoList}
                    />
                </div>
                <div className="result-container">
                    <h2>
                        {inputText} {firstSelect}={result} {secondSelect}
                    </h2>
                </div>
            </Card>
        </div>
    );
}

export default Converter;
