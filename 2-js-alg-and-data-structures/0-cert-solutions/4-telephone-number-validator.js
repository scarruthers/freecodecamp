// This uses a fairly long regex to check if it's a valid phone number
// Hardest part was the parentheses matching around the original first 3 digits
function telephoneCheck(str) {
    const regex = /^[1]{0,1}[\s]*(?:\(\d{3}\)|\d{3})[\s\-]*\d{3}[\s\-]*\d{4}$/
    
    return str.match(regex) != null;
}
