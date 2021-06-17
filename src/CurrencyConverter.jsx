//if you want to check how it works go to https://github.com/KrystianKozlowski111/Conversion
import React, { useState } from 'react';
import axios from 'axios';
 
function CurrencyConverter() {
  const [rate, setRate] = useState();
  const [errDest, seterrDest] = useState('t');
  const [errSource, seterrSource] = useState('t');
  const [currencyDate, setcurrencyDate] = useState();
  const [currencySource, setcurrencySource] = useState();
  const [currencyDest, setcurrencyDest] = useState();

  const setcurrencyDateInput = (event) => {
    setcurrencyDate(event.target.value);
  }
  const setcurrencySourceInput = (event) => {
    setcurrencySource(event.target.value.toUpperCase());
  }
  const setcurrencyDestInput = (event) => {
    setcurrencyDest(event.target.value.toUpperCase());
  }

  const getRates = (event) => {
    event.preventDefault()
    if(currencyDate){
    axios
      .get(`http://api.exchangeratesapi.io/v1/${currencyDate}?access_key=670429a2b2b9b15500a52d8d1eab2c6a`)
      .then(res => {     
        const errDest = res.data.rates[currencyDest];
        seterrDest(errDest)
        const errSource = res.data.rates[currencySource];
        seterrSource(errSource)
        if(errDest&&errSource){
          const rate1=errDest/errSource
          setRate(rate1)
        }
       
        console.log('wynik '+rate)
      })
      .catch(err => {
        console.log(err.message);
      });
    }else{
      console.log('er')
    }
  };

 
  return (
    <>
    <form onSubmit={getRates}>
      <input type="text" maxLength="10" className='currency-date' defaultValue={currencyDate} onChange={setcurrencyDateInput}></input>
      <input type="text" maxLength="3" style={{textTransform: "upperCase"}} className='currency-source' defaultValue={currencySource} onChange={setcurrencySourceInput}></input>
      <input type="text" maxLength="3" style={{textTransform: "upperCase"}} className='currency-destination' defaultValue={currencyDest}  onChange={setcurrencyDestInput}></input>
      <button className='find-rate'>Find rate</button>
     
    </form>
    {errDest!==undefined && errSource!==undefined?<input readOnly className='conversion-result' defaultValue={rate}></input>:''}
      

      {errDest===undefined?<p>Symbols '{currencyDest}' are invalid for date {currencyDate} </p>:''}
      {errSource===undefined?<p>Symbols '{currencySource}' are invalid for date {currencyDate} </p>:''}
    </>
  );
}
 
export default CurrencyConverter;