//if you want to check how it works go to https://github.com/KrystianKozlowski111/Conversion
import React, { useState } from 'react';
import axios from 'axios';
 
function CurrencyConverter() {
  const [rate, setRate] = useState();
  const [showErrors, setshowErrors]=useState(false);
  const [errDest, seterrDest] = useState('');
  const [errSource, seterrSource] = useState('');
  const [currencyDateError, setcurrencyDateError] = useState(false);
  const [currencyDate, setcurrencyDate] = useState('');
  const [currencySource, setcurrencySource] = useState('');
  const [currencyDest, setcurrencyDest] = useState('');


  const setcurrencyDateInput = (event) => {
    var m = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
   
    if(m.test(event.target.value)) {
      setshowErrors(false);
      setcurrencyDate(event.target.value);
      setcurrencyDateError(false);
    }
    else {
      setcurrencyDateError(true);
      setcurrencyDate(event.target.value);
    }
  }
  const resetFields = () => {
    setcurrencySource('');
    setcurrencyDest('');
    setcurrencyDate('');
  }
  const setcurrencySourceInput = (event) => {
    setcurrencySource(event.target.value.toUpperCase());
  }

  const setcurrencyDestInput = (event) => {
    setcurrencyDest(event.target.value.toUpperCase());
  }

  const getRates = (event) => {
    event.preventDefault()
    setshowErrors(true);
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
    console.log(currencyDate),
    <>
    <form onSubmit={getRates}>
      <input type="text" maxLength="10" className='currency-date' value={currencyDate} onChange={setcurrencyDateInput}></input>
      <input type="text" maxLength="3" style={{textTransform: "upperCase"}} className='currency-source' value={currencySource} onChange={setcurrencySourceInput}></input>
      <input type="text" maxLength="3" style={{textTransform: "upperCase"}} className='currency-destination' value={currencyDest}  onChange={setcurrencyDestInput}></input>
      <button className='find-rate'>Find rate</button>
     
    </form>
    <button className='reset-fields' onClick={resetFields}>Reset fields</button>
    {errDest!==undefined && currencyDateError!==true && errSource!==undefined?<input readOnly className='conversion-result' defaultValue={rate}></input>:''}
      
    {currencyDateError===true && showErrors?<p >time data {currencyDate} does not match format '$y-$m-$d' </p>:''}
      {errDest===undefined?<p>Symbols '{currencyDest}' are invalid for date {currencyDate} </p>:''}
      {errSource===undefined?<p>Symbols '{currencySource}' are invalid for date {currencyDate} </p>:''}

    </>
  );
}
 
export default CurrencyConverter;