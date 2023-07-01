function decipher(char) {
    let code = char.charCodeAt() + 13;
    code = (code > 90 ? code - 26 : code); // Z is 90

    let newChar = String.fromCharCode(code);

    return newChar
}

function rot13(str) {
    const regex = /(\w{1})/g
    let newString = str.replaceAll(regex, decipher)

    return newString;
}

console.log(
    rot13("SERR PBQR PNZC")
)

