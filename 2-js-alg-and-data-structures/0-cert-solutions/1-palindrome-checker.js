// Check if a string is a palindrome, by definition excluding all non-alphanumeric characters
function palindrome(str) {
    // replace all non-letters with ""
    const regex = /[\W]|[\s+]|_/g
    const nStr = str.replaceAll(regex, "").toLowerCase();
    let i = 0;
    let j = nStr.length - 1;

    // Iterate through the new clean string from the front and back at the same time
    for(let i = 0; i < nStr.length / 2 + 1; i++) {

        if(nStr[i] != nStr[j]) { // The corresponding characters don't match, not a palindrome
            return false;
        } else if ( i === j && i + 1 + j === nStr.length) { // every character matched so far, we have a middle character (odd length word/sentence), so we have a palindrome
            return true;
        } else if(i > j) { // Made it past half way through the word/sentence and every character has matched, we have a palindrome
            return true;
        } else if(nStr[i] === nStr[j]) { // No confirmed result yet, iterate through, check starting and ending letter
            if(i === j && i + j === nStr.length) return true;
            j--;
            continue;
        }
    }
}
