"use strict";

function spinalCase(str) {
    // Only add space before capitals if it's in the middle of the string
    // Then replace any amount of whtie space, _, - with a single whitespace to split then join with the requirement
    const regex = /([a-z])([A-Z])/g

    return str.replace(regex, " ").replace(/_|-/g, " ").toLowerCase().replace(/\s+/g, "-");
}
console.log(
    spinalCase('The_Andy_Griffith_Show')
)