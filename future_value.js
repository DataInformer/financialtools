/**
 * Calculates the present value of an income stream given a discount rate.
 *
 * @param {array} incomeStream - The income stream over time
 * @param {number} discountRate - The discount rate for future income
 * @return {number} The present value of the income stream
 */
function calculatePresentValueFixed(periodPayment, numPeriods, periodsPerYear, discountRate) {
  let presentValue = 0;
  for (let i = 0; i < numPeriods; i++) {
    presentValue += periodPayment / Math.pow(1 + discountRate/periodsPerYear, i);
  }
  return presentValue;
}

/**
 * Calculate the present value of an income stream.
 *
 * @param {Array} incomeStream - array of income values
 * @param {number} periodsPerYear - number of periods per year
 * @param {number} discountRate - discount rate annual (decimal)
 * @return {number} present value of the income stream
 */
function calculatePresentValue(incomeStream, periodsPerYear, discountRate) {
    let presentValue = 0;
    for (let i = 0; i < incomeStream.length; i++) {
      presentValue += incomeStream[i] / Math.pow(1 + discountRate/periodsPerYear, i);
    }
    return presentValue;
  }
  


  /**
   * Generates a sequence of semiannual premium payments based on the initial 
   * semiannual premium, number of years, and the rate of inflation.
   *
   * @param {number} semiannualPremium - the initial semiannual premium
   * @param {number} numYears - the number of years
   * @param {number} rateInflation - the rate of inflation for premiums (can be different from rate of interest)
   * @return {Array} an array of semiannual premium payments for each year
   */
  function generatePremiumSequence(semiannualPremium, numYears, rateInflation) {
    let semiannualPremiums = [];
    for (let i = 0; i < numYears; i++) {
      semiannualPremiums.push(semiannualPremium * 2 * Math.pow(1 + rateInflation, i));
    }
    return semiannualPremiums;
} 

/**
 * Generates a payout sequence based on the provided parameters.
 *
 * @param {number} monthlyBenefit - the monthly benefit amount
 * @param {number} yearStart - the starting year for the payments
 * @param {number} [yearDuration=8] - the duration of the sequence in years
 * @param {number} [inflationBenefit=0.05] - the rate of inflation benefit
 * @param {boolean} [compound=true] - flag indicating whether to apply compound interest
 * @return {Array} the generated payout sequence
 */
function generatePayoutSequence(monthlyBenefit, yearStart, yearDuration = 8, inflationBenefit = 0.05, compound = true) {
  let payoutSequence = Array(yearStart).fill(0);
  if(compound)  {
//   TODO: handle case where yearDuration is a decimal
  for (let i = yearStart; i < yearStart + yearDuration; i++) {
    payoutSequence.push(monthlyBenefit * 12 * Math.pow(1 + inflationBenefit, i));
  }
}
  else {
    for (let i = yearStart; i < yearStart + yearDuration; i++) {
        payoutSequence.push(monthlyBenefit * 12 * (1 + inflationBenefit * i));
      }
  }

  return payoutSequence;
}

function getOverallValue(semiannualPremium, rateInflation, discountRate, monthlyBenefit, yearStart, yearDuration, inflationBenefit, compound, cashBonus=0) {
  let semiannualPremiums = generatePremiumSequence(semiannualPremium, numYears=yearStart-1+yearDuration, rateInflation=rateInflation);
  let payoutSequence = generatePayoutSequence(monthlyBenefit, yearStart-1, yearDuration, inflationBenefit, compound);
  let a = calculatePresentValue(payoutSequence, 1, discountRate)
  let b = calculatePresentValue(semiannualPremiums, 1, discountRate)
  // console.log(a,b)
  let overallValue = a - b + cashBonus;
  return overallValue;
}
// var yearStart = document.getElementById("yearStart");
var rateGrowthInflation = document.getElementById("rateGrowthInflation");
var rateGrowthNoInflation = document.getElementById("rateGrowthNoInflation");

var discountRateV = document.getElementById("discountRate");

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
// const years = [1]

function refreshGraph() {
  
var current = {
    x: years,
    y: years.map((x) => (getOverallValue(semiannualPremium=1745.46, rateInflation=rateGrowthNoInflation.value/100, discountRate=discountRateV.value/100, monthlyBenefit=6650, yearStart=x, yearDuration=8, inflationBenefit=0.05, compound=false, cashBonus=0))),
    mode: 'lines',
    name: 'Current',
  };
  

  var option1 = {
    x: years,
    y: years.map((x) => (getOverallValue(semiannualPremium=0, rateInflation=rateGrowthInflation.value/100, discountRate=discountRateV.value/100, monthlyBenefit=62142.66/96, yearStart=x, yearDuration=8, inflationBenefit=0, compound=false, cashBonus=0))),
    mode: 'lines',
    name: 'Option 1',
  };


  var option2 = {
    x: years,
    y: years.map((x) => (getOverallValue(semiannualPremium=0, rateInflation=rateGrowthInflation.value/100, discountRate=discountRateV.value/100, monthlyBenefit=31428.44/96, yearStart=x, yearDuration=8, inflationBenefit=0, compound=false, cashBonus=10000))),
    mode: 'lines',
    name: 'Option 2',
  };

  var option3 = {
    x: years,
    y: years.map((x) => (getOverallValue(semiannualPremium=1110.73, rateInflation=rateGrowthNoInflation.value/100, discountRate=discountRateV.value/100, monthlyBenefit=3500, yearStart=x, yearDuration=8, inflationBenefit=0, compound=false, cashBonus=6000))),
    mode: 'lines',
    name: 'Option 3',
  };
  var option4 = {
    x: years,
    y: years.map((x) => (getOverallValue(semiannualPremium=1687.96, rateInflation=rateGrowthNoInflation.value/100, discountRate=discountRateV.value/100, monthlyBenefit=6650, yearStart=x, yearDuration=4, inflationBenefit=0, compound=false, cashBonus=6000))),
    mode: 'lines',
    name: 'Option 4',
  };

  var option5 = {
    x: years,
    y: years.map((x) => (getOverallValue(semiannualPremium=1309.10, rateInflation=rateGrowthNoInflation.value/100, discountRate=discountRateV.value/100, monthlyBenefit=4987.50, yearStart=x, yearDuration=8, inflationBenefit=0.05, compound=false, cashBonus=1200))),
    mode: 'lines',
    name: 'Option 5',
  };

  var option6 = {
    x: years,
    y: years.map((x) => (getOverallValue(semiannualPremium=1192.98, rateInflation=rateGrowthNoInflation.value/100, discountRate=discountRateV.value/100, monthlyBenefit=4186.50, yearStart=x, yearDuration=8, inflationBenefit=0.01, compound=true, cashBonus=6000))),
    mode: 'lines',
    name: 'Option 6',
  };
    
  var data = [current, option1, option2, option3, option4, option5, option6];
  // Plotly snap to integer points

  Plotly.newPlot('lineChart', data, layout = { hovermode: 'closest' });


}


// var yearStartValue = document.getElementById("yearStartValue");

// yearStartValue.innerHTML = yearStart.value
// yearStart.oninput = function() {
//   yearStartValue.innerHTML = this.value;
//   yearStart.value = this.value  
  // document.getElementById("yearStartValue").innerHTML = this.value;
// }


/*
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function YourComponent() {
  const [yearStart, setYearStart] = useState(0);
  const [rateInflation, setRateInflation] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);

  return (
    <div>
      <h4>Year Start</h4>
      <Slider value={yearStart} min={0} max={100} onChange={setYearStart} />
      <h4>Rate Inflation</h4>
      <Slider value={rateInflation} min={0} max={1} step={0.01} onChange={setRateInflation} />
      <h4>Discount Rate</h4>
      <Slider value={discountRate} min={0} max={1} step={0.01} onChange={setDiscountRate} />
    </div>
  );
}
*/
