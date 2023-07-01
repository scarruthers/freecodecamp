// referencing roman numeral converter may be helpful here
// TODO: some of the extra .toFixed() might not be necessary, i keep checking and 1 === 1.00 does return true so i'm missing something else
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
    console.log(`Total change needed: ${changeNeeded}`);
    console.log(`Total money in register: ${totalMoneyInRegister(cid)}`)

    // Run the easy tests to see if we don't have enough change or have exactly enough change
    if(totalMoneyInRegister(cid) < changeNeeded) {
      // we need to simply return with the insufficient funds status with []
      // TODO: only covers half of the insufficient funds case, if we don't have exact change that triggers as well

      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if(totalMoneyInRegister(cid) === changeNeeded.toFixed(2)) { // same comparison of 1 === 1.00 kind of thing
      // return closed status with cid
      let obj = { status: "CLOSED", change: cid };
      return obj;
    }
    

    // Now iterate through and see if we can find exact change 
    // iterate from highest value(100) to lowest(.01)
    for(let i = cid.length - 1; i >= 0; i--) {
      let billName = cid[i][0];

      // have exactly enough change needed so just use our current results in changeReturned[]
      if(changeNeeded === 0) break;

      // eg. if changeNeeded is $5, we can't give them a $100 bill
      if(moneyNameToValue[billName] > changeNeeded) {
        continue;
      } else {
        
        let numBills = 0;

        // Pretty sure this can be simplified with with division and modulo
        // Not really necessary for this challenge, but would be relevant for very large amounts of change
        // Or, for e.g. thousands of pennies
        
        while(cid[i][1] > 0 && changeNeeded >= moneyNameToValue[billName]) {
          changeNeeded -= moneyNameToValue[billName];
          cid[i][1] -= moneyNameToValue[billName];
          
          // due to issues with floating points (found on https://stackoverflow.com/questions/588004/is-floating-point-math-broken
          // we need to use .toFixed(2) to prevent extra digits on floating point numbers
          if(moneyNameToValue[billName] < 1) {
            changeNeeded = changeNeeded.toFixed(2);
            cid[i][1] = cid[i][1].toFixed(2);
          }

          numBills++;
        }

        if(numBills > 0) {
          changeReturned.push([cid[i][0], moneyNameToValue[billName] * numBills])
        }

      }
    }

    // once we have iterated through available change, see if the funds can pay back the change required
    // this is very similar to code above, could probably be refactored
    if(totalMoneyInRegister(changeReturned) < changeNeeded) {
      // we need to simply return with the insufficient funds status with []
      // TODO: only covers half of the insufficient funds case, if we don't have exact change that triggers as well
      /// ^? not sure if I fixed that

      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let obj = {
      status: "TESTING",
      change: changeReturned
    }

    if(Math.round(changeNeeded) === 0) { // have to round due to floats or add extra equality check for 0.00
      obj.status = "OPEN"
    }

    // needs to return object with status and our updated change array depending on if we can pay them out or not
    return obj; // {status: "", change: []}
  }
  
  console.log(
    checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  )
