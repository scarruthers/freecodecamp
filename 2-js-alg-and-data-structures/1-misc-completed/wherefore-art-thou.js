"use strict";

function whatIsInAName(collection, source) {
  const sourceKeys = Object.keys(source);
  return collection.filter( obj => {
    for(let key of sourceKeys) {
      if(obj[key] !== source[key]) {
        return false;
      }
    }
    return true;
  });
}

console.log(
  whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" })
)

let y;