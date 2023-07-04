// originially had romanArray as an object but traversing was awkward, I think I should have thought
// more about how to iterate through just using the 1000, 900, 500, etc instead of the default i = 0 index idea

const romanArray = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
]
function convertToRoman(numToConvert) {
    let currentNumber = numToConvert;
    let romanString = "";

    for(let i = 0; i < romanArray.length; i++) {
        // console.log(i, convKeys[i], currentNumber);
        if(romanArray[i][0] > currentNumber) {
            continue; // roman value is to high,  move to a lower roman value
        } else {
            let numNumerals = Math.floor(currentNumber / romanArray[i][0]) // See how many times our current number goes into roman array
            while(numNumerals > 0) { // for that number of times concatenate our new roman numeral string and update our current number afterwards
                console.log(i, numNumerals, romanArray[i][0], romanArray[i][1]);
                romanString = romanString.concat(romanArray[i][1]);
                numNumerals--;
            }
            currentNumber = currentNumber % romanArray[i][0];
        }
    }

    return romanString;
}