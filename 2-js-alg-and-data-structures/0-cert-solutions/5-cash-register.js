// I had some issues with floating point numbers suddenly adding more digits, which is why .toFixed(2) is sprinkled in to ensure correct value comparison
// Confirmed the issues from https://stackoverflow.com/questions/588004/is-floating-point-math-broken and from my own logging as I debugged
"use strict";

const moneyNameToValue = {
  "PENNY": .01,
  "NICKEL": .05,
  "DIME": .1,
  "QUARTER": .25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}

function totalMoneyInRegister(cid) {
  let totalFunds = cid.reduce((total, moneyArray) => {
    total += moneyArray[1];

    return total;
  },0)

  return totalFunds.toFixed(2); // floating error adds more digits
}

function checkCashRegister(price, cash, cid) {
    let changeNeeded = cash - price;
    let changeReturned = [];

    // Run the easy tests to see if we don't have enough change or have exactly enough change

    // Not enough money, return required object
    if(totalMoneyInRegister(cid) < changeNeeded) {
      // we need to simply return with the insufficient funds status with []
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    // Exactly enough money, return required object
    if(totalMoneyInRegister(cid) === changeNeeded.toFixed(2)) {
      let obj = { status: "CLOSED", change: cid };
      return obj;
    }
    
    // Now iterate through and see if we can find exact change 
    // iterate from highest value(100) to lowest(.01), similar to roman numeral challenge
    for(let i = cid.length - 1; i >= 0; i--) {
      let billName = cid[i][0];

      // have exactly enough change needed so just use our current results in changeReturned[]
      if(changeNeeded === 0) break;

      // eg. we can't give them a $100 bill if all the change they need is $5
      if(moneyNameToValue[billName] > changeNeeded) {
        continue; // iterate to next smaller currency
      } else {
        let numBills = 0;

        // Pretty sure this can be simplified with with division and modulo
        // Not really necessary for this challenge, but might be relevant for very large amounts of change
        

        // We have a currency unit smaller than our change needed, so iterate through, increment the number of that unit
        // and update the remaining change needed
        while(cid[i][1] > 0 && changeNeeded >= moneyNameToValue[billName]) {
          changeNeeded -= moneyNameToValue[billName];
          cid[i][1] -= moneyNameToValue[billName];
          
          // If the bill is 10 the test result won't accept 10.00, so only apply once we are onto quarters, nickels, dimes, pennies
          if(moneyNameToValue[billName] < 1) {
            changeNeeded = changeNeeded.toFixed(2);
            cid[i][1] = cid[i][1].toFixed(2);
          }

          numBills++;
        }

        // Push to our array we'll return if we have the right amount of change
        if(numBills > 0) {
          changeReturned.push([cid[i][0], moneyNameToValue[billName] * numBills])
        }

      }
    }

    // once we have iterated through all of our available change, see if the funds can pay back the change required amount
    // this is very similar to code above, could probably be refactored
    if(totalMoneyInRegister(changeReturned) < changeNeeded) {
      // we need to simply return with the insufficient funds status with []

      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let obj = {
      status: "OPEN",
      change: changeReturned
    }

    // if(Math.round(changeNeeded) === 0) { // have to round due to floats or add extra equality check for 0.00
    //   obj.status = "OPEN"
    // }

    // all other cases should have been handled above, so return "OPEN" with the changeReturned array with exact change
    return { status: "OPEN", change: changeReturned };
  }
