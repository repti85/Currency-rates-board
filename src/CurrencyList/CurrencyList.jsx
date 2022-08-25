import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyItem from "./CurrencyItem/CurrencyItem";
import "./CurrencyList.css";
import axios from "axios";
import { setCurrencyList } from "../Redux/currencyListReducer";
import getCurrencyName from "./getCurrencyName";

const CurrencyList = () => {
  debugger;
  const dispatch = useDispatch();
  const currencyItems = useSelector((state) => state.currencyList.currency);
  console.log("currencyItems >>>>> ", currencyItems);

  const getCurrencyList = () => {
    const ratesData = [];
    axios.get("https://www.cbr-xml-daily.ru/latest.js").then((response) => {
      console.log("response >>>> ", response);
      const dataObjToArrTransform = Object.entries(response.data.rates);

      dataObjToArrTransform.forEach(([key, value]) => {
        

        ratesData.push({
          currencyTicker: key,
          currencyName: getCurrencyName(key),
          currencyPrice: (value = (1 / value).toFixed(2)),
        });
      });
      console.log("ratesData >>>> ", ratesData);
      dispatch(setCurrencyList(ratesData));
    });
  };

  useEffect(() => {
    debugger;
    getCurrencyList();
  }, []);
  return (
    <div>
      <p>Курсы валют</p>
      <button onClick={() => getCurrencyList()}>Get list</button>
      <div>
        {currencyItems.map((i) => (
          <div className="currency-item">
            <CurrencyItem
              currencyTicker={i.currencyTicker}
              currencyName={i.currencyName}
              currencyPrice={i.currencyPrice}
            />
          </div>
        ))}
        {/* <div className="currency-item">1</div>
        <div className="currency-item">2</div>
        <div className="currency-item">3</div>
        <div className="currency-item">4</div>
        <div className="currency-item">5</div>
        <div className="currency-item">6</div> */}
      </div>
    </div>
  );
};
export default CurrencyList;
