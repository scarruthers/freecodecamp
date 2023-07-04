// Simple uses the ascii values and adds 13, goes back 26 if we go past Z
function decipher(char) {
    let code = char.charCodeAt() + 13;
    code = (code > 90 ? code - 26 : code); // Z is 90

    return String.fromCharCode(code); // Grab our new letter and return
}

function rot13(str) {
    const regex = /(\w{1})/g; // find and return every letter in the string
    let newString = str.replaceAll(regex, decipher)

    return newString;
}