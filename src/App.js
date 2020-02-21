import React from 'react';
import logo from './logo.svg';
//<img src={logo} className="App-logo" alt="logo" />
import './App.css';

function App() {

  let search = window.location.search;
  let params = new URLSearchParams(search);
  // Number of days at the start of year til the first meeting (e.g. Year 2020 - First meeting on the 13th. So 13 days set as offset.);
  let offSet = params.get('offSet') || 13; // Fallback value.. use query string value as first method of retrieval

  var now = new Date(); // Current Date
  var start = new Date(now.getFullYear(), 0, 0); // Start date of the current year
  var diff = now - start; // Difference in milliseconds
  var oneDay = 1000 * 60 * 60 * 24; // The value of one day in milliseconds
  var day = Math.floor(diff / oneDay); // The No. Day of the year
  console.log('Day of year: ' + day);

 /*
 Working out which day No. in 14-day rotation.
 The Maths:
 * Subtract the offset from the current no. of days in the year, so that it sets the 14-day counter to start at Day 1
 ** e.g. 52 (current no. of days in the year) - 12 (the offset [i.e. the number of days at the beginning of the year before the first 'Day1'] )
 * Determine number of weeks passed by diving the day number (formula above) by 14 (number of days in rotation) and rounding down.
 * Remove the total number of weeks from the weekspassed to determine the remainderDays
 ** e.g. 2.8571 weeks passed - 2 whole weeks = 0.8571 (this is the remainder value)
 * multiply the remainder with the rotation count and round it off to work out dayCounterNumber
 ** e.g. 0.8571 x 14 dayrotation = 11.99 => 12 rounded off
 */
  var rotationDays = 14;
  var dayNumberOffset = day - offSet;
  var weeksPassed = Math.floor(dayNumberOffset/rotationDays)
  var remainderDays = dayNumberOffset/rotationDays - weeksPassed;
  var dayCounterNumber = Math.round(remainderDays * rotationDays) + 1;

  return (
    <div className="App">
      <header className="App-header">

        <h1>
          Day {dayCounterNumber}
        </h1>
        <a
          className="App-link"
          href="https://github.com/FrankyFour/day-counter"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>
    </div>
  );
}

export default App;
